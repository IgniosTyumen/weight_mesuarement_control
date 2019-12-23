import React, {Fragment} from "react";
import {Marker, Popup} from "react-leaflet";

const PipesLayer = (props) => {

    const {pipes} = props;



    const tunnelSvg = `
       <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 14H20V16H14V13H16V11H14V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H4V2H2V10H4V8H10V11H8V13H10V18C10 18.5304 10.2107 19.0391 10.5858 19.4142C10.9609 19.7893 11.4696 20 12 20H20V22H22" fill="black"/>
    </svg>
    `;

    const divIcon = L.divIcon(
        {
            className: "trashIcon",
            html: tunnelSvg
        }
    );

    let Elements;
    if (pipes.pipes) {
        Elements = pipes.pipes.map(pipe => {
            const pointsStr = pipe.point;
            if (pointsStr) {
                const pointsStrArr = pointsStr.replace('POINT (', '').replace(')', '').replace('POINT(', '');
                const pointStr = pointsStrArr.trim().split(' ');
                const point1 = Number.parseFloat(pointStr[1]).toFixed(6);
                const point2 = Number.parseFloat(pointStr[0]).toFixed(6);
                const points = [point1, point2];
                if (point1 && point2 && points) {
                    return (
                    <Marker position={points} key={pipe.id} icon={divIcon}
                            onContextMenu={(event) => {
                    }}>
                        <Popup>
                            <p>Название трубы: {pipe.name}</p>
                            <p>Максимальная нагрузка: {pipe.maximum_load ? pipe.maximum_load : 'Не указано'}</p>
                            <p>Принадлежность дороге: {pipe.road_name ? pipe.road_name : 'Не указано'}</p>
                            <p>Расположен на {pipe.place_km ? pipe.place_km : 'Не указано'} км дороги</p>
                            <a href={`https://av.admtyumen.ru/#/directory/pipes/inst_id=${pipe.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
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

export default PipesLayer;
