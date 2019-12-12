import React, {Fragment} from "react";
import {CircleMarker, Map as LeafletMap, Polyline, Popup} from "react-leaflet";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";
import invertColor from "../../utils/invertColor";
import {bridgesApi, dangersApi, roadsApi} from "../../api/api";

const RoadsLayer = (props) => {


    const {roads, userPreferences, selectedObjectActions} = props;
    let Elements;
    if (roads.roads) {
        Elements = roads.roads.map(road => {
            const pointsStr = road['line_path'];
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('LINESTRING (', '').replace(')', '').split(',');
                let points = [];
                for (let it = 0; it < pointsStrArr.length; it++) {
                    const pointStr = pointsStrArr[it].trim().split(' ');
                    const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                    const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                    points.push([point1, point2]);
                }
                return (
                    <Fragment>
                        <Polyline positions={points} key={road.id} color={userPreferences.roadColor}
                                  weight={userPreferences.roadWidth}
                                  onClick={() => selectedObjectActions.selectRoad(road)}
                                  onContextMenu={(event) => {
                                      event.preventDefault()
                                  }}
                        >
                            <RoadPopupContainer road={road}/>
                        </Polyline>
                        {userPreferences.roadEndpointsVisible &&
                        <Fragment>
                            <CircleMarker center={points[0]} radius={userPreferences.roadEndpointsWidth} color={userPreferences.roadColor}
                                          onContextMenu={(event) => {
                                              event.preventDefault()
                                          }}/>
                            < CircleMarker center={points[points.length - 1]} radius={userPreferences.roadEndpointsWidth}
                                           color={userPreferences.roadColor}
                                           onContextMenu={(event) => {
                                               event.preventDefault()
                                           }}/>
                        </Fragment>
                        }
                    </Fragment>
                )
            }
        });
    }
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default RoadsLayer;
