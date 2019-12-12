import React from "react";
import Preloader from "../ui/Preloader";
import RoadDetailObjectContainer from "../RoadDetailObject/RoadDetailObjectContainer";
import BridgeDetailedObjectContainer from "../BridgeDetailsObject/BridgeDetailedObjectContainer";
import DangerRoadDetailObjectContainer from "../DangerRoadDetailObject/DangerRoadDetailObjectContainer";

const DetailsObjectPanel = (props) => {

    const {detailedObjectType, detailedObject, handleSelectDetailedObject,fetching} = props;

    return (
        <div className={"detailsObjectPanel"}>
            {fetching && !detailedObjectType && <Preloader/>}
            {!fetching && detailedObjectType==='bridge' && <BridgeDetailedObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='road' && <RoadDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='dangerRoad' && <DangerRoadDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
        </div>
    )
};

export default DetailsObjectPanel;
