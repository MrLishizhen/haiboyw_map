// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../Basemap ../Viewpoint ../core/asyncUtils ../core/Collection ../core/collectionUtils ../core/JSONSupport ../core/Logger ../core/promiseUtils ../core/accessorSupport/decorators ../core/accessorSupport/ensureType ../core/libs/gl-matrix-2/vec3 ../core/libs/gl-matrix-2/vec3f64 ../layers/Layer ../support/basemapUtils ../views/3d/support/mathUtils ../webdoc/support/Thumbnail ./Environment ./Lighting ./support/Description ./support/SlideGround ./support/SlideVisibleLayer ./support/Title".split(" "),
function(O,P,c,C,D,E,r,F,G,H,k,e,p,v,t,I,w,J,g,x,K,l,y,z,m){function A(c){if("building-scene"===c.type||"map-image"===c.type)return c.allSublayers.toArray()}function B(c){if(c=A(c))return c.filter(function(b){return b.visible}).map(function(b){return b.id})}function L(c,b){c=b-c;c>h&&(c-=u);c<-h&&(c+=u);return c}var M=0,n=r.ofType(z.default),N=H.getLogger("esri.webscene.Slide"),u=86400,h=43200;return function(h){function b(a){a=h.call(this,a)||this;a._applyToController=null;a.id=Date.now().toString(16)+
"-slide-"+M++;a.title=new m.default;a.description=new l.default;a.thumbnail=new g.default;a.viewpoint=null;a.basemap=null;a.ground=null;a.environment=new x;a.visibleLayers=new n;return a}c.__extends(b,h);b.prototype.destroy=function(){this.visibleLayers.removeAll();this.basemap=null;this.thumbnail&&this.thumbnail.destroy();this.thumbnail=this.title=this.description=null};b.prototype.castTitle=function(a){return"string"===typeof a?new m.default({text:a}):p.ensureType(m.default,a)};b.prototype.castDescription=
function(a){return"string"===typeof a?new l.default({text:a}):p.ensureType(l.default,a)};b.prototype.castThumbnail=function(a){return"string"===typeof a?new g.default({url:a}):p.ensureType(g.default,a)};b.prototype.castBasemap=function(a){return w.ensureType(a)};Object.defineProperty(b.prototype,"visibleLayers",{set:function(a){this._set("visibleLayers",F.referenceSetter(a,this._get("visibleLayers"),n))},enumerable:!0,configurable:!0});b.prototype.castVisibleLayers=function(a){return a&&"function"===
typeof a.map?a.map(function(a){if("string"===typeof a)return{id:a};if(a instanceof I){var d=B(a);return{id:a.id,sublayerIds:d}}if(a.id)return{id:a.id,sublayerIds:a.sublayerIds};N.warn('Invalid visible layer, expected { id }, Layer or "id"');return a}):null};b.prototype.clone=function(){return new this.constructor({id:this.id,title:this.title.clone(),thumbnail:this.thumbnail.clone(),description:this.description&&this.description.clone()||null,viewpoint:this.viewpoint&&this.viewpoint.clone()||null,
basemap:this.basemap&&this.basemap.clone()||null,ground:this.ground&&this.ground.clone()||null,visibleLayers:this.visibleLayers.clone(),environment:this.environment&&this.environment.clone()||null})};b.prototype._updateVisibleLayersFrom=function(a){var c=this,d=[];return k.eachAlways(this._allLayers(a.map).map(function(c){return a.whenLayerView(c).then(function(a){if(a.visible){var b=B(c);d.push(new z.default({id:a.layer.id,sublayerIds:b}))}})}).toArray()).then(function(){c.visibleLayers.removeAll();
c.visibleLayers.addMany(d)})};b.prototype.updateFrom=function(a,b){var d=this;b={screenshot:c.__assign({format:"jpeg",quality:80,width:120,height:75,disableSlice:!0},b&&b.screenshot)};return a.when(function(){d.viewpoint=a.viewpoint.clone();d.environment.lighting=K.prototype.clone.apply(a.environment.lighting);d.basemap=a.map.basemap&&a.map.basemap.clone()||null;d.ground=a.map.ground?y.default.fromGround(a.map.ground):null;return d._updateVisibleLayersFrom(a)}).then(function(){return a.takeScreenshot(b.screenshot)}).then(function(a){d.thumbnail=
new g.default({url:a.dataUrl});return d})};b.prototype.applyTo=function(a,b){return c.__awaiter(this,void 0,void 0,function(){var d,q,f;return c.__generator(this,function(e){this._applyToController&&this._applyToController.abort();this._applyToController=d=k.createAbortController();k.onAbortOrThrow(b,function(){return d.abort()});q=c.__assign(c.__assign({animate:!0},b),{signal:this._applyToController.signal});f=k.createDeferred();this._applyTo(a,q,d).then(f.resolve,f.reject);return[2,f.promise]})})};
b.prototype._applyTo=function(a,b,d){return c.__awaiter(this,void 0,void 0,function(){var f,e=this;return c.__generator(this,function(q){switch(q.label){case 0:return[4,E.result(function(){return c.__awaiter(e,void 0,void 0,function(){return c.__generator(this,function(c){switch(c.label){case 0:return[4,this._applyBasemap(a,b)];case 1:return c.sent(),this._applyLayerVisibility(a),this._applyGround(a),[4,this._applyViewpoint(a,b)];case 2:return c.sent(),[2]}})})}())];case 1:f=q.sent();this._applyToController===
d&&(this._applyToController=null);if(!1===f.ok)throw f.error;return[2,this]}})})};b.prototype._applyBasemap=function(a,b){return c.__awaiter(this,void 0,void 0,function(){var d;return c.__generator(this,function(c){switch(c.label){case 0:if(!this.basemap)return[3,5];c.label=1;case 1:return c.trys.push([1,3,,4]),[4,this.basemap.load(b)];case 2:return c.sent(),[3,4];case 3:d=c.sent();if(k.isAbortError(d))throw d;return[3,4];case 4:a.map.basemap=w.clonePreservingTiledLayers(this.basemap,a.map.basemap),
c.label=5;case 5:return[2]}})})};b.prototype._applyGround=function(a){this.ground&&(a.map.ground=this.ground.cloneAndApplyTo(a.map.ground))};b.prototype._allLayers=function(a){var c=new r;this._collectLayers(a,c);this._collectLayers(a.ground,c);return c};b.prototype._collectLayers=function(a,c){var b=this;a.layers.forEach(function(a){c.add(a);a.layers&&b._collectLayers(a,c)})};b.prototype._applyLayerVisibility=function(a){var c=this;this.visibleLayers&&this._allLayers(a.map).forEach(function(a){var b=
c.visibleLayers.find(function(c){return c.id===a.id});a.visible=null!=b;var d=b&&b.sublayerIds,b=A(a);d&&b&&b.forEach(function(a){return a.visible=0<=d.indexOf(a.id)})})};b.prototype._applyViewpoint=function(a,b){return c.__awaiter(this,void 0,void 0,function(){return c.__generator(this,function(c){switch(c.label){case 0:if(!this.viewpoint||b.ignoreViewpoint)return[3,5];this.viewpoint.camera.fov=a.camera.fov;return b.animate&&this.get("environment.lighting.date")?[4,this._animateToLighting(a,b)]:
[3,2];case 1:return c.sent(),[2];case 2:if(!b.animate)return[3,4];a.environment.updateLighting(this.environment.lighting.clone());return[4,a.goTo(this.viewpoint,b)];case 3:c.sent(),c.label=4;case 4:a.viewpoint=this.viewpoint,c.label=5;case 5:return a.environment.updateLighting(this.environment.lighting.clone()),[2]}})})};b.prototype._animateToLighting=function(a,b){return c.__awaiter(this,void 0,void 0,function(){var d,e,f,g=this;return c.__generator(this,function(c){d=null;"global"===a.viewingMode&&
(d=this._animateLightingWithCamera(a));a.environment.lighting.cameraTrackingEnabled=!1;a.environment.lighting.directShadowsEnabled=this.environment.lighting.directShadowsEnabled;null!=this.environment.lighting.displayUTCOffset&&(a.environment.lighting.displayUTCOffset=this.environment.lighting.displayUTCOffset);e=a.goTo(this.viewpoint,b);f=function(){d&&d.remove();a.environment.lighting.cameraTrackingEnabled=!0};return[2,e.then(function(){a.environment.updateLighting(g.environment.lighting.clone());
f()},function(a){f();throw a;})]})})};b.prototype._getTime=function(a){var c=a.getTime();a=3600*a.getUTCHours()+60*a.getUTCMinutes()+a.getUTCSeconds();return[c,a]};b.prototype._setTime=function(a,c,b){a.setTime(c);a.setUTCHours(b/3600);a.setUTCMinutes(b%3600/60);a.setUTCSeconds(b%3600%60);return a};b.prototype._animateLightingWithCamera=function(a){var c=this,b=this._getTime(new Date(a.environment.lighting.date.toString())),e=b[0],g=b[1],b=this._getTime(this.environment.lighting.date),k=b[0],m=L(g,
b[1]),h=a.renderCoordsHelper,l=t.vec3f64.create();h.toRenderCoords(a.camera.position,l);var p=t.vec3f64.create();h.toRenderCoords(this.viewpoint.camera.position,p);var n=t.vec3f64.create(),r=new Date;return a.watch("camera",function(b){h.toRenderCoords(b.position,n);var d=v.vec3.squaredDistance(l,n),f=v.vec3.squaredDistance(p,n);b=0;0!==d+f&&(b=d/(d+f));d=e+(k-e)*b;b=J.moduloPositive(g+m*b,u);a.environment.lighting.date=c._setTime(r,d,b)})};b.createFrom=function(a,b){return(new this).updateFrom(a,
b)};c.__decorate([e.property({type:String,json:{write:{isRequired:!0}}})],b.prototype,"id",void 0);c.__decorate([e.property({type:m.default,json:{default:function(){return new m.default({text:""})},write:{isRequired:!0}}})],b.prototype,"title",void 0);c.__decorate([e.cast("title")],b.prototype,"castTitle",null);c.__decorate([e.property({type:l.default,json:{write:{overridePolicy:function(a){return{enabled:!(!a||!a.text)}}}}})],b.prototype,"description",void 0);c.__decorate([e.cast("description")],
b.prototype,"castDescription",null);c.__decorate([e.property({type:g.default,json:{default:function(){return new g.default({url:""})},write:{isRequired:!0}}})],b.prototype,"thumbnail",void 0);c.__decorate([e.cast("thumbnail")],b.prototype,"castThumbnail",null);c.__decorate([e.property({type:D,nonNullable:!0,json:{write:{isRequired:!0}}})],b.prototype,"viewpoint",void 0);c.__decorate([e.property({type:C,json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],b.prototype,"basemap",void 0);c.__decorate([e.cast("basemap")],
b.prototype,"castBasemap",null);c.__decorate([e.property({type:y.default,json:{write:!0}})],b.prototype,"ground",void 0);c.__decorate([e.property({type:n,json:{write:{isRequired:!0}}})],b.prototype,"visibleLayers",null);c.__decorate([e.cast("visibleLayers")],b.prototype,"castVisibleLayers",null);c.__decorate([e.property({type:x,json:{write:!0}})],b.prototype,"environment",void 0);return b=c.__decorate([e.subclass("esri.webscene.Slide")],b)}(G.JSONSupport)});