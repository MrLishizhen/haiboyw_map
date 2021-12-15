// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../geometry ../../core/Collection ../../core/Error ../../core/Handles ../../core/Logger ../../core/maybe ../../core/promiseUtils ../../core/watchUtils ../../core/accessorSupport/decorators ../../geometry/support/webMercatorUtils ../../layers/Layer ../../support/actions/ActionBase ../../support/actions/ActionButton ../../support/actions/ActionToggle ../../views/input/InputManager ../../views/support/layerViewUtils ./actions ../support/AnchorElementViewModel ../support/GoTo".split(" "),
function(J,K,d,v,w,m,x,y,q,g,h,e,z,A,B,C,D,E,F,k,G,H){var p=w.ofType({key:"type",defaultKeyValue:"button",base:B,typeMap:{button:C,toggle:D}}),n=y.getLogger("esri.widgets.Popup.PopupViewModel");return function(r){function b(a){a=r.call(this,a)||this;a._handles=new x;a._pendingPromises=new Set;a._zoomToLocation=null;a._fetchFeaturesController=null;a.actions=new p([k.zoomToFeature.clone()]);a.defaultPopupTemplateEnabled=!1;a.autoCloseEnabled=!1;a.autoOpenEnabled=!0;a.content=null;a.highlightEnabled=
!0;a.title=null;a.updateLocationEnabled=!1;a.view=null;a.visible=!1;a.zoomFactor=4;return a}d.__extends(b,r);b.prototype.initialize=function(){var a=this;this._handles.add([h.init(this,["autoOpenEnabled","view"],this._autoOpenEnabledChange),this.on("view-change",this._autoClose),h.watch(this,["highlightEnabled","selectedFeature","visible","view"],this._highlightFeature),h.watch(this,"view.animation.state",function(c){a._zoomToLocation||(k.zoomToFeature.disabled="waiting-for-target"===c)}),h.watch(this,
"location",function(c){var b=a.selectedFeature;a.updateLocationEnabled&&c&&(!b||b.geometry)&&a.centerAtLocation()}),h.watch(this,"selectedFeature",function(c){if(c){var b=a.location,f=a.updateLocationEnabled,d=a.view;!f&&b||!c.geometry?f&&!c.geometry&&a.centerAtLocation().then(function(){a.location=d.center.clone()}):a.location=q.unwrap(a._getPointFromGeometry(c.geometry))}}),this.on("trigger-action",function(c){return k.triggerAction({event:c,view:a.view})})])};b.prototype.destroy=function(){this._cancelFetchingFeatures();
this._handles.destroy();this._handles=null;this._pendingPromises.clear();this.view=null};Object.defineProperty(b.prototype,"allActions",{get:function(){var a=this._get("allActions")||new p;a.removeAll();var c=this.selectedFeature&&("function"===typeof this.selectedFeature.getEffectivePopupTemplate&&this.selectedFeature.getEffectivePopupTemplate(this.defaultPopupTemplateEnabled)||this.selectedFeature.popupTemplate),b=c&&c.actions;(c=c&&c.overwriteActions?b:b?b.concat(this.actions):this.actions)&&c.filter(Boolean).forEach(function(c){return a.add(c)});
return a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"featureCount",{get:function(){return this.features.length},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"features",{get:function(){return this._get("features")||[]},set:function(a){a=a||[];this._set("features",a);var c=this.pendingPromisesCount,b=this.selectedFeatureIndex,f=this.promiseCount&&a.length;f&&c&&-1===b?this.selectedFeatureIndex=0:f&&-1!==b||(this.selectedFeatureIndex=a.length?0:-1)},enumerable:!0,
configurable:!0});Object.defineProperty(b.prototype,"location",{get:function(){return this._get("location")||null},set:function(a){var c=this.get("view.spatialReference.isWebMercator");a&&a.get("spatialReference.isWGS84")&&c&&(a=z.geographicToWebMercator(a));this._set("location",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"pendingPromisesCount",{get:function(){return this._pendingPromises.size},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"waitingForResult",
{get:function(){return(!!this._fetchFeaturesController||0<this.pendingPromisesCount)&&0===this.featureCount},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"promiseCount",{get:function(){return this.promises.length},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"promises",{get:function(){return this._get("promises")||[]},set:function(a){var c=this;this._pendingPromises.clear();this.features=[];Array.isArray(a)&&a.length?(this._set("promises",a),a=a.slice(0),
a.forEach(function(a){c._pendingPromises.add(a);a.then(function(b){c._pendingPromises.has(a)&&c._updateFeatures(b);c._updatePendingPromises(a)},function(){return c._updatePendingPromises(a)})})):this._set("promises",[]);this.notifyChange("pendingPromisesCount")},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"selectedFeature",{get:function(){var a=this.selectedFeatureIndex;return-1===a?null:this.features[a]||null},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,
"selectedFeatureIndex",{get:function(){var a=this._get("selectedFeatureIndex");return"number"===typeof a?a:-1},set:function(a){var c=this.featureCount;a=isNaN(a)||-1>a||!c?-1:(a+c)%c;this._set("selectedFeatureIndex",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0});b.prototype.centerAtLocation=function(){var a=this.view,c=this._getSelectedTarget();return c?this.callGoTo({target:{target:c,
scale:a.scale}}):(a=new m("center-at-location:invalid-target-or-view","Cannot center at a location without a target and view.",{target:c,view:a}),n.error(a),g.reject(a))};b.prototype.clear=function(){this.set({promises:[],features:[],content:null,title:null,location:null})};b.prototype.fetchFeatures=function(a,c){var b=this.view;return b&&a?b.fetchPopupFeatures(a,{event:c&&c.event,defaultPopupTemplateEnabled:this.defaultPopupTemplateEnabled,signal:c&&c.signal}):(a=new m("fetch-features:invalid-screenpoint-or-view",
"Cannot fetch features without a screenPoint and view.",{screenPoint:a,view:b}),n.error(a),g.reject(a))};b.prototype.open=function(a){var c=this;a=d.__assign({updateLocationEnabled:!1,promises:[],fetchFeatures:!1,visible:!1},a);var b=a.fetchFeatures;delete a.fetchFeatures;b=b?this._fetchFeaturesWithController(this._getScreenPoint(a.location||this.location)).then(function(a){var b=a.promisesPerLayerView;a=g.resolve(a.clientOnlyGraphics);b=b.map(function(a){return a.promise});c.promises=d.__spreadArrays([a],
b)}):g.resolve();this.set(a);b.then(function(){c._setVisibleWhenContentExists()}).catch(function(){})};b.prototype.triggerAction=function(a){(a=this.allActions.getItemAt(a))&&this.emit("trigger-action",{action:a})};b.prototype.next=function(){this.selectedFeatureIndex+=1;return this};b.prototype.previous=function(){--this.selectedFeatureIndex;return this};b.prototype.zoomToLocation=function(){var a=this,b=this.location,d=this.selectedFeature,f=this.view,e=this.zoomFactor,t=this._getSelectedTarget();
if(!t)return b=new m("zoom-to:invalid-target-or-view","Cannot zoom to location without a target and view.",{target:t,view:f}),n.error(b),g.reject(b);var f=f.scale/e,l=this.get("selectedFeature.geometry")||b,u=l&&"point"===l.type&&this._isZoomScreenSize(d);k.zoomToFeature.active=!0;k.zoomToFeature.disabled=!0;return this._zoomToLocation=b=this.callGoTo({target:{target:t,scale:u?f:void 0}}).catch(function(){k.zoomToFeature.active=!1;k.zoomToFeature.disabled=!1;a._zoomToLocation=null}).then(function(){u&&
(a.location=l)})};b.prototype._getScreenPoint=function(a){var b=this.view;return b&&a&&"function"===typeof b.toScreen?b.toScreen(a):null};b.prototype._getSelectedTarget=function(){var a=this.selectedFeature,b=this.location,d=this.view;return d?"3d"===d.type?a||b:this.get("selectedFeature.geometry")||b:null};b.prototype._autoOpenEnabledChange=function(){var a=this,b=this._handles,d=this.autoOpenEnabled;b.remove("auto-fetch-features");d&&this.view&&(d=this.view.on("click",function(b){"mouse"===b.pointerType&&
0!==b.button||a._fetchFeaturesAndOpen(b)},E.ViewEventPriorities.WIDGET),b.add(d,"auto-fetch-features"))};b.prototype._cancelFetchingFeatures=function(){var a=this._fetchFeaturesController;a&&a.abort();this._fetchFeaturesController=null;this.notifyChange("waitingForResult")};b.prototype._fetchFeaturesWithController=function(a,b){var c=this;this._cancelFetchingFeatures();var d=g.createAbortController(),e=d.signal;this._fetchFeaturesController=d;this.notifyChange("waitingForResult");a=this.fetchFeatures(a,
{signal:e,event:b});a.catch().then(function(){c._fetchFeaturesController=null;c.notifyChange("waitingForResult")});return a};b.prototype._fetchFeaturesAndOpen=function(a){var b=a.mapPoint,e=this.view;this._fetchFeaturesWithController(a.screenPoint,a).then(function(a){var c=a.promisesPerLayerView,f=a.location,I=g.resolve(a.clientOnlyGraphics),c=d.__spreadArrays([I],c.map(function(a){return a.promise}));e.popup.open({location:f||b,promises:c});return a})};b.prototype._updatePendingPromises=function(a){a&&
this._pendingPromises.has(a)&&(this._pendingPromises.delete(a),this.notifyChange("pendingPromisesCount"))};b.prototype._setVisibleWhenContentExists=function(){var a=this,b=this._handles,d=this.promiseCount;b.remove("pendingVisible");d?(d=h.init(this,"pendingPromisesCount",function(c){a.featureCount&&(a.set("visible",!0),b.remove("pendingVisible"));c||b.remove("pendingVisible")}),b.add(d,"pendingVisible")):this.set("visible",!0)};b.prototype._autoClose=function(){this.autoCloseEnabled&&(this.visible=
!1)};b.prototype._isZoomScreenSize=function(a){var b=this.view;if("3d"!==b.type||!a||"esri.Graphic"!==a.declaredClass)return!0;if((b=b.getViewForGraphic(a))&&"whenGraphicBounds"in b){var d=!1;b.whenGraphicBounds(a,{useViewElevation:!0}).then(function(a){d=!a||!a.boundingBox||a.boundingBox[0]===a.boundingBox[3]&&a.boundingBox[1]===a.boundingBox[4]&&a.boundingBox[2]===a.boundingBox[5]}).catch(function(){var b=new m("zoom-to:invalid-graphic","Could not zoom to the location of the graphic.",{graphic:a});
n.error(b)});return d}return!0};b.prototype._getPointFromGeometry=function(a){return q.isNone(a)?null:"point"===a.type?a:"extent"===a.type?a.center:"polygon"===a.type?a.centroid:"multipoint"===a.type||"polyline"===a.type?a.extent.center:null};b.prototype._getLayerView=function(a,b){return d.__awaiter(this,void 0,void 0,function(){return d.__generator(this,function(c){switch(c.label){case 0:return[4,a.when()];case 1:return c.sent(),[2,a.whenLayerView(b)]}})})};b.prototype._highlightFeature=function(){return d.__awaiter(this,
void 0,void 0,function(){var a,b,e,f,g,k,l,h,m,n,p,q,r;return d.__generator(this,function(c){switch(c.label){case 0:a="highlight";this._handles.remove(a);b=this;e=b.selectedFeature;f=b.highlightEnabled;g=b.view;k=b.visible;if(!(e&&g&&f&&k))return[2];l=e.layer;if(!(l&&l instanceof A))return[2];this._highlightPromise=h=this._getLayerView(g,l);return[4,h];case 1:m=c.sent();if(!(m&&F.highlightsSupported(m)&&this._highlightPromise===h&&this.selectedFeature&&this.highlightEnabled&&this.visible))return[2];
n="objectIdField"in l&&l.objectIdField;q=(p=e.attributes)&&n&&p[n];r=m.highlight(q||e);this._handles.add(r,a);return[2]}})})};b.prototype._updateFeatures=function(a){var b=this.features;a&&a.length&&(b.length?(a=a.filter(function(a){return-1===b.indexOf(a)}),this.features=b.concat(a)):this.features=a)};d.__decorate([e.property({type:p})],b.prototype,"actions",void 0);d.__decorate([e.property({dependsOn:["actions.length","selectedFeature.sourceLayer.popupTemplate.actions.length","selectedFeature.sourceLayer.popupTemplate.overwriteActions",
"selectedFeature.popupTemplate.actions.length","selectedFeature.popupTemplate.overwriteActions"],readOnly:!0})],b.prototype,"allActions",null);d.__decorate([e.property({type:Boolean})],b.prototype,"defaultPopupTemplateEnabled",void 0);d.__decorate([e.property()],b.prototype,"autoCloseEnabled",void 0);d.__decorate([e.property()],b.prototype,"autoOpenEnabled",void 0);d.__decorate([e.property()],b.prototype,"content",void 0);d.__decorate([e.property({readOnly:!0,dependsOn:["features"]})],b.prototype,
"featureCount",null);d.__decorate([e.property()],b.prototype,"features",null);d.__decorate([e.property()],b.prototype,"highlightEnabled",void 0);d.__decorate([e.property({type:v.Point})],b.prototype,"location",null);d.__decorate([e.property({readOnly:!0,dependsOn:["promises"]})],b.prototype,"pendingPromisesCount",null);d.__decorate([e.property({readOnly:!0,dependsOn:["featureCount","pendingPromisesCount"]})],b.prototype,"waitingForResult",null);d.__decorate([e.property({readOnly:!0,dependsOn:["promises"]})],
b.prototype,"promiseCount",null);d.__decorate([e.property()],b.prototype,"promises",null);d.__decorate([e.property({value:null,readOnly:!0,dependsOn:["features","selectedFeatureIndex","updateLocationEnabled"]})],b.prototype,"selectedFeature",null);d.__decorate([e.property({value:-1})],b.prototype,"selectedFeatureIndex",null);d.__decorate([e.property({readOnly:!0,dependsOn:["view.ready"]})],b.prototype,"state",null);d.__decorate([e.property()],b.prototype,"title",void 0);d.__decorate([e.property()],
b.prototype,"updateLocationEnabled",void 0);d.__decorate([e.property()],b.prototype,"view",void 0);d.__decorate([e.property()],b.prototype,"visible",void 0);d.__decorate([e.property()],b.prototype,"zoomFactor",void 0);d.__decorate([e.property()],b.prototype,"centerAtLocation",null);d.__decorate([e.property()],b.prototype,"zoomToLocation",null);return b=d.__decorate([e.subclass("esri.widgets.Popup.PopupViewModel")],b)}(H.GoToMixin(G))});