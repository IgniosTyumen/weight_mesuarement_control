import React, {Fragment} from "react";
import {Map as LeafletMap, Marker, Popup} from "react-leaflet";

const BridgesLayer = (props) => {

    const {bridges} = props;



    const bridgeSvg = `
       <div class="markerContainer">
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 7V3.91C5.28 3.58 4.61 3.18 4 2.71V7H6ZM4 11H2V9H0V7H2V0H4V1.43C5.8 3 8.27 4 11 4C13.73 4 16.2 3 18 1.43V0H20V7H22V9H20V11H18V9H4V11ZM16 3.91V7H18V2.71C17.39 3.18 16.72 3.58 16 3.91ZM15 7V4.32C14.36 4.55 13.69 4.72 13 4.84V7H15ZM12 7V4.96L11 5L10 4.96V7H12ZM9 7V4.84C8.31 4.72 7.64 4.55 7 4.32V7H9Z" fill="black"/>
            </svg>
       </div>
    `;

    const divIcon = L.divIcon(
        {
            className: "trashIcon",
            html: bridgeSvg
        }
    );

    let Elements;
    if (bridges.bridges) {
        Elements = bridges.bridges.map(bridge => {
            const pointsStr = bridge.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];
                if (point1 && point2 && points) {
                    return (
                    <Marker position={points} key={bridge.id} icon={divIcon}
                            onContextMenu={(event) => {
                        event.preventDefault()
                    }}>
                        <Popup>
                            <p>Тип моста : {bridge.bridge_overpass_type}</p>
                            <p>Название моста : {bridge.name}</p>
                            <p>Нормативная нагрузка : {bridge.normative_load || 'Не указано'}</p>
                            <p>Название дороги : {bridge.road_name || 'Не указано'}</p>
                            <p>Код дороги : {bridge.road ? bridge.road.road_number : 'Не указано'}</p>
                            <p>Тип преодолеваемого объекта : {bridge.type_obstruction_blocked || 'Не указано'}</p>
                        </Popup>
                    </Marker>
                    )
                } else debugger
            }
        });
    }
    return (
        <Fragment>
            {Elements}
        </Fragment>
    )
};

export default BridgesLayer;
