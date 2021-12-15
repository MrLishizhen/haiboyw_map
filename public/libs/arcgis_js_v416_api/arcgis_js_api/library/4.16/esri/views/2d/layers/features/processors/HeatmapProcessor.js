// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../../../../core/accessorSupport/decorators ../../../../../renderers/support/heatmapUtils ./BaseProcessor".split(" "),function(g,h,c,e,k,l){Object.defineProperty(h,"__esModule",{value:!0});g=function(f){function a(){var d=null!==f&&f.apply(this,arguments)||this;d.type="heatmap";d.updating=!1;return d}c.__extends(a,f);a.prototype.update=function(d){return c.__awaiter(this,void 0,void 0,function(){return c.__generator(this,function(b){this._set("config",d);return[2]})})};
a.prototype.onTileData=function(d,b,a){return b&&b.addOrUpdate&&0<b.addOrUpdate.length?(b=k.calculateHeatmapIntensityInfo(b.addOrUpdate,this.config.renderer,512,512),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:d.key.id,intensityInfo:b},{transferList:[b.matrix]})):this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:d.key.id,intensityInfo:null},a)};a.prototype.onTileError=function(a,b,c){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:a.id,error:b},c)};c.__decorate([e.property()],
a.prototype,"config",void 0);c.__decorate([e.property()],a.prototype,"updating",void 0);return a=c.__decorate([e.subclass("esri.views.2d.layers.features.processors.HeatmapProcessor")],a)}(l.default);h.default=g});