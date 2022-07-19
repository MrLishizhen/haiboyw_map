export default {
  "区县边界": {
    "ActionName": "ShowData",
    "Parameters": {
      "name": "区县高亮",
      "type": "layer",
      "isLocate": true,
      "legendVisible": false,
      "popupEnabled": false,
      "data": {
        "layers": {
          "name": "区县边界"
        }
      },
      "renderer": {
        "type": "simple",
        "symbol": {
          "type": "line-3d",
          "symbolLayers": [
            {
              "type": "line",
              "size": 1.5,
              "material": {
                "color": "#fff"
              }
            }
          ]
        }
      }
    }
  }, 
  "乡镇街道": {
    "ActionName": "ShowData",
    "Parameters": {
      "name": "街道高亮定位",
      "type": "layer",
      "isLocate": true,
      "legendVisible": false,
      "data": {
        "layers": {
          "name": "乡镇街道"
        }
      },
      "labels": [
        {
          "fields": [
            "#.TOWN"
          ],
          "color": [
            255,
            255,
            255,
            1
          ],
          "size": 20
        }
      ],
      "renderer": {
        "type": "simple",
        "symbol": {
          "type": "line-3d",
          "symbolLayers": [
            {
              "type": "line",
              "size": 1.5,
              "material": {
                "color": "#fff"
              }
            }
          ]
        }
      }
    }
  }
}