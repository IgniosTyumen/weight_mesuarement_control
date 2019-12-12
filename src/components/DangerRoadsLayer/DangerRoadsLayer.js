import React, {Fragment} from "react";
import {Map as LeafletMap, Polyline} from "react-leaflet";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";

const DangerRoadsLayer = (props) => {
    const {dangerRoads, userPreferences} = props;
    let Elements;
    if (dangerRoads && dangerRoads.dangers) {
        Elements = dangerRoads.dangers.map((road,position) => {
            const pointsStr = road['path'];
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
                    <Polyline positions={points} key={position} color={userPreferences.dangerRoadsColor1} weight={userPreferences.dangerRoadsWidth}
                              onContextMenu={(event) => {
                                  event.preventDefault()
                              }}>

                    </Polyline>
                    <Polyline positions={points} key={position} dashArray={[`${userPreferences.dangerRoadsStrokeLength}`,`${userPreferences.dangerRoadsStrokeLength}`]} dashOffset={`${userPreferences.dangerRoadsStrokeLength}`} color={userPreferences.dangerRoadsColor2}  weight={userPreferences.dangerRoadsWidth}
                              onContextMenu={(event) => {
                                  event.preventDefault()
                              }}>

                    </Polyline>
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

export default DangerRoadsLayer;
