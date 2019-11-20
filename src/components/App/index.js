import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Map from "~/components/Map";
import MainControlPanelContainer from "../MainControlPanel/MainControlPanelContainer";
import * as AppActions from "~/actions/AppActions";
import {bindActionCreators} from "redux";

const Fragment = React.Fragment;

const App = ({appActions}) =>  {
    useEffect(()=> appActions.initApp(),[]);
    return (
      <Fragment>

        <Map style={{overflow:'hidden'}}/>
        <MainControlPanelContainer/>

      </Fragment>
    );
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => {
    return {
       appActions : bindActionCreators(AppActions, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
