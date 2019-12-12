import React, {Fragment, useEffect, useState} from "react";
import {SketchPicker} from 'react-color';
import Dialog from "@material-ui/core/Dialog";
import Button from "../ui/Button";
import {Slider, InputNumber, Row, Col, Checkbox} from 'antd';

const RoadVisionSettings = props => {

    const [colorRoadFederal, setColorRoadFederal] = useState('green')
    const [visibleColorPickerRoadFederal, setVisibleColorPickerRoadFederal] = useState(false);
    const [lineWidthRoadFederal, setLineWidthRoadFederal] = useState();
    const [colorRoadRegional, setColorRoadRegional] = useState('red')
    const [visibleColorPickerRoadRegional, setVisibleColorPickerRoadRegional] = useState(false);
    const [lineWidthRoadRegional, setLineWidthRoadRegional] = useState();
    const [colorRoadMunicipal, setColorRoadMunicipal] = useState('blue')
    const [visibleColorPickerRoadMunicipal, setVisibleColorPickerRoadMunicipal] = useState(false);
    const [lineWidthRoadMunicipal, setLineWidthRoadMunicipal] = useState();


    const [endpointVisible, setEndpointVisible] = useState(true);
    const [endpointWidth, setEndpointWidth] = useState(10)

    const {userPreferences, userPreferencesActions} = props;


    const handleChangeComplete = (color,type) => {
        switch (type) {
            case 'federal':
                setColorRoadFederal(color.hex);
                userPreferencesActions.changeRouteColor(color.hex,type);
                break;
            case 'regional':
                setColorRoadRegional(color.hex);
                userPreferencesActions.changeRouteColor(color.hex,type);
                break;
            case 'municipal':
                setColorRoadMunicipal(color.hex);
                userPreferencesActions.changeRouteColor(color.hex,type);
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
                userPreferencesActions.changeRouteLineWeight(value,type);
                break;
            case 'regional':
                userPreferencesActions.changeRouteLineWeight(value,type);
                break;
            case 'municipal':
                userPreferencesActions.changeRouteLineWeight(value,type);
                break;
        }
    }

    const coverStyle = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };

    const initFromProps = () => {
        setColorRoadFederal(userPreferences.colorRoadFederal || 'red');
        setColorRoadRegional(userPreferences.colorRoadRegional || 'red');
        setColorRoadMunicipal(userPreferences.colorRoadMunicipal || 'red');
        setLineWidthRoadFederal(userPreferences.lineWidthRoadFederal);
        setLineWidthRoadRegional(userPreferences.lineWidthRoadRegional);
        setLineWidthRoadMunicipal(userPreferences.lineWidthRoadMunicipal);
        setEndpointVisible(userPreferences.endpointRouteVisible);
        setEndpointWidth(userPreferences.endpointRouteWidth);
    }

    const handleEndpointsVisible = (event) => {
        setEndpointVisible(event.target.checked);
        userPreferencesActions.changeRouteWaypointsVisible(event.target.checked)
    }

    const handleEndpointWidthChange = (value) => {
        setEndpointWidth(value);
        userPreferencesActions.changeRoutesWaypointsWidth(value);
    }


    useEffect(initFromProps,[]);

    return (
        <div className={"settingsBlock"}>
            <div onClick={()=>handleColorPickerOpen('federal')} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии федерального маршрута</span>
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
                        <p>Ширина линии федерального маршрута</p>
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
                <span>Цвет линии регионального маршрута</span>
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
                    <p>Ширина линии регионального маршрута</p>
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
                <span>Цвет линии муниципального маршрута</span>
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
                    <p>Ширина линии муниципального маршрута</p>
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
            <Row align={'middle'}>
                <Checkbox onChange={handleEndpointsVisible}>Видимость границ маршрута</Checkbox>
            </Row>
            <Row align={'middle'}>
                <Col span={6}>
                    <p>Ширина маркера границы маршрута</p>
                </Col>
                <Col span={18}>
                    <Slider
                        min={5}
                        max={20}
                        onChange={handleEndpointWidthChange}
                        onAfterChange={handleEndpointWidthChange}
                        value={typeof endpointWidth === 'number' ? endpointWidth : 0}
                        step={1}
                        included={true}
                    />
                </Col>
            </Row>

        </div>
    )
}

export default RoadVisionSettings;
