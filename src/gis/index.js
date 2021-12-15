import React, { Component } from 'react'
import esriLoader from "esri-loader";
import {getToken} from './Utils';
import {default as Layers } from './FeatureLayer';
import {default as SceneLayers } from './SceneLayer';
import {default as CF} from '../utils/ConstantUtils.js';
import {login, queryResult} from '../utils/request';
import {getDataProvider} from '../utils/DataUtils'
import {isEqual} from 'lodash';

import alarmRed from './assets/alarmRed.png';
import sampleData from './assets/default.json';

/**
 * command type: layer,effect,point
 * {
 *  command: point-xx/layer-xx/effect-xx,
 *  show: true/false,
 *  props: {
 *    defineStr: ''
 * }
 * }
 */

const spatialReferencevalue = { wkid: 102100 };

export default class index extends Component {
  constructor(props) {
    super(props);
  }

  getDataSet = async props => {
    const {
      value
    } = props;
    const userToken = this.userToken = await login({ip: CF.IP, port: CF.PORT, username: 'admin', password: 'visthink88'});

    const result = await queryResult({ip: CF.IP, port: CF.PORT, token: this.userToken, value: value});
    return result?.result;
  }

  getCommandType = cmd => {
    return cmd.split('-')[0];
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const data = getDataProvider(nextProps);
      const {command} = data[0] || {};
      const type = this.getCommandType(command);
      if (type) {

        if (type === 'layer') {
          // do something
        }

        if (type === 'point') {
          // do something

          const valueTemplate = `%40test%3A%2F%2F2%3A1%3B`

          this.getDataSet({value: valueTemplate}).then((data) => {
            console.log("data: ", data)
          })
        }

        if (type === 'effect') {
          // do something
        }


      }
    }
  }


  async componentDidMount() {
    // const token = await getToken(); // 地图注册token

    esriLoader
      .loadModules([
        "esri/Map", 
        "esri/views/SceneView",
        "esri/Camera",
        "esri/identity/IdentityManager",
        "esri/layers/TileLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/SceneLayer",
        "esri/geometry/Point",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/CSVLayer",
        "esri/renderers/HeatmapRenderer"
      ])
          .then(([Map, SceneView, Camera, IdentityManager, ArcGISTiledMapServiceLayer, FeatureLayer, SceneLayer, Point, Graphic, GraphicsLayer, CSVLayer, HeatmapRenderer]) => {
            var map = this.map = new Map({});
        
            var view = new SceneView({
              container: "viewDiv",
              map: map,
              showLabels: true,
              camera: {
                tilt: 0,
                position: {
                  x: -7955.226115764595,
                  y: -2607.4065436997591,
                  z: 2000, // altitude in meters
                  spatialReference: spatialReferencevalue
                }
              }
            });

             // 注册地图服务
             IdentityManager.registerToken({
              server: "http://map.cn.gov/OneMapServer/rest/services",
              token: 'sa',
            });

            // 基础地图，扩展于 缓存地图服务的基类 TiledMapServiceLayer
            let tiledLayer = new ArcGISTiledMapServiceLayer({
              url: "http://10.207.204.19/server/rest/services/BIGANSE2/MapServer",
              id: "baseMap",
            });

            map.add(tiledLayer);

            // feature layer - 区界 layer-qujie
            const qujie = this.qujie = Layers.getBorderLayer(FeatureLayer, {spatialReferencevalue: spatialReferencevalue})
            map.add(qujie)

            // feature layer - 街道 layer-jiedao
            const street = this.street = Layers.getStreetLayer(FeatureLayer, {spatialReferencevalue: spatialReferencevalue});
            map.add(street)

            // feature layer - 网格 layer-wangge
            const grid = this.grid = Layers.getGridLayer(FeatureLayer, {spatialReferencevalue: spatialReferencevalue})
            map.add(grid)

            // feature layer - 居委 layer-juwei
            const juwei = this.juwei = Layers.getJuweiLayer(FeatureLayer, {spatialReferencevalue: spatialReferencevalue})
            map.add(juwei)

            // // scene layer - 建筑白模
            // const whiteBuilding = SceneLayers.getBuildingBaiMo(SceneLayer)
            // map.add(whiteBuilding)

            // scene layer - 标模
            // const biaomo = SceneLayers.getBiaomo(SceneLayer)
            // map.add(biaomo);

            const renderer = {
              type: "heatmap",
              colorStops: [
                { color: "rgba(63, 40, 102, 0)", ratio: 0 },
                { color: "#472b77", ratio: 0.083 },
                { color: "#4e2d87", ratio: 0.166 },
                { color: "#563098", ratio: 0.249 },
                { color: "#5d32a8", ratio: 0.332 },
                { color: "#6735be", ratio: 0.415 },
                { color: "#7139d4", ratio: 0.498 },
                { color: "#7b3ce9", ratio: 0.581 },
                { color: "#853fff", ratio: 0.664 },
                { color: "#a46fbf", ratio: 0.747 },
                { color: "#c29f80", ratio: 0.83 },
                { color: "#e0cf40", ratio: 0.913 },
                { color: "#ffff00", ratio: 1 }
              ],
              maxPixelIntensity: 25,
              minPixelIntensity: 0
            };
            
            const layer = new CSVLayer({
              url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
              title: "Magnitude 2.5+ earthquakes from the last week",
              renderer: renderer
            });

            map.add(layer);


            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);


            for (let i = 0; i < sampleData.length; i++) {
              const el = sampleData[i];
              if (el.type === '消防设施物联网') {
                var point = {
                  type: "point",
                  x: el['X'],
                  y: el['Y'],
                  width: '1230px',
                  height: '1230px',
                 
                  spatialReference: spatialReferencevalue
                };
                
                var simpleMarkerSymbol = {
                  type: "picture-marker",
                  url: alarmRed,
                  size: 60,
                };

                var polylineAtt = {
                  Name: "Keystone Pipeline",
                  Owner: "TransCanada"
                };
                
                var pointGraphic = new Graphic({
                  geometry: point,
                  symbol: simpleMarkerSymbol,
                  attributes: polylineAtt
                });
                
                graphicsLayer.add(pointGraphic);
              }
              
            }
            view.when(() => {
              // setTimeout(() => {
              //   view.goTo(
              //     {
              //       position: {
              //         x: 161.598959,
              //         y: 35.601398,
              //         z: 15000, // altitude in meters
              //         spatialReference: spatialReferencevalue
              //       },
              //       heading: 0,
              //       tilt: 0
              //     },
              //     {
              //       speedFactor: 0.1
              //     }
              //   );
              // }, 200000);

              // setTimeout(() => {
              //   setInterval(() => {
              //     view.goTo({
              //       heading:
              //         (view.camera.heading +
              //           0.2 * 1) %
              //         360,
              //     });
              //   }, 200)
              // }, 30000);

              
              
            }, (err) => {

            })

            // view.whenLayerView(qujie)
            // .then((layerView) => {
            //   // The layerview for the layer
            //   console.log("qujie: ", layerView)
            // })
            // .catch((error) => {
            //   // An error occurred during the layerview creation
            // });
          

            // var basemapToggle = new BasemapToggle({
            //   view: view,
            //   nextBasemap: "satellite"
            // });
            
            // var basemapGallery = new BasemapGallery({
            //   view: view,
            //   source: {
            //     portal: {
            //       url: "https://www.arcgis.com",
            //       useVectorBasemaps: true // Load vector tile basemaps
            //     }
            //   }
            // });

            // view.ui.add(basemapGallery, "bottom-right");

            // common layer

            // var trailheadsLayer = new FeatureLayer({
            //   url:
            //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
            // });

            // map.add(trailheadsLayer);

            // // Trails feature layer (lines)
            // var trailsLayer = new FeatureLayer({
            //   url:
            //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            //     definitionExpression: "ELEV_GAIN < 250",
            //      //*** ADD ***//
            //     renderer: {
            //       type: "simple",
            //       symbol: {
            //         type: "simple-line",
            //         color: "green",
            //         width: "2px"
            //       }
            //     },
            //      //*** ADD ***//
            //     outFields: ["TRL_NAME", "ELEV_GAIN"],

            //     //*** ADD ***//
            //     popupTemplate: {
            //       // Enable a popup
            //       title: "{TRL_NAME}", // Show attribute value
            //       content: "The trail elevation gain is {ELEV_GAIN} ft." // Display text in pop-up
            //     }
            // });

            // map.add(trailsLayer, 0);

            // // Parks and open spaces (polygons)
            // var parksLayer = new FeatureLayer({
            //   url:
            //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
            // });

            // map.add(parksLayer, 0);

            // var trailheadsRenderer = {
            //   type: "simple",
            //   symbol: {
            //     type: "picture-marker",
            //     url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            //     width: "18px",
            //     height: "18px"
            //   }
            // };

            // var trailheadsLabels = {
            //   symbol: {
            //     type: "text",
            //     color: "#FFFFFF",
            //     haloColor: "#5E8D74",
            //     haloSize: "2px",
            //     font: {
            //       size: "12px",
            //       family: "Noto Sans",
            //       style: "italic",
            //       weight: "normal"
            //     }
            //   },
            //   labelPlacement: "above-center",
            //   labelExpressionInfo: {
            //     expression: "$feature.TRL_NAME"
            //   }
            // };

            // var trailheads = new FeatureLayer({
            //   url:
            //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
            //   renderer: trailheadsRenderer,
            //   labelingInfo: [trailheadsLabels]
            // });
            
            // map.add(trailheads);

            // var trailsRenderer = {
            //   type: "simple",
            //   symbol: {
            //     color: "#BA55D3",
            //     type: "simple-line",
            //     style: "solid"
            //   },
            //   visualVariables: [
            //     {
            //       type: "size",
            //       field: "ELEV_GAIN",
            //       minDataValue: 0,
            //       maxDataValue: 2300,
            //       minSize: "3px",
            //       maxSize: "7px"
            //     }
            //   ]
            // };

            // var trails = new FeatureLayer({
            //   url:
            //     "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
            //   renderer: trailsRenderer,
            //   opacity: 0.75
            // });
            
            // map.add(trails, 0);

            // trails.on("layerview-create", function(event){
            //   // The LayerView for the layer that emitted this event
            //   event.layerView;
            //   console.log("event: ", event)
            // });

            
            
      })
  }

  render() {
    return (
      <div id = 'viewDiv' style = {{padding: 0, margin: 0, width: '100%', height: '100%'}}>
        
      </div>
    )
  }
}
