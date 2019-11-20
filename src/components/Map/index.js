import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mapActions from "~/actions/MapActions";
import {Map as LeafletMap,} from 'react-leaflet';
import Tangram from 'tangram';

class Map extends React.Component {
    componentDidMount() {
        const layer = Tangram.leafletLayer({
            introspection: true,
            scene: {
                import: [
                    'https://www.nextzen.org/carto/bubble-wrap-style/8/bubble-wrap-style.zip',
                    'https://www.nextzen.org/carto/bubble-wrap-style/8/themes/label-10.zip'
                    // 'https://www.nextzen.org/carto/refill-style/12/refill-style.zip',
                    // 'https://www.nextzen.org/carto/refill-style/11/themes/color-blue.zip',
                    // 'https://www.nextzen.org/carto/refill-style/11/themes/label-10.zip',
                ],
                webGLContextOptions: {
                    preserveDrawingBuffer: true,
                    antialias: false
                },
                sources: {
                    mapzen: {
                        url: 'https://tile.nextzen.org/tilezen/vector/v1/256/all/{z}/{x}/{y}.mvt',
                        url_params: {
                            api_key: 'pNT_TKv0QgeG-XhwfK2TJA'
                        },
                        tile_size: 256,
                        max_zoom: 16
                    }
                }
            }
        });
        layer.addTo(this.map.leafletElement);

        const roadsLayer = <RoadsLayerContainer/>
        roadsLayer.addTo(this.map.leafletElement);
    }

    render() {
        const {center, zoom} = this.props.map;
        const {layers} = this.props;


        return (
            <LeafletMap
                ref={(ref) => {
                    this.map = ref
                }}
                zoomControl={false}
                viewport={{center: [56.9809, 66.3519], zoom: 9}}
                preferCanvas={true}
                draggable={false}
            >

            </LeafletMap>
        );
    }
}

const mapStateToProps = state => {
    return {
        map: state.map

    }
};
const mapDispatchToProps = dispatch => ({
    mapActions: bindActionCreators(mapActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
