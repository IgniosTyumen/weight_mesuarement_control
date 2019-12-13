import React, {Fragment} from "react";
import {CircleMarker, Polyline} from "react-leaflet";

const OrderPreviewLayer = (props) => {
    const {previewOrder,userPreferences} = props;
    let WaysList = [];
    if (previewOrder.waypoints) {
        for (let it = 0; it < previewOrder.waypoints.length; it++) {
            let color;
            switch (previewOrder.waypoints[it].importance) {
                case "Автомобильная дорога федерального значения": {
                    color=userPreferences.colorRoadFederal
                    break;
                }
                case "Автомобильная дорога регионального или межмуниципального значения": {
                    color=userPreferences.colorRoadRegional
                    break;
                }
                case "Автомобильная дорога местного значения": {
                    color=userPreferences.colorRoadMunicipal
                    break;
                }
            }
            if (previewOrder.waypoints[it].path) {
                const points = previewOrder.waypoints[it].geometry.points
                WaysList.push(
                    <Fragment>
                        {userPreferences.endpointRouteVisible &&
                        <Fragment>
                            <CircleMarker center={points[0]} radius={userPreferences.endpointRouteWidth} color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                            <CircleMarker center={points[points.length - 1]} radius={userPreferences.endpointRouteWidth}
                                          color={color}
                                          onContextMenu={(event) => {
                                          }}/>
                        </Fragment>}
                        <Polyline color={color} positions={points}
                                  onContextMenu={(event) => {
                                  }}/>
                    </Fragment>
                )
            }
        }
    }
    return (
        <Fragment>
            {WaysList}
        </Fragment>
    )
};

export default OrderPreviewLayer;
