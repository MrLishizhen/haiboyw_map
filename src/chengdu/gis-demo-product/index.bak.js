import React, { Component } from "react"
import esriLoader from "esri-loader";

export default class index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        esriLoader
            .loadModules(
                [
                    "esri/Map",
                    "esri/views/MapView",
                    // "esri/widgets/BasemapToggle",
                    // "esri/widgets/BasemapGallery",
                    "esri/layers/FeatureLayer",
                    "esri/layers/GraphicsLayer",
                    "esri/Graphic"
                ]
            )
            .then(([
                Map,
                MapView,
                // BasemapToggle,
                // BasemapGallery,
                FeatureLayer,
                GraphicsLayer,
                Graphic
            ]) => {
                var map = new Map({
                    basemap: "topo-vector"
                });

                var view = new MapView({
                    container: "viewDiv",
                    map: map,
                    center: [-118.80500, 34.02700], // longitude, latitude
                    zoom: 13
                });

                var featureLayer = new FeatureLayer({
                    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
                });

                var graphicsLayer = new GraphicsLayer();
                map.add(graphicsLayer);

                view.when(function () {
                    queryFeatureLayer(view.center, 2500, "intersects");
                });

                function queryFeatureLayer(point, distance, spatialRelationship, sqlExpression) {
                    var query = {
                        geometry: point,
                        distance: distance,
                        spatialRelationship: spatialRelationship,
                        outFields: ["*"],
                        returnGeometry: true,
                        where: sqlExpression
                    };
                    featureLayer.queryFeatures(query).then(function (result) {
                        addGraphics(result, true);
                    });
                }

                function addGraphics(result) {
                    graphicsLayer.removeAll();
                    result.features.forEach(function (feature) {
                        var g = new Graphic({
                            geometry: feature.geometry,
                            attributes: feature.attributes,
                            symbol: {
                                type: "simple-marker",
                                color: [0, 0, 0],
                                outline: {
                                    width: 2,
                                    color: [0, 255, 255],
                                },
                                size: "20px"
                            },
                            popupTemplate: {
                                title: "{TRL_NAME}",
                                content: "This a {PARK_NAME} trail located in {CITY_JUR}."
                            }
                        });
                        graphicsLayer.add(g);
                    });
                }

                // var basemapToggle = new BasemapToggle({
                //     view: view,
                //     nextBasemap: "satellite"
                // });

                // view.ui.add(basemapToggle, "bottom-right");

                // var basemapGallery = new BasemapGallery({
                //     view: view,
                //     source: {
                //         portal: {
                //             url: "https://www.arcgis.com",
                //             useVectorBasemaps: false  // Load vector tile basemaps
                //         }
                //     }
                // });

                // view.ui.add(basemapGallery, "top-right");

                // Trailheads feature layer (points)
                // var trailheadsLayer = new FeatureLayer({
                //     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
                //     // renderer: {
                //     //     type: "simple",
                //     //     symbol: {
                //     //         type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                //     //         color: [255, 128, 0, 0.5],
                //     //         outline: {
                //     //             width: 0
                //     //         }
                //     //     }
                //     // },
                //     renderer: {
                //         type: "simple",
                //         symbol: {
                //             type: "picture-marker",
                //             url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                //             width: "18px",
                //             height: "18px"
                //         }
                //     },
                //     labelingInfo: [{
                //         symbol: {
                //             type: "text",
                //             color: "#FFFFFF",
                //             haloColor: "#5E8D74",
                //             haloSize: "4px",
                //             font: {
                //                 size: "12px",
                //                 family: "Noto Sans",
                //                 style: "italic",
                //                 weight: "normal"
                //             }
                //         },
                //         labelPlacement: "above-center",
                //         labelExpressionInfo: {
                //             expression: "$feature.TRL_NAME"
                //         }
                //     }]
                // });
                // map.add(trailheadsLayer);

                // // Trails feature layer (lines)
                // var trailsLayer = new FeatureLayer({
                //     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
                //     // definitionExpression: "ELEV_GAIN < 250", // 海拔小于250
                //     // renderer: {
                //     //     type: "simple",
                //     //     symbol: {
                //     //         type: "simple-line",
                //     //         color: "green",
                //     //         width: "4px"
                //     //     }
                //     // },
                //     renderer: {
                //         type: "simple",
                //         symbol: {
                //             type: "simple-line",
                //             style: "solid",
                //             color: "#BA55D3"
                //         },
                //         visualVariables: [
                //             {
                //                 type: "size",
                //                 field: "ELEV_GAIN",
                //                 minDataValue: 0,
                //                 maxDataValue: 2300,
                //                 minSize: "1px",
                //                 maxSize: "1px"
                //             }
                //         ]
                //     },
                //     outFields: ["TRL_NAME", "ELEV_GAIN"],
                //     popupTemplate: {  // Enable a popup
                //         title: "{TRL_NAME}", // Show attribute value
                //         content: "The trail elevation gain is {ELEV_GAIN} ft."  // Display text in pop-up
                //     }
                // });
                // map.add(trailsLayer, 0);

                // Parks and open spaces (polygons)
                // var parksLayer = new FeatureLayer({
                //     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
                // });
                // map.add(parksLayer, 0);

                // var popupTrailheads = {
                //     "title": "{TRL_NAME}",
                //     "content": "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
                // }
                // var popupTrails = {
                //     "title": "Trail Information",
                //     "content": function () {
                //         return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing.";
                //     }
                // }
                // var popupOpenspaces = {
                //     "title": "{PARK_NAME}",
                //     "content": [{
                //         "type": "fields",
                //         "fieldInfos": [
                //             {
                //                 "fieldName": "AGNCY_NAME",
                //                 "label": "Agency",
                //                 "isEditable": true,
                //                 "tooltip": "",
                //                 "visible": true,
                //                 "format": null,
                //                 "stringFieldOption": "text-box"
                //             },
                //             {
                //                 "fieldName": "TYPE",
                //                 "label": "Type",
                //                 "isEditable": true,
                //                 "tooltip": "",
                //                 "visible": true,
                //                 "format": null,
                //                 "stringFieldOption": "text-box"
                //             },
                //             {
                //                 "fieldName": "ACCESS_TYP",
                //                 "label": "Access",
                //                 "isEditable": true,
                //                 "tooltip": "",
                //                 "visible": true,
                //                 "format": null,
                //                 "stringFieldOption": "text-box"
                //             },
                //             {
                //                 "fieldName": "GIS_ACRES",
                //                 "label": "Acres",
                //                 "isEditable": true,
                //                 "tooltip": "",
                //                 "visible": true,
                //                 "format": {
                //                     "places": 2,
                //                     "digitSeparator": true
                //                 },
                //                 "stringFieldOption": "text-box"
                //             }
                //         ]
                //     }]
                // }
                // var popupTrails = {
                //     title: "Trail Information",
                //     //*** ADD ***//
                //     // content: function(){
                //     //    return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing.";
                //     // }
                //     content: [{
                //       type: "media",
                //         mediaInfos: [{
                //           type: "column-chart",
                //           caption: "",
                //           value: {
                //             fields: [ "ELEV_MIN","ELEV_MAX" ],
                //             normalizeField: null,
                //             tooltipField: "Min and max elevation values"
                //           }
                //         }]
                //     }]
                //   }

                // var parksLayer = new FeatureLayer({
                //     url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0',
                //     outFields: ["*"],
                //     popupTemplate: popupTrails
                // });
                // map.add(parksLayer);

                // var featureLayer = new FeatureLayer({
                //     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
                // });

                // // Layer used to draw graphics returned
                // var graphicsLayer = new GraphicsLayer();
                // map.add(graphicsLayer);

                // function addGraphics(result) {
                //     graphicsLayer.removeAll();
                //     result.features.forEach(function (feature) {
                //         var g = new Graphic({
                //             geometry: feature.geometry,
                //             attributes: feature.attributes,
                //             symbol: {
                //                 type: "simple-marker",
                //                 color: [0, 0, 0],
                //                 outline: {
                //                     width: 2,
                //                     color: [0, 255, 255],
                //                 },
                //                 size: "20px"
                //             },
                //             popupTemplate: {
                //                 title: "{TRL_NAME}",
                //                 content: "This a {PARK_NAME} trail located in {CITY_JUR}."
                //             }
                //         });
                //         graphicsLayer.add(g);
                //     });
                // }

                // function queryFeatureLayer(point, distance, spatialRelationship, sqlExpression) {
                //     var query = {
                //         geometry: point,
                //         distance: distance,
                //         spatialRelationship: spatialRelationship,
                //         outFields: ["*"],
                //         returnGeometry: true,
                //         where: sqlExpression
                //     };
                //     featureLayer.queryFeatures(query).then(function (result) {
                //         addGraphics(result, true);
                //     });
                // }

                // view.when(function () {
                //     queryFeatureLayer(view.center, 15000, "intersects");
                // });
            })
    }

    render() {
        return (
            <div id="viewDiv" style={{ width: "100%", height: "100%" }}>

            </div>
        );
    }
}