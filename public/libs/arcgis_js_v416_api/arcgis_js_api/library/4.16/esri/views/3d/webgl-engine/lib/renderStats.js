// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(f,d){function e(){return{triangles:0,drawCalls:0}}Object.defineProperty(d,"__esModule",{value:!0});d.makeNewRenderStats=e;d.addToRenderStats=function(c,a,b){b&&(b.drawCalls+=c,b.triangles+=a)};f=function(){function c(){this.materialRenderStats=new Map;this.reset()}c.prototype.getMaterialRenderStatsObject=function(a){var b=this.materialRenderStats.get(a);b||(b=e(),this.materialRenderStats.set(a,b));return b};c.prototype.getAggregatedStats=function(){var a={materialRenderers:{},
total:e()};this.materialRenderStats.forEach(function(b,c){a.materialRenderers[c]=b;a.total.drawCalls+=b.drawCalls;a.total.triangles+=b.triangles});return a};c.prototype.reset=function(){this.materialRenderStats.forEach(function(a){a.drawCalls=0;a.triangles=0})};return c}();d.RenderStatsAggregator=f});