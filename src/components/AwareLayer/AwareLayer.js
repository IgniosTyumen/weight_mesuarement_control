import React, {Fragment} from "react";
import getPointsArrayFromLinestring from "../../utils/getPointsArrayFromLinestring";
import {Marker, Polygon, Polyline} from "react-leaflet";
import {lineIntersect, lineSliceAlong, lineString} from '@turf/turf'

const AwareLayer = props => {

    const {aware,waypointTemplate,userPreferences} = props;
    let Elements = [];
    if (aware.aware.length) {
        try {
            for (let it=0; it< aware.aware.length;it++) {
                const lineGeometry = getPointsArrayFromLinestring(aware.aware[it].path);
                const line = lineString(lineGeometry)
                const sliced = lineSliceAlong(line, aware.aware[it].start_segment, aware.aware[it].end_segment, {units: 'kilometers'})
                const lineMain = lineString(waypointTemplate.templateWaypoint.geometry.points);
                const isCrossing = lineIntersect(lineMain,sliced);
                let isSuitable = true;
                let axleLoadOrder = waypointTemplate.templateWaypoint.axle_loads;
                let currentAxleLoad = aware.aware.axle_load;
                if (axleLoadOrder && currentAxleLoad) {
                     axleLoadOrder = Number.parseFloat(axleLoadOrder);
                     currentAxleLoad = Number.parseFloat(currentAxleLoad);
                     if (axleLoadOrder<currentAxleLoad) isSuitable=false;
                }

                if (isCrossing.features && isCrossing.features.length && isSuitable){
                    const points = sliced.geometry.coordinates;
                    Elements.push(<Polyline positions={points} weight={userPreferences.alertWidth} color={userPreferences.alertColor} key={`dangers_${it}`} className={'flicker'}/>)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
    const {crossings} = aware;
    let CrossingsGeometry = [];
    if (crossings.length) {
        for (let it = 0; it < crossings.length; it++) {
            if (crossings[it].points.length) {
                for (let it2 = 0; it2 < crossings[it].points.length; it2++) {
                    CrossingsGeometry.push(<Marker position={crossings[it].points[it2].geometry.coordinates}/>)
                }
            }
        }
    }
    const {roads} = aware;
    let ThroughGeometry = [];
    if (roads.length) {
        for (let it = 0; it < roads.length; it++) {
            if (roads[it].points.coordinates) {

                    ThroughGeometry.push(<Polygon positions={roads[it].points.coordinates[0]} color={'#f00'}/>)
            }
        }
    }
    return (
        <Fragment>
            {Elements}
            {CrossingsGeometry}
            {ThroughGeometry}
        </Fragment>
    )
};

export default AwareLayer
