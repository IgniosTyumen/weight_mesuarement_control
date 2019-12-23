import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";


const colorSwitcher = (road,userPreferences) => {
    let result = '#a1fdc1';
    if (road) {
        switch (road.importance){
            case 'FEDERAL': {
                result = userPreferences.roadColorFederal ? userPreferences.roadColorFederal : '#ffcb53';
                break;
            }
            case 'REGIONAL': {
                result = userPreferences.roadColorRegional ? userPreferences.roadColorRegional :'#dabdca';
                break;
            }
            case 'MUNICIPAL': {
                result = userPreferences.roadColorMunicipal ? userPreferences.roadColorMunicipal : '#ff9c8d';
                break;
            }
            default: {
                result = '#d6ff67';
            }
        }
    }
    return result;
}

const widthSwitcher = (road,userPreferences) => {
    let result = 2;
    if (road) {
        switch (road.importance){
            case 'FEDERAL': {
                result = userPreferences.lineWidthRoadMainFederal ? userPreferences.lineWidthRoadMainFederal : 2;
                break;
            }
            case 'REGIONAL': {
                result = userPreferences.lineWidthRoadMainRegional ? userPreferences.lineWidthRoadMainRegional : 2;
                break;
            }
            case 'MUNICIPAL': {
                result = userPreferences.lineWidthRoadMainMunicipal ? userPreferences.lineWidthRoadMainMunicipal : 2;
                break;
            }
            default: {
                result = 2;
            }
        }
    }
    return result;
}


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
                const color = colorSwitcher(road, userPreferences);
                const width = widthSwitcher(road,userPreferences);
                return (
                    <Fragment>
                        <Polyline positions={points} key={'road'+road.id+road.road_number}
                                  color={color}
                                  weight={width}
                                  onClick={() => selectedObjectActions.selectRoad(road)}
                                  onContextMenu={(event) => {
                                  }}
                        >
                            <RoadPopupContainer road={road} key={'RoadPopupContainer'+road.id+road.road_number}/>
                        </Polyline>
                        {userPreferences.roadEndpointsVisible &&
                        <Fragment>
                            <CircleMarker center={points[0]}
                                          key={'roadCircleMarkerStart'+road.id+road.road_number}
                                          radius={userPreferences.roadEndpointsWidth} color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                            < CircleMarker center={points[points.length - 1]} radius={userPreferences.roadEndpointsWidth}
                                           key={'roadCircleMarkerEnd'+road.id+road.road_number}
                                           color={color}
                                           onContextMenu={(event) => {
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
