import React, {Fragment, useEffect, useState} from "react";
import {SketchPicker} from 'react-color';
import Dialog from "@material-ui/core/Dialog";
import Button from "../ui/Button";
import {Slider, InputNumber, Row, Col} from 'antd';

const DangerRoadVisionSettings = props => {

    const [colorRoadPrimary, setColorRoadPrimary] = useState();
    const [visibleColorPickerPrimary, setVisibleColorPickerPrimary] = useState(false);
    const [colorRoadSecondary, setColorRoadSecondary] = useState()
    const [visibleColorPickerSecondary, setVisibleColorPickerSecondary] = useState(false);
    const [lineWidth, setLineWidth] = useState();
    const [strokeLength, setStrokeLength] = useState();

    const {userPreferences, userPreferencesActions} = props;
    const handleChangeCompletePrimary = (color) => {
        setColorRoadPrimary(color.hex);
        userPreferencesActions.changeDangerRoadColorPrimary(color.hex);

    }

    const handleChangeCompleteSecondary = (color) => {
        setColorRoadSecondary(color.hex);
        userPreferencesActions.changeDangerRoadColorSecondary(color.hex);

    }

    const handleColorPickerOpenPrimary = () => {
        setVisibleColorPickerPrimary(true)
    }

    const handleColorPickerClosePrimary = () => {
        setVisibleColorPickerPrimary(false)
    }

    const handleColorPickerOpenSecondary = () => {
        setVisibleColorPickerSecondary(true)
    }

    const handleColorPickerCloseSecondary = () => {
        setVisibleColorPickerSecondary(false)
    }

    const handleLineWidthChange = (value) => {
        setLineWidth(value);
    }

    const handleLineWidthAfterChange = (value) => {
        userPreferencesActions.changeDangerRoadWidth(value);
    }

    const handleStrokeLengthChange = (value) => {
        setStrokeLength(value);
    }

    const handleStrokeLengthAfterChange = (value) => {
        userPreferencesActions.changeDangerRoadStrokeLength(value);
    }

    const coverStyle = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    };

    const initFromProps = () => {
        setColorRoadPrimary(userPreferences.dangerRoadsColor1);
        setColorRoadSecondary(userPreferences.dangerRoadsColor2);
        setLineWidth(userPreferences.dangerRoadsWidth);
        setStrokeLength(userPreferences.dangerRoadsStrokeLength);
    }

    useEffect(initFromProps,[]);

    return (
        <div className={"settingsBlock"}>
            <div onClick={handleColorPickerOpenPrimary} className={'roadColorSelectorWrapper'}>
                <span>Цвет линии дороги</span>
                <div style={{backgroundColor: colorRoadPrimary}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerPrimary}>
                <div>
                    <SketchPicker
                        color={colorRoadPrimary}
                        onChangeComplete={handleChangeCompletePrimary}
                    />
                    <Button variant onClick={handleColorPickerClosePrimary}>OK</Button>
                </div>
            </Dialog>
            <div onClick={handleColorPickerOpenSecondary} className={'roadColorSelectorWrapper'}>
                <span>Цвет  штриха линии дороги</span>
                <div style={{backgroundColor: colorRoadSecondary}} className={'roadColorSelector'}/>
            </div>
            <Dialog open={visibleColorPickerSecondary}>
                <div>
                    <SketchPicker
                        color={colorRoadSecondary}
                        onChangeComplete={handleChangeCompleteSecondary}
                    />
                    <Button variant onClick={handleColorPickerCloseSecondary}>OK</Button>
                </div>
            </Dialog>
            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина линии</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0.5}
                            max={5}
                            onChange={handleLineWidthChange}
                            onAfterChange={handleLineWidthAfterChange}
                            value={typeof lineWidth === 'number' ? lineWidth : 0}
                            step={0.1}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>

            <div className={'settingsBlock'}>
                <Row align={'middle'}>
                    <Col span={6}>
                        <p>Ширина штриха</p>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0}
                            max={100}
                            onChange={handleStrokeLengthChange}
                            onAfterChange={handleStrokeLengthAfterChange}
                            value={typeof strokeLength === 'number' ? strokeLength : 0}
                            step={5}
                            included={true}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DangerRoadVisionSettings;
