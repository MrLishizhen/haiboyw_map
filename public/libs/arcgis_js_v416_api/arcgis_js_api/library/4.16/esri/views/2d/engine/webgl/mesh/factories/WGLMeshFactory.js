// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../../../../../core/Error ../../../../../../core/has ../../../../../../core/Logger ../../../../../../core/maybe ../../../../../../core/promiseUtils ../../../../../../geometry/support/jsonUtils ../../../../../../symbols/SimpleLineSymbol ../../definitions ../../enums ../../WGLDisplayObject ../MeshData ../VertexVector ../templates/WGLLabelTemplate ../templates/WGLLineTemplate ../templates/WGLMarkerTemplate ../templates/WGLTemplateStore".split(" "),function(v,w,x,z,K,
A,r,B,C,D,p,e,E,F,n,G,H,I,y){Object.defineProperty(w,"__esModule",{value:!0});var t=A.getLogger("esri.views.2d.engine.webgl.WGLMeshFactory"),J={esriGeometryPoint:"above-right above-center above-left center-center center-left center-right below-center below-left below-right".split(" "),esriGeometryPolygon:["always-horizontal"],esriGeometryPolyline:["center-along"],esriGeometryMultipoint:null,esriGeometryEnvelope:null};v=function(){function d(b,a,c,k){this._isDD=!1;this._labelsDebugTemplate=null;this._isDD=
r.isSome(c)&&"dot-density"===c.type;this._geometryType=b;this._idField=a;this._templateStore=k}d.prototype.update=function(b,a,c){this._isDD=r.isSome(a)&&"dot-density"===a.type;this._setLabelTemplates(b,a,c)};d.prototype._setLabelTemplates=function(b,a,c){b&&this._validateLabelingInfo(b)&&(this._labelTemplates=b.map(function(b){return G.default.fromLabelClass(a,b.labelClass,c)}))};Object.defineProperty(d.prototype,"templates",{get:function(){return this._templateStore},enumerable:!0,configurable:!0});
d.prototype.createMeshData=function(b){var a=Array(5),c=this._labelTemplates&&0<this._labelTemplates.length,k="esriGeometryPolyline"===this._geometryType?p.HEURISTIC_GLYPHS_PER_LINE:p.HEURISTIC_GLYPHS_PER_FEATURE;a[e.WGLGeometryType.MARKER]=new n.VertexVectors(e.WGLGeometryType.MARKER,b);a[e.WGLGeometryType.FILL]=new n.VertexVectors(e.WGLGeometryType.FILL,b,this._isDD);a[e.WGLGeometryType.LINE]=new n.VertexVectors(e.WGLGeometryType.LINE,b);a[e.WGLGeometryType.TEXT]=new n.VertexVectors(e.WGLGeometryType.TEXT,
b);a[e.WGLGeometryType.LABEL]=new n.VertexVectors(e.WGLGeometryType.LABEL,c?k:0);return new F.MeshData([],a)};d.prototype.analyze=function(b,a,c,k,d){return x.__awaiter(this,void 0,void 0,function(){var m,l,u,f,h,g,e,q,n;return x.__generator(this,function(p){switch(p.label){case 0:return m=b,B.isAborted(d)?[2,[]]:r.isSome(a)?[4,a.analyze(this._idField,b,c,k,d)]:[3,2];case 1:p.sent(),p.label=2;case 2:l=0;for(u=m;l<u.length;l++){f=u[l];h=f.groupId;if(null==h||-1===h)h=a.match(this._idField,f,this._geometryType,
c,k);if(y.isDynamicId(h))for(g=this._templateStore.getDynamicTemplateGroup(h),e=0,q=g;e<q.length;e++)(n=q[e])&&n.analyze&&n.analyze(this._templateStore,f,c,k);f.groupId=h}return[2,this._templateStore.finalize(d).then(function(){return m})]}})})};d.prototype.write=function(b,a,c,k,d,m){var l=this._templateStore.getTemplateGroup(a.groupId),e=a.localId;if(null!=e){var f=new E(e);if(y.isDynamicId(a.groupId))for(var h=0;h<l.length;h++){var g=l[h];g&&g.bindFeature(a,c,k)}if(l&&(a.geometry||a.centroid)){c=
f.displayRecords;g=a.insertAfter;void 0!==g&&(f.insertAfter=g);(k=this._geometryType)||(k=null!=a.centroid?"esriGeometryPolygon":C.getJsonType(a.geometry));for(h=0;h<l.length;h++)if(g=l[h]){var q=b.get(g.geometryType);g.writeMesh(c,q,k,e,a)}g=f.displayRecords.length;r.isSome(m)&&g&&(l=m&&this._findLabelRef(l),this._writeLabels(f,b,e,a,m,l,d));b.pushDisplayObject(f)}}};d.prototype._hasBadLabelClass=function(b,a){var c=b.labelPlacement,k=J[a];if(!b.symbol)return t.warn("No LabelClass symbol specified."),
!0;if(!k)return t.error(new z("mapview-labeling:unsupported-geometry-type","Unable to create labels for Feature Layer, "+a+" is not supported")),!0;k.some(function(a){return a===c})||(k=k[0],c&&t.warn("Found invalid label placement type "+c+" for "+a+". Defaulting to "+k),b.labelPlacement=k);return!1};d.prototype._validateLabelingInfo=function(b){var a=this;return!b.some(function(b){return a._hasBadLabelClass(b.labelClass,a._geometryType)})};d.prototype._findLabelRef=function(b){for(var a=0;a<b.length;a++){var c=
b[a];if(c instanceof I.default)return c}return null};d.prototype._writeLabels=function(b,a,c,k,e,d,l){for(var m=b.displayRecords,f=[],h=0;h<e.length;h++){var g=e[h];if(r.isSome(g)){var n=g.glyphs,q=g.rtl,g=this._labelTemplates[g.classIndex],t=a.get(g.geometryType);g.bindReferenceTemplate(d);g.bindTextInfo(n,q);g.writeMesh(m,t,this._geometryType,c,k,l,f)}}b.metrics=f;p.DEBUG_LABELS&&this._debugLabels(b,a)};d.prototype._debugLabels=function(b,a){var c=b.displayRecords,e=b.id,d=0;for(b=b.metrics;d<b.length;d++)for(var m=
b[d],l=0,n=m.boxes?m.boxes.concat([m.bounds]):[m.bounds];l<n.length;l++){var f=n[l],f={geometry:{paths:[[[m.anchor[0]+m.offsetX+f.center[0]-f.width/2,m.anchor[1]+m.offsetY+f.center[1]+f.height/2],[0,-f.height],[f.width,0],[0,f.height],[-f.width,0]]]},attributes:{}},h=this._getLabelDebugTemplate(),g=a.get(h.geometryType);h.writeMesh(c,g,"esriGeometryPolyline",e,f)}};d.prototype._getLabelDebugTemplate=function(){this._labelsDebugTemplate||(this._labelsDebugTemplate=this._createLabelsDebugTemplate());
return this._labelsDebugTemplate};d.prototype._createLabelsDebugTemplate=function(){var b=new D({style:"solid",width:1,color:[255,0,0,1]});return H.default.fromSimpleLine(null,!1,b,null,!1)};return d}();w.WGLMeshFactory=v});