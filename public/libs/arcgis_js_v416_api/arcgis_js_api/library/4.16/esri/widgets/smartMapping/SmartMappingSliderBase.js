// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../Color ../../core/maybe ../../core/watchUtils ../../core/accessorSupport/decorators ../Histogram ../Slider ../Widget ./support/utils ../support/widget".split(" "),function(h,m,d,l,g,k,e,n,p,q,r,f){Object.defineProperty(m,"__esModule",{value:!0});h=function(h){function b(a,b){var c=h.call(this,a,b)||this;c.hasTimeData=null;c.histogram=new n({layout:"vertical"});c.histogramConfig=null;c.inputFormatFunction=null;c.inputParseFunction=null;c.labelFormatFunction=null;
c.precision=4;c.slider=new p({layout:"vertical",visibleElements:{labels:!0,rangeLabels:!0},labelInputsEnabled:!0,rangeLabelInputsEnabled:!0});c.state=null;c.viewModel=null;c.zoomOptions=null;a=c.slider;c.own(a.on("max-change",function(a){return c.emit("max-change",a)}),a.on("min-change",function(a){return c.emit("min-change",a)}),a.on("thumb-change",function(a){return c.emit("thumb-change",a)}),a.on("thumb-drag",function(a){return c.emit("thumb-drag",a)}),k.watch(c,["histogramConfig","max","min",
"zoomOptions"],function(){var a=c.histogram,b=c.viewModel,t=b.max,b=b.min,e=c.getParamsFromHistogramConfig(c.histogramConfig);a.set(d.__assign(d.__assign({},e),{max:t,min:b}))}),k.watch(c,"labelFormatFunction",function(){c.histogram.set({labelFormatFunction:c.labelFormatFunction})}));c._onMaxZoomCapPointerDown=c._onMaxZoomCapPointerDown.bind(c);c._onMinZoomCapPointerDown=c._onMinZoomCapPointerDown.bind(c);return c}d.__extends(b,h);b.prototype.initialize=function(){var a=this,b=this.histogramConfig,
c=this.viewModel,e=c.labelFormatFunction,f=c.max,g=c.min,b=this.getParamsFromHistogramConfig(void 0===b?{}:b);this.own(k.watch(c,"max",function(){return a.notifyChange("max")}),k.watch(c,"min",function(){return a.notifyChange("min")}));this.histogram.set(d.__assign(d.__assign({labelFormatFunction:e},b),{max:f,min:g}));this.slider.set({viewModel:c})};Object.defineProperty(b.prototype,"max",{get:function(){return this.viewModel?this.viewModel.getUnzoomedMax():null},set:function(a){this.viewModel.max=
a;this._set("max",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"min",{get:function(){return this.viewModel?this.viewModel.getUnzoomedMin():null},set:function(a){this.viewModel.min=a;this._set("min",a)},enumerable:!0,configurable:!0});b.prototype.renderContent=function(a,b,c){this.slider.extraNodes=[a,this.renderHistogram(c)];return f.tsx("div",{class:b},this.slider.render())};b.prototype.renderHistogram=function(a){return this.histogramConfig?f.tsx("div",{class:a?a:null},
this.histogram.render()):null};b.prototype.renderBackgroundFillDefinition=function(a){return f.tsx("pattern",{id:a,patternUnits:"userSpaceOnUse",x:"0",y:"0",width:"15",height:"15"},f.tsx("image",{x:"0",y:"0",width:"15",height:"15",href:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNjY2MiIC8+PHBhdGggZD0iTTAgMCBMOCAwIEw4IDggTDAgOCBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDgpIiAvPjxwYXRoIGQ9Ik0wIDAgTDggMCBMOCA4IEwwIDggWiIgZmlsbD0iI2NjYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCw4KSIgLz48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgsMCkiIC8+PC9zdmc+"}))};
b.prototype.renderRampFillDefinition=function(a,b){return f.tsx("linearGradient",{id:a,x1:"0",x2:"0",y1:"0",y2:"1"},this.renderRampFillStops(b))};b.prototype.renderRampFillStops=function(a){var b=this;return a.reverse().map(function(a,d){return b.renderStop(a,d)})};b.prototype.renderStop=function(a,b){a=this.getPropsForStop(a);return f.tsx("stop",{key:b+"-stop",offset:a.offset,"stop-color":a.color,"stop-opacity":a.opacity})};b.prototype.renderZoomCaps=function(){return[this.renderMaxZoomCap(),this.renderMinZoomCap()]};
b.prototype.renderMinZoomCap=function(){if(this.zoomOptions&&g.isSome(this.zoomOptions.min))return f.tsx("svg",{key:"bottom",class:this.classes("zoom-cap","zoom-cap--min"),viewBox:"0 0 30 11",xmlns:"http://www.w3.org/2000/svg",onpointerdown:this._onMinZoomCapPointerDown},f.tsx("polygon",{class:"zoom-cap--mask",key:"mask",fill:"#1B8617",points:"0 11.3846154 30 11.3846154 30 1 25 5.38461538 20 1 15 5.38461538 10 1 5 5.38461538 0 1"}),f.tsx("polygon",{class:"zoom-cap--underline",key:"underline",fill:"#69DCFF",
points:"0 0 5 4.38461538 10 0 15 4.38461538 20 0 25 4.38461538 30 0 30 4.61538462 25 9 20 4.61538462 15 9 10 4.61538462 5 9 0 4.61538462"}),f.tsx("polygon",{class:"zoom-cap--line",key:"line",fill:"#DA5656",points:"0 1 5 5.38461538 10 1 15 5.38461538 20 1 25 5.38461538 30 1 30 5.61538462 25 10 20 5.61538462 15 10 10 5.61538462 5 10 0 5.61538462"}))};b.prototype.renderMaxZoomCap=function(){if(this.zoomOptions&&g.isSome(this.zoomOptions.max))return f.tsx("svg",{key:"top",class:this.classes("zoom-cap",
"zoom-cap--max"),viewBox:"0 0 30 11",xmlns:"http://www.w3.org/2000/svg",onpointerdown:this._onMaxZoomCapPointerDown},f.tsx("polygon",{class:"zoom-cap--mask",key:"mask",points:"0 -1.81994377e-12 30 -1.81994377e-12 30 8.23076923 25 3.61538462 20 8.23076923 15 3.61538462 10 8.23076923 5 3.61538462 0 8.23076923"}),f.tsx("polygon",{class:"zoom-cap--underline",key:"underline",points:"0 5.61538462 5 1 10 5.61538462 15 1 20 5.61538462 25 1 30 5.61538462 30 10.2307692 25 5.61538462 20 10.2307692 15 5.61538462 10 10.2307692 5 5.61538462 0 10.2307692"}),
f.tsx("polygon",{class:"zoom-cap--line",key:"line",points:"0 4.61538462 5 -1.87329639e-12 10 4.61538462 15 -1.87329639e-12 20 4.61538462 25 -1.87329639e-12 30 4.61538462 30 9.23076923 25 4.61538462 20 9.23076923 15 4.61538462 10 9.23076923 5 4.61538462 0 9.23076923"}))};b.prototype.getPropsForStop=function(a){var b=a.color;a=a.offset;return{color:b instanceof l?b.toCss(!0):l.fromString(b).toCss(!0),offset:(100*a).toFixed(2)+"%",opacity:b instanceof l?b.toRgba()[3]:null}};b.prototype.getParamsFromHistogramConfig=
function(a){return a?{average:a.average,barCreatedFunction:a.barCreatedFunction,bins:a.bins,dataLineCreatedFunction:a.dataLineCreatedFunction,dataLines:this._getDataLines(a)}:null};b.prototype._onMaxZoomCapPointerDown=function(){var a=this.zoomOptions;a&&g.isSome(a.max)&&(a=a.min,this.zoomOptions=g.isSome(a)?{min:a}:null)};b.prototype._onMinZoomCapPointerDown=function(){var a=this.zoomOptions;a&&g.isSome(a.min)&&(a=a.max,this.zoomOptions=g.isSome(a)?{max:a}:null)};b.prototype._getDataLines=function(a){return d.__spreadArrays(this._getStandardDeviationDataLines(a.standardDeviation,
a.average,a.standardDeviationCount||1),a.dataLines||[])};b.prototype._getStandardDeviationDataLines=function(a,b,c){return r.getDeviationValues(a,b,c).map(function(a){return{value:a}})};d.__decorate([e.aliasOf("viewModel.hasTimeData")],b.prototype,"hasTimeData",void 0);d.__decorate([e.property()],b.prototype,"histogram",void 0);d.__decorate([e.property()],b.prototype,"histogramConfig",void 0);d.__decorate([e.aliasOf("viewModel.inputFormatFunction")],b.prototype,"inputFormatFunction",void 0);d.__decorate([e.aliasOf("viewModel.inputParseFunction")],
b.prototype,"inputParseFunction",void 0);d.__decorate([e.aliasOf("viewModel.labelFormatFunction")],b.prototype,"labelFormatFunction",void 0);d.__decorate([e.property({dependsOn:["viewModel.max","viewModel.zoomOptions"]})],b.prototype,"max",null);d.__decorate([e.property({dependsOn:["viewModel.min","viewModel.zoomOptions"]})],b.prototype,"min",null);d.__decorate([e.aliasOf("viewModel.precision")],b.prototype,"precision",void 0);d.__decorate([e.property()],b.prototype,"slider",void 0);d.__decorate([e.aliasOf("viewModel.state")],
b.prototype,"state",void 0);d.__decorate([e.aliasOf("viewModel.values")],b.prototype,"values",void 0);d.__decorate([e.property()],b.prototype,"viewModel",void 0);d.__decorate([e.aliasOf("viewModel.zoomOptions")],b.prototype,"zoomOptions",void 0);return b=d.__decorate([e.subclass("esri.widgets.smartMapping.SmartMappingSliderBase")],b)}(q);m.SmartMappingSliderBase=h});