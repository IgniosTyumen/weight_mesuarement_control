import React, {Fragment} from "react";
import {Button} from "@material-ui/core";

const DangerRoadDetailObject = ({object, handleSelectDetailedObject, moveMapToObject}) => {

    return (
        <div style={{marginTop:'20px'}}>
            <p>Название участка: {object.name}</p>

            <p>Подтверждено: {object.approved ? 'да' : 'нет'}</p>

            <p>Дорога: {object.road && object.road.name ? object.road.name : 'Не определено'}</p>
            <p>Код дороги: {object.road && object.road.road_code ? object.road.road_code : 'Не определено'}</p>
            <p>Номер дороги: {object.road && object.road.road_number ? object.road.road_number : 'Не определено'}</p>

            <p>Начало участка: {object.start_road} км</p>
            <p>Конец участка: {object.end_road} км</p>

            <div className={'detailedObjectPanelButtonGroup'}>
                <Button type={'variant'} onClick={moveMapToObject}>Перейти</Button>
            </div>
            <Button className={'closeDetailedObjectPanelButton'} type={'variant'} onClick={() => handleSelectDetailedObject(null, null)}>X</Button>
        </div>
    )
};

export default DangerRoadDetailObject;
