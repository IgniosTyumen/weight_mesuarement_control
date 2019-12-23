import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";
import invertColor from "../../utils/invertColor";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import RoadPopupContainer from "../RoadPopup/RoadPopupContainer";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";

const SelectedObject = props => {
    const {road, bridge,dangerRoad, userPreferences, tunnel, pipe, pipeline} = props;
    let DrawableElement = null;


    if (road) {
        const geometry = road.line_path ? getPointsArrayFromLinestring(road.line_path) : null;
        DrawableElement =
            <Polyline positions={geometry} key={road.id} color={invertColor(userPreferences.roadColor)} weight={userPreferences.roadWidth*2}>
                <RoadPopupContainer road={road}/>
            </Polyline>
    } else
    if (bridge) {
        const geometry = bridge.point ? getPointsArrayFromPoint(bridge.point)[0] : null;
        if (geometry) {
            DrawableElement =
                <CircleMarker center={geometry} radius={10} color={invertColor(userPreferences.roadColor)}>

                </CircleMarker>
        }
    }else
    if (dangerRoad) {
        const geometry = dangerRoad.path ? getPointsArrayFromLinestring(dangerRoad.path) : null;
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
    } else
    if (tunnel) {
        const geometry = tunnel.point ? getPointsArrayFromPoint(tunnel.point)[0] : null;
        if (geometry) {
            DrawableElement =
                <CircleMarker center={geometry} radius={10} color={invertColor(userPreferences.roadColor)}>

                </CircleMarker>
        }
    }else
    if (pipe) {
        const geometry = pipe.point ? getPointsArrayFromPoint(pipe.point)[0] : null;
        if (geometry) {
            DrawableElement =
                <CircleMarker center={geometry} radius={10} color={invertColor(userPreferences.roadColor)}>

                </CircleMarker>
        }
    }else
    if (pipeline) {
        const geometry = pipeline.point ? getPointsArrayFromPoint(pipeline.point)[0] : null;
        if (geometry) {
            DrawableElement =
                <CircleMarker center={geometry} radius={10} color={invertColor(userPreferences.roadColor)}>

                </CircleMarker>
        }
    }

    return (
        <Fragment>
            {DrawableElement}
        </Fragment>
    )
};

export default SelectedObject;
