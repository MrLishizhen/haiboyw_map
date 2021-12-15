import { default as layers } from './layerUrisConstant';

const getBorderLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.border,
    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        width: 3,
        color: [255, 255, 255, 1],
        style: "solid",
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: "区界",
  });
}

const getStreetLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.street,
    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        width: 1,
        color: [200, 255, 200, 1],
        style: "solid",
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: "街道界",
  });
}

const getGridLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.grid,
    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        width: 1,
        color: [200, 200, 255, 1],
        style: "solid",
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: "网格",
  });
}

const getJuweiLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.juwei,
    renderer: {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        width: 1,
        color: [200, 200, 100, 1],
        style: "solid",
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: "街道界",
  });
}

export default {
  getBorderLayer,
  getStreetLayer,
  getGridLayer,
  getJuweiLayer
}


