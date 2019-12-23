import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as mapActions from "~/actions/MapActions";
import * as selectObjectsActions from "~/actions/SelectObjectsActions";
import getPointsArrayFromPoint from "../../utils/getPointsArrayFromPoints";
import PipelinesDetailedObject from "./PipelinesDetailedObject";


const PipelinesDetailedObjectContainer = props => {

    const {object, handleSelectDetailedObject, mapActions, selectObjectsActions} = props ;

    const moveMapToObject = () => {
        mapActions.setCenterAndZoom(getPointsArrayFromPoint(object.point)[0]);
        selectObjectsActions.selectPipe(object);
    }

    return (
        <PipelinesDetailedObject
            object={object}
            handleSelectDetailedObject={handleSelectDetailedObject}
            moveMapToObject={moveMapToObject}
        />
    )
};

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch =>{
    return {
        dispatch: dispatch,
        mapActions: bindActionCreators(mapActions,dispatch),
        selectObjectsActions: bindActionCreators(selectObjectsActions,dispatch)
    }
};

export  default connect(mapStateToProps, mapDispatchToProps)(PipelinesDetailedObjectContainer)
