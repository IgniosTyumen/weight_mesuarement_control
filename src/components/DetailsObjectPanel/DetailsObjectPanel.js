import React from "react";
import Preloader from "../ui/Preloader";
import RoadDetailObjectContainer from "../RoadDetailObject/RoadDetailObjectContainer";
import BridgeDetailedObjectContainer from "../BridgeDetailsObject/BridgeDetailedObjectContainer";
import DangerRoadDetailObjectContainer from "../DangerRoadDetailObject/DangerRoadDetailObjectContainer";
import TunnelsDetailedObjectContainer from "../TunnelsDetailsObject/TunnelsDetailedObjectContainer";
import PipesDetailedObjectContainer from "../PipesDetailsObject/PipesDetailedObjectContainer";
import PipelinesDetailedObjectContainer from "../PipelinesDetailsObject/PipelinesDetailedObjectContainer";

const DetailsObjectPanel = (props) => {

    const {detailedObjectType, detailedObject, handleSelectDetailedObject,fetching} = props;

    return (
        <div className={"detailsObjectPanel"}>
            {fetching && !detailedObjectType && <Preloader/>}
            {!fetching && detailedObjectType==='bridge' && <BridgeDetailedObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='road' && <RoadDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='dangerRoad' && <DangerRoadDetailObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}

            {!fetching && detailedObjectType==='tunnel' && <TunnelsDetailedObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='pipe' && <PipesDetailedObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
            {!fetching && detailedObjectType==='pipeline' && <PipelinesDetailedObjectContainer object={detailedObject} handleSelectDetailedObject={handleSelectDetailedObject}/>}
        </div>
    )
};

export default DetailsObjectPanel;
