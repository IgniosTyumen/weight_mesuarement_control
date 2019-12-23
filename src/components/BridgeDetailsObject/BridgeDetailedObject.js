import React from "react";
import {Button} from "@material-ui/core";

const BridgeDetailsObject = ({object, handleSelectDetailedObject, moveMapToObject}) => {
    return (
        <div>
            {/*// id: 5*/}
            <p>ID моста: {object.id}</p>
            {/*// name: "Мост через Неуказанное препятствие на 4.61 км"*/}
            <p>Название моста: {object.name}</p>
            {/*// bridge_overpass_type: "Мост"            */}
            <p>Тип объекта: {object.bridge_overpass_type ? object.bridge_overpass_type : 'Не указано'}</p>
            {/*// point: "POINT (65.557941198349 57.14409809141996)"*/}
            <p>Прикреплена геометрия : {object.point ? object.point : 'Не указано'}</p>
            {/*// length_structure: null*/}
            <p>Длина моста: {object.length_structure ? object.length_structure : 'Не указано'}</p>
            {/*// road_name: ""Омутинское - Армизонское" - Медвежка"*/}
            <p>Принадлежность дороге: {object.road_name ? object.road_name : 'Не указано'}</p>
            {/*// road_code: "7101701"*/}
            <p>Код дороги: {object.road && object.road.road_code ? object.road.road_code  : 'Не указано'}</p>
            {/*// road_number: "71 ОП РЗ 71А-1701"*/}
            <p>Номер дороги: { object.road && object.road.road_number ? object.road.road_number : 'Не указано'}</p>
            {/*// place_km: 4.61*/}
            <p>Расположен на {object.place_km ? object.place_km : 'Не указано'} км дороги</p>
            {/*// segment_id: 10910*/}
            <p>Принадленжит сегменту {object.segment_id ? object.segment_id : 'Не указано'}</p>
            {/*// type_obstruction_blocked: "Река"*/}
            <p>Тип пересекаемого объекта: {object.type_obstruction_blocked ? object.type_obstruction_blocked : 'Не указано'}</p>
            <a href={`https://av.admtyumen.ru/#/directory/bridgesoverpasses/inst_id=${object.id}`} target='_blank' rel="noopener noreferrer" >Открыть в справочнике</a>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
                <Button type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>Закрыть</Button>
            </div>
        </div>
    )
};

export default BridgeDetailsObject;
