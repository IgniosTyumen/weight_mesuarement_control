import React, {Fragment} from "react";
import {Marker, Popup} from "react-leaflet";

const TunnelsLayer = (props) => {

    const {tunnels} = props;



    const tunnelSvg = `
       <svg width="25" height="25" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 10C11.3646 10 11.2474 9.95052 11.1484 9.85156C11.0495 9.7526 11 9.63542 11 9.5V6C11 5.09375 10.776 4.25781 10.3281 3.49219C9.88021 2.72656 9.27344 2.11979 8.50781 1.67188C7.74219 1.22396 6.90625 1 6 1C5.09375 1 4.25781 1.22396 3.49219 1.67188C2.72656 2.11979 2.11979 2.72656 1.67188 3.49219C1.22396 4.25781 1 5.09375 1 6V9.5C1 9.63542 0.950521 9.7526 0.851562 9.85156C0.752604 9.95052 0.635417 10 0.5 10C0.364583 10 0.247396 9.95052 0.148438 9.85156C0.0494792 9.7526 0 9.63542 0 9.5V6C0 4.91667 0.268229 3.91406 0.804688 2.99219C1.34115 2.07031 2.07031 1.34115 2.99219 0.804688C3.91406 0.268229 4.91667 0 6 0C7.08333 0 8.08594 0.268229 9.00781 0.804688C9.92969 1.34115 10.6589 2.07031 11.1953 2.99219C11.7318 3.91406 12 4.91667 12 6V9.5C12 9.63542 11.9505 9.7526 11.8516 9.85156C11.7526 9.95052 11.6354 10 11.5 10ZM2.5 10C2.36458 10 2.2474 9.95052 2.14844 9.85156C2.04948 9.7526 2 9.63542 2 9.5V6C2 4.89583 2.39062 3.95312 3.17188 3.17188C3.95312 2.39062 4.89583 2 6 2C7.10417 2 8.04688 2.39062 8.82812 3.17188C9.60938 3.95312 10 4.89583 10 6V9.5C10 9.63542 9.95052 9.7526 9.85156 9.85156C9.7526 9.95052 9.63542 10 9.5 10H9L10.5 16H1.5L3 10H2.5ZM6.65625 12H5.34375L5.23438 13H6.76562L6.65625 12ZM7 15L6.875 14H5.125L5 15H7ZM5.45312 11H6.54688L6.5 10H5.5L5.45312 11Z" fill="black"/>
        </svg>
    `;

    const divIcon = L.divIcon(
        {
            className: "trashIcon",
            html: tunnelSvg
        }
    );

    let Elements;
    if (tunnels.tunnels) {
        Elements = tunnels.tunnels.map(tunnel => {
            const pointsStr = tunnel.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];
                if (point1 && point2 && points) {
                    return (
                    <Marker position={points} key={tunnel.id} icon={divIcon}
                            onContextMenu={(event) => {
                    }}>
                        <Popup>
                            <p>ID моста: {tunnel.id}</p>
                            <p>Название тоннеля: {tunnel.name}</p>
                            <p>Длина тоннеля: {tunnel.length ? tunnel.length : 'Не указано'}</p>
                            <p>Ширина тоннеля: {tunnel.width ? tunnel.width : 'Не указано'}</p>
                            <p>Высота тоннеля: {tunnel.height ? tunnel.height : 'Не указано'}</p>
                            <p>Принадлежность дороге: {tunnel.road_name ? tunnel.road_name : 'Не указано'}</p>
                            <p>Расположен на {tunnel.place_km ? tunnel.place_km : 'Не указано'} км дороги</p>
                            <a href={`https://av.admtyumen.ru/#/directory/tunnels/inst_id=${tunnel.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
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

export default TunnelsLayer;
