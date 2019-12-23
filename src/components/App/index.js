import React, {Fragment, Suspense, useEffect} from 'react';
import {connect, Provider} from 'react-redux';
// import Map from "~/components/Map";
import MainControlPanelContainer from "../MainControlPanel/MainControlPanelContainer";
import * as AppActions from "~/actions/AppActions";
import {bindActionCreators, compose} from "redux";
import PreloaderContainer from "../Preloader/PreloaderContainer";
import {HashRouter, Route, withRouter} from "react-router-dom";
import {store} from "~/store/configureStore";
import DrawPanelContainer from "../DrawPanel/DrawPanelContainer";


const Map = React.lazy(() => import('~/components/Map'));

const App = ({appActions, isInitialized,...props}) => {

    useEffect(() => appActions.initApp(props), []);

    return (
        <Fragment>
            <Route path='/:documentId'
                   exact
                   render={() => {
                       return (
                           <Fragment>
                               {<PreloaderContainer/>}
                               {
                                   isInitialized
                                   && <MainControlPanelContainer/>
                               }
                               {
                                   isInitialized
                                   && <DrawPanelContainer/>
                               }
                               <Suspense fallback={<h1>Loading map...</h1>}>
                                <Map style={{overflow: 'hidden'}}/>
                               </Suspense>
                           </Fragment>
                       )
                   }
                   }
            />

        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isInitialized: state.initial.isInitialized
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: bindActionCreators(AppActions, dispatch),
    }
};

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps))(App)


const AppEntryPoint = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}

export default AppEntryPoint;
