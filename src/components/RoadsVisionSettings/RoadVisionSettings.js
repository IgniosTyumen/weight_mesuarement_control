import React, {useEffect, useState} from "react";
import {SketchPicker} from 'react-color';
import Dialog from "@material-ui/core/Dialog";
import Button from "../ui/Button";
import {Checkbox, Col, Row, Slider} from 'antd';

const RoadVisionSettings = props => {

    const [colorRoad, setColorRoad] = useState()
    const [visibleColorPicker, setVisibleColorPicker] = useState(false);
    const [lineWidth, setLineWidth] = useState();
    const [endpointVisible, setEndpointVisible] = useState(true);
    const [endpointWidth, setEndpointWidth] = useState(3)
    const {userPreferences, userPreferencesActions} = props;



    const [colorRoadFederal, setColorRoadFederal] = useState('green')
    const [visibleColorPickerRoadFederal, setVisibleColorPickerRoadFederal] = useState(false);
    const [lineWidthRoadFederal, setLineWidthRoadFederal] = useState();
    const [colorRoadRegional, setColorRoadRegional] = useState('red')
    const [visibleColorPickerRoadRegional, setVisibleColorPickerRoadRegional] = useState(false);
    const [lineWidthRoadRegional, setLineWidthRoadRegional] = useState();
    const [colorRoadMunicipal, setColorRoadMunicipal] = useState('blue')
    const [visibleColorPickerRoadMunicipal, setVisibleColorPickerRoadMunicipal] = useState(false);
    const [lineWidthRoadMunicipal, setLineWidthRoadMunicipal] = useState();


    const handleChangeComplete = (color,type) => {
        switch (type) {
            case 'federal':
                setColorRoadFederal(color.hex);
                userPreferencesActions.changeRoadImportanceColor(color.hex,type);
                break;
            case 'regional':
                setColorRoadRegional(color.hex);
                userPreferencesActions.changeRoadImportanceColor(color.hex,type);
                break;
            case 'municipal':
                setColorRoadMunicipal(color.hex);
                userPreferencesActions.changeRoadImportanceColor(color.hex,type);
                break;
        }
    }



    const handleColorPickerOpen = (type) => {
        switch (type) {
            case 'federal':
                setVisibleColorPickerRoadFederal(true)
                break
            case 'regional':
                setVisibleColorPickerRoadRegional(true)
                break;
            case 'municipal':
                setVisibleColorPickerRoadMunicipal(true)
                break;
        }
    }

    const handleColorPickerClose = (type) => {
        switch (type) {
            case 'federal':
                setVisibleColorPickerRoadFederal(false)
                break
            case 'regional':
                setVisibleColorPickerRoadRegional(false)
                break;
            case 'municipal':
                setVisibleColorPickerRoadMunicipal(false)
                break;
        }
    }

    const handleLineWidthChange = (value,type) => {
        switch (type) {
            case 'federal':
                setLineWidthRoadFederal(value);
                break;
            case 'regional':
                setLineWidthRoadRegional(value);
                break;
            case 'municipal':
                setLineWidthRoadMunicipal(value);
                break;
        }
    }

    const handleLineWidthAfterChange = (value,type) => {
        switch (type) {
            case 'federal':
                userPreferencesActions.changeRoadImportanceLineWeight(value,type);
                break;
            case 'regional':
                userPreferencesActions.changeRoadImportanceLineWeight(value,type);
                break;
            case 'municipal':
                userPreferencesActions.changeRoadImportanceLineWeight(value,type);
                break;
        }
    }

    const initFromProps = () => {
        setColorRoadFederal(userPreferences.roadColorFederal || 'gray');
        setColorRoadRegional(userPreferences.roadColorRegional || 'orange');
        setColorRoadMunicipal(userPreferences.roadColorMunicipal || 'brown');
        setLineWidthRoadFederal(userPreferences.lineWidthRoadMainFederal);
        setLineWidthRoadRegional(userPreferences.lineWidthRoadMainRegional);
        setLineWidthRoadMunicipal(userPreferences.lineWidthRoadMainMunicipal);
        setEndpointVisible(userPreferences.endpointRouteVisible);
        setEndpointWidth(userPreferences.endpointRouteWidth);
    }



    const coverStyle = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };


    const handleEndpointsVisible = (event) => {
        setEndpointVisible(event.target.checked);
        userPreferencesActions.changeRoadWaypointsVisible(event.target.checked)
    }

    const handleEndpointWidthChange = (value) => {
        setEndpointWidth(value);
    }

    const handleEndpointWidthAfterChange = (value) => {
        userPreferencesActions.changeRoadWaypointsWidth(value);
    }

    useEffect(initFromProps,[]);

    return (
        <div className={"settingsBlock"}>

            <div onClick={()=>handleColorPickerOpen('federal')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии федеральной дороги</span>
                <div style={{backgroundColor: colorRoadFederal}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerRoadFederal}>
                <div>
                    <SketchPicker
                        color={colorRoadFederal}
                        onChangeComplete={(val)=>handleChangeComplete(val,'federal')}
                    />
                    <Button variant onClick={()=>handleColorPickerClose('federal')}>OK</Button>
                </div>
            </Dialog>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина линии федеральной дороги</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={1}
                        max={5}
                        onChange={(val)=>handleLineWidthChange(val,'federal')}
                        onAfterChange={(val)=>handleLineWidthAfterChange(val,'federal')}
                        value={typeof lineWidthRoadFederal === 'number' ? lineWidthRoadFederal : 0}
                        step={0.1}
                        included={true}
                    />
                </Col>
            </Row>


            <div onClick={()=>handleColorPickerOpen('regional')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии региональной дороги</span>
                <div style={{backgroundColor: colorRoadRegional}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerRoadRegional}>
                <div>
                    <SketchPicker
                        color={colorRoadRegional}
                        onChangeComplete={(val)=>handleChangeComplete(val,'regional')}
                    />
                    <Button variant onClick={()=>handleColorPickerClose('regional')}>OK</Button>
                </div>
            </Dialog>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина линии региональной дороги</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={0.5}
                        max={5}
                        onChange={(val)=>handleLineWidthChange(val,'regional')}
                        onAfterChange={(val)=>handleLineWidthAfterChange(val,'regional')}
                        value={typeof lineWidthRoadRegional === 'number' ? lineWidthRoadRegional : 0}
                        step={0.1}
                        included={true}
                    />
                </Col>
            </Row>


            <div onClick={()=>handleColorPickerOpen('municipal')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии муниципальной дороги</span>
                <div style={{backgroundColor: colorRoadMunicipal}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerRoadMunicipal}>
                <div>
                    <SketchPicker
                        color={colorRoadMunicipal}
                        onChangeComplete={(val)=>handleChangeComplete(val,'municipal')}
                    />
                    <Button variant onClick={()=>handleColorPickerClose('municipal')}>OK</Button>
                </div>
            </Dialog>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина линии муниципальной дороги</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={0.5}
                        max={5}
                        onChange={(val)=>handleLineWidthChange(val,'municipal')}
                        onAfterChange={(val)=>handleLineWidthAfterChange(val,'municipal')}
                        value={typeof lineWidthRoadMunicipal === 'number' ? lineWidthRoadMunicipal : 0}
                        step={0.1}
                        included={true}
                    />
                </Col>
            </Row>

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Checkbox onChange={handleEndpointsVisible}>Видимость границ дороги</Checkbox>
                </Row>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина маркера границы дорог</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={1}
                            max={5}
                            onChange={handleEndpointWidthChange}
                            onAfterChange={handleEndpointWidthAfterChange}
                            value={typeof endpointWidth === 'number' ? endpointWidth : 0}
                            step={1}
                            included={true}
                        />
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default RoadVisionSettings;
