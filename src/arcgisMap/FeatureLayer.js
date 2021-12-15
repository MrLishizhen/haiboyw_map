import { default as layers } from './layerUrisConstant';

const getBorderLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.border,
    renderer: {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-line', // autocasts as new SimpleLineSymbol()
        width: 3,
        color: [255, 255, 255, 1],
        style: 'solid',
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: '区界',
  });
}

const getStreetLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.street,
    renderer: {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-line', // autocasts as new SimpleLineSymbol()
        width: 3,
        color: [200, 255, 200, 1],
        style: 'solid',
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: '街道界',
  });
}

const getGridLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.grid,
    // renderer: {
    //   type: 'simple', // autocasts as new SimpleRenderer()
    //   symbol: {
    //     type: 'simple-line', // autocasts as new SimpleLineSymbol()
    //     width: 3,
    //     color: [200, 200, 255, 1],
    //     style: 'solid',
    //   },
    // },
    // minScale: 0,
    // maxScale: 0,
    // spatialReference: props.spatialReferencevalue,
    title: '网格',
    definitionExpression: `所属街道='虹桥街道'`,
    renderer: {
      type: 'unique-value',
      field: 'OBJECTID',
      defaultSymbol: { type: 'simple-fill', color: [200, 200, 100, 1] },
      uniqueValueInfos: [
        {
          value: 2064,
          symbol: {
            type: 'simple-fill',
            color: [200, 200, 255, 1]
          },
        }
      ]
    },
    outFields: ['*'],
    popupTemplate: {
      'title': '',
      'content': `<div><div>{OBJECTID}</div></div>`
    }
  });
}

const getJuweiLayer = (FeatureLayer, props) => {
  return new FeatureLayer({
    url: layers.juwei,
    renderer: {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-line', // autocasts as new SimpleLineSymbol()
        width: 3,
        color: [200, 200, 100, 1],
        style: 'solid',
      },
    },
    minScale: 0,
    maxScale: 0,
    spatialReference: props.spatialReferencevalue,
    title: '街道界',
  });
}

const getRoadLayer = (FeatureLayer, props) => {
  return layers.road.map(item => {
    return new FeatureLayer({
      url: item.url,
      // renderer: {
      //   type: 'simple', // autocasts as new SimpleRenderer()
      //   symbol: {
      //     type: 'simple-line', // autocasts as new SimpleLineSymbol()
      //     width: 3,
      //     color: [200, 200, 100, 1],
      //     style: 'solid',
      //   },
      // },
      minScale: 0,
      maxScale: 0,
      spatialReference: props.spatialReferencevalue,
      title: item.title,
      outFields: ['*'],
      popupTemplate: {
        "title": "Trail Information",
        "content": function () {
          return "add";
        }
      }
    });
  });
}

export default {
  getBorderLayer,
  getStreetLayer,
  getGridLayer,
  getJuweiLayer,
  getRoadLayer
}


