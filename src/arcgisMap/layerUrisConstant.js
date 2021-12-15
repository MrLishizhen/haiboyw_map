const border = "http://10.207.204.19/server/rest/services/Hosted/County/FeatureServer";
const street = "http://10.207.204.19/server/rest/services/Hosted/Street/FeatureServer";
const grid = "http://10.207.204.19/server/rest/services/Hosted/wangge/FeatureServer";
const juwei = "http://10.207.204.19/server/rest/services/Hosted/juwei/FeatureServer";
const buildingBaiMo = "http://10.207.204.19/server/rest/services/Hosted/baimo/SceneServer";
// const biaomo = "http://10.207.204.19/server/rest/services/Hosted/biaomo2020/SceneServer";
const buildingJingMo = [
  "http://10.207.204.19/server/rest/services/Hosted/biaomo_jm_fcfh/SceneServer",
  "http://10.207.204.19/server/rest/services/Hosted/jingmo/SceneServer",
  "http://10.207.204.19/server/rest/services/Hosted/fencengfenhu01/SceneServer",
];
// 
const road = [
  // { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/9', title: '地面主干道路发布段_全景显示 (9)' },
  { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/7', title: '地面次干道路发布段_二级显示 (7)' },
  { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/4', title: '地面次干道路发布段_二级显示 (4)' }
];

// const road = [
//   // { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/9', title: '地面主干道路发布段_全景显示 (9)' },
//   { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/8', title: '地面一般道路发布段 (8)' },
//   { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/5', title: '地面次干道路发布段 (5)' }
// ];

// const road = { url: 'http://10.207.204.19/server/rest/services/ROAD_DM/FeatureServer/9', title: '地面道路' };

export default {
  border,
  street,
  grid,
  juwei,
  buildingBaiMo,
  buildingJingMo,
  road
}