import React from "react";
import {Button} from "@material-ui/core";

const BridgeDetailsObject = ({object, handleSelectDetailedObject, moveMapToObject}) => {
    return (
        <div>
            <p>ID трубы: {object.id}</p>
            <p>Название трубы: {object.name}</p>
            <p>Максимальная нагрузка: {object.maximum_load ? object.maximum_load : 'Не указано'}</p>
            <p>Принадлежность дороге: {object.road_name ? object.road_name : 'Не указано'}</p>
            <p>Расположен на {object.place_km ? object.place_km : 'Не указано'} км дороги</p>
            <a href={`https://av.admtyumen.ru/#/directory/pipes/inst_id=${object.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
                <Button type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>Закрыть</Button>
            </div>
        </div>
    )
};

export default BridgeDetailsObject;
