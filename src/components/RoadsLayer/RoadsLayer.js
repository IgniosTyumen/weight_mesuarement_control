import React, {Fragment} from "react";
import {Polyline} from "react-leaflet";

const RoadsLayer = (props) => {
    const {roads} = props;
    const Elements = roads.map(road => <Polyline />);
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default RoadsLayer;
