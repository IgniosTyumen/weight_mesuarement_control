import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import GroupButtonBoxContainer from "../GroupButtonsBox/GroupButtonBoxContainer";
import LayersPanelContainer from "../LayersPanel/LayersPanelContainer";
import BridgesPanelContainer from "../BridgesPanel/BridgesPanelContainer";
import DetailsObjectPanelContainer from "../DetailsObjectPanel/DetailsObjectPanelContainer";
import RoadControlPanelContainer from "../RoadControlPanel/RoadControlPanelContainer";
import {bridgesApi, dangersApi, detailsApi, roadsApi} from "../../api/api";
import DangerRoadsPanelContainer from "../DangerRoadsPanel/DangerRoadsPanelContainer";
import OrderControlPanelContainer from "../OrderControlPanel/OrderControlPanelContainer";
import TunnelsPanelContainer from "../TunnelsPanel/TunnelsPanelContainer";
import PipesPanelContainer from "../PipesPanel/PipesPanelContainer";
import PipelinesPanelContainer from "../PipelinesPanel/PipelinesPanelContainer";

const MainControlPanel = (props) => {
    const [openedPanel, setOpenedPanel] = useState('initClosedPanel');
    const [mainGroupWindow, setMainGroupWindow] = useState('');
    const [detailedObject, setDetailedObject] = useState();
    const [detailedObjectType, setDetailedObjectType] = useState();
    const [detailedObjectFetching, setDetailedObjectFetching] = useState(false);


    const handleSelectDetailedObject = async (obj, type) => {
        let detailedObject = null;
        if (type) {
            switch (type) {
                case 'road': {
                    setDetailedObjectFetching(true);
                    detailedObject = await roadsApi.getRoadInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'bridge': {
                    setDetailedObjectFetching(true);
                    detailedObject = await bridgesApi.getBridgeInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'dangerRoad': {
                    setDetailedObjectFetching(true);
                    detailedObject = await dangersApi.getDangerRoadInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'tunnel': {
                    setDetailedObjectFetching(true);
                    //TODO tunnel api
                    detailedObject = await detailsApi.getTunnelInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'pipe': {
                    setDetailedObjectFetching(true);
                    //TODO tunnel api
                    detailedObject = await detailsApi.getPipeInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
                case 'pipeline': {
                    setDetailedObjectFetching(true);
                    //TODO tunnel api
                    detailedObject = await detailsApi.getPipelineInfoById(obj.id);
                    setDetailedObjectFetching(false);
                    break;
                }
            }

        }
        setDetailedObject(detailedObject);
        setDetailedObjectType(type);
    };

    const handleSetMainGroupWindow = (value) => {
        setMainGroupWindow(value)
    };

    const handleOpeningPanel = (event) => {
        event.stopPropagation();
        if (!openedPanel || openedPanel === 'closedMainControlPanel' || openedPanel==='initClosedPanel') {
            setOpenedPanel('openedMainControlPanel');
        }
    };

    const handleClosePanel = (event) => {
        event.stopPropagation();
        setOpenedPanel('closedMainControlPanel');
        setDetailedObject(null);
        setDetailedObjectType(null);
    };

    const handleClearMainWindow = (event)=> {
        event.stopPropagation();
        setMainGroupWindow('');
        setDetailedObject(null);
        setDetailedObjectType(null);
    };

    return (
        <div className={`mainControlPanel ${openedPanel}`}>
            {openedPanel === 'openedMainControlPanel' && <div className={"mainControlButtonDefault"} onClick={handleClearMainWindow}>
                <IconButton>
                    <CloseIcon/>
                </IconButton>
            </div>}
            {openedPanel !== 'openedMainControlPanel' &&
            <div className={"mainControlButtonSwitch"} onClick={handleOpeningPanel}>
                <IconButton>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            }
            {openedPanel === 'openedMainControlPanel' &&
            <div className={"mainControlButtonSwitch"} onClick={handleClosePanel}>
                <IconButton>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>}

            {
                <GroupButtonBoxContainer handleSetMainGroupWindow={handleSetMainGroupWindow} handleSelectDetailedObject={handleSelectDetailedObject}/>
            }

            {
                <div className={`mainGroupWindow ${mainGroupWindow ? 'activateMainGroupWindowAnimation opened' : 'closed'}`}>
                    {mainGroupWindow==='layers' && <LayersPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='bridges' && <BridgesPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='roads' && <RoadControlPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='dangers' && <DangerRoadsPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='order' && <OrderControlPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}

                    {mainGroupWindow==='tunnels' && <TunnelsPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='pipes' && <PipesPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                    {mainGroupWindow==='pipelines' && <PipelinesPanelContainer handleSelectDetailedObject={handleSelectDetailedObject}/>}
                </div>
            }

            {
                detailedObject && <DetailsObjectPanelContainer detailedObject={detailedObject} detailedObjectType={detailedObjectType} handleSelectDetailedObject={handleSelectDetailedObject} fetching={detailedObjectFetching}/>
            }

        </div>
    )
};

export default MainControlPanel;
