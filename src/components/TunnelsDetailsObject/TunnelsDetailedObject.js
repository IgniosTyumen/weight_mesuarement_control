import React from "react";
import {Button} from "@material-ui/core";

const TunnelsDetailedObject = ({object, handleSelectDetailedObject, moveMapToObject}) => {
    return (
        <div>
            <p>ID моста: {object.id}</p>
            <p>Название тоннеля: {object.name}</p>
            <p>Длина тоннеля: {object.length ? object.length : 'Не указано'}</p>
            <p>Ширина тоннеля: {object.width ? object.width : 'Не указано'}</p>
            <p>Высота тоннеля: {object.height ? object.height : 'Не указано'}</p>
            <p>Принадлежность дороге: {object.road_name ? object.road_name : 'Не указано'}</p>
            <p>Расположен на {object.place_km ? object.place_km : 'Не указано'} км дороги</p>
            <a href={`https://av.admtyumen.ru/#/directory/tunnels/inst_id=${object.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
                <Button type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>Закрыть</Button>
            </div>
        </div>
    )
};

export default TunnelsDetailedObject;
