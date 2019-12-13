import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import invertColor from "../../utils/invertColor";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";

const SelectedObject = props => {
    const {road, bridge,dangerRoad, userPreferences} = props;
    let DrawableElement;


    if (road) {
        const geometry = getPointsArrayFromLinestring(road.line_path);
        DrawableElement =
            <Polyline positions={geometry} key={road.id} color={invertColor(userPreferences.roadColor)} weight={userPreferences.roadWidth*2}>
                <RoadPopupContainer road={road}/>
            </Polyline>
    } else
    if (bridge) {
        const geometry = getPointsArrayFromPoint(bridge.point)[0];
        if (geometry) {
            DrawableElement =
                <CircleMarker center={geometry} radius={10} color={invertColor(userPreferences.roadColor)}>

                </CircleMarker>
        }
    }else
    if (dangerRoad) {
        const geometry = getPointsArrayFromLinestring(dangerRoad.path);
        if (geometry) {
            DrawableElement =
                <Fragment>
                    <Polyline positions={geometry} color={invertColor(userPreferences.dangerRoadsColor1)} weight={userPreferences.dangerRoadsWidth*2}
                              onContextMenu={(event) => {
                              }}>

                    </Polyline>
                    <Polyline positions={geometry} dashArray={[`${userPreferences.dangerRoadsStrokeLength}`,`${userPreferences.dangerRoadsStrokeLength}`]} dashOffset={`${userPreferences.dangerRoadsStrokeLength}`} color={invertColor(userPreferences.dangerRoadsColor2)}  weight={userPreferences.dangerRoadsWidth*2}
                              onContextMenu={(event) => {
                              }}>

                    </Polyline>
                </Fragment>
        }
    }

    return (
        <Fragment>
            {DrawableElement}
        </Fragment>
    )
};

export default SelectedObject;
