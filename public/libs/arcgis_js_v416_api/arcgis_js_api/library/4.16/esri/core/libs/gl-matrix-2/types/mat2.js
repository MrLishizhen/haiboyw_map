// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(e,b){function c(a){return a instanceof Float32Array&&4<=a.length}function d(a){return Array.isArray(a)&&4<=a.length}Object.defineProperty(b,"__esModule",{value:!0});b.isMat2f32=c;b.isMat2f64=d;b.isMat2=function(a){return c(a)||d(a)}});