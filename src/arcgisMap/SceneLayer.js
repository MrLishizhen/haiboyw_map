import { default as layers } from './layerUrisConstant';

const getBuildingBaiMo = (SceneLayer, props) => {
  return new SceneLayer({
    url: layers.buildingBaiMo,
    popupEnabled: false,
    renderer: {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'mesh-3d', // autocasts as new MeshSymbol3D()
        symbolLayers: [
          {
            type: 'fill', // autocasts as new FillSymbol3DLayer()
            // If the value of material is not assigned, the default color will be grey
            material: {
              color: [103, 216, 255, 0.7],
              colorMixMode: 'replace',
            },
            edges: {
              type: 'solid',
              color: [0, 0, 0, 0.1],
              size: 1,
            },
          },
        ],
      }
    },
    id: 'building white'
  });
}

const getBuildingJingMo = (SceneLayer, props) => {
  return layers.buildingJingMo.map((url, i) => {
    return new SceneLayer({
      url: url,
      popupEnabled: false,
      id: 'building real' + i,
    });
  })
}

export default {
  getBuildingBaiMo,
  getBuildingJingMo
}