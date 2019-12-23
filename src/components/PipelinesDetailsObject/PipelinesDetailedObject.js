import React from "react";
import {Button} from "@material-ui/core";

const BridgeDetailsObject = ({object, handleSelectDetailedObject, moveMapToObject}) => {
    return (
        <div>
            <p>ID трубопровода: {object.id}</p>
            <p>Название трубопровода: {object.name}</p>
            <p>Высота трубопровода: {object.height ? object.height : 'Не указано'}</p>
            <p>Принадлежность дороге: {object.road_name ? object.road_name : 'Не указано'}</p>
            <p>Расположен на {object.place_km ? object.place_km : 'Не указано'} км дороги</p>
            <a href={`https://av.admtyumen.ru/#/directory/pipelines/inst_id=${object.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
                <Button type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>Закрыть</Button>
            </div>
        </div>
    )
};

export default BridgeDetailsObject;
