// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../../core/jsonMap ../../../core/maybe ../../../core/unitUtils ../../../geometry/support/extentUtils ../../../geometry/support/jsonUtils ../../../geometry/support/normalizeUtils ../../../geometry/support/spatialReferenceUtils ../centroid ../featureConversionUtils ../OptimizedGeometry ./projectionSupport ./spatialQuerySupport".split(" "),function(M,e,n,A,B,C,D,E,F,q,G,m,r,t,H){function x(a,b,h,d,f){void 0===d&&(d=a.hasZ);void 0===f&&(f=a.hasM);var k=a.hasZ&&d,g=a.hasM&&
f;return h?(a=m.quantizeOptimizedGeometry(u,b,a.hasZ,a.hasM,"esriGeometryPoint",h,d,f),m.convertToPoint(a,k,g)):m.convertToPoint(b,k,g)}function v(a,b,h){return n.__awaiter(this,void 0,void 0,function(){var d,f,k,g,c,p;return n.__generator(this,function(l){switch(l.label){case 0:if(!a)return[2,null];d=a.where;a.where=d=d&&d.trim();if(!d||/^1 *= *1$/.test(d)||b&&b===d)a.where=null;return a.geometry?[4,I(a)]:[2,a];case 1:return f=l.sent(),a.distance=0,a.units=null,"esriSpatialRelEnvelopeIntersects"===
a.spatialRel&&(k=a.geometry.spatialReference,f=D.getGeometryExtent(f),f.spatialReference=k),a.geometry=f,[4,t.checkProjectionSupport(f.spatialReference,h)];case 2:return l.sent(),[4,F.normalizeCentralMeridian(E.fromJSON(f))];case 3:g=l.sent()[0];if(B.isNone(g))throw e.QUERY_ENGINE_EMPTY_RESULT;c=g.toJSON();return[4,t.project(c,c.spatialReference,h)];case 4:p=l.sent();if(!p)throw e.QUERY_ENGINE_EMPTY_RESULT;p.spatialReference=h;a.geometry=p;return[2,a]}})})}function I(a){return n.__awaiter(this,void 0,
void 0,function(){var b,h,d,f,k,g,c,p,l;return n.__generator(this,function(e){switch(e.label){case 0:b=a.geometry;h=a.distance;d=a.units;if(null==h||"vertexAttributes"in b)return[2,b];f=b.spatialReference;k=d?J.fromJSON(d):C.getUnitString(f);g=f&&(q.isGeographic(f)||q.isWebMercator(f));if(!g)return[3,1];p=b;return[3,3];case 1:return[4,t.checkProjectionSupport(f,q.WGS84).then(function(){return t.project(b,q.WGS84)})];case 2:p=e.sent(),e.label=3;case 3:return c=p,[4,H.getGeodesicBufferOperator()];case 4:return l=
e.sent(),[2,l(c.spatialReference,c,h,k)]}})})}Object.defineProperty(e,"__esModule",{value:!0});var J=new A.default({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"});e.QUERY_ENGINE_EMPTY_RESULT=Object.freeze({});var y=new r.default,K=new r.default,u=new r.default,w={esriGeometryPoint:m.convertToPoint,esriGeometryPolyline:m.convertToPolyline,esriGeometryPolygon:m.convertToPolygon,
esriGeometryMultipoint:m.convertToMultipoint};e.transformCentroid=x;e.getCentroid=function(a,b,h){if("esriGeometryPolygon"!==a.geometryType||!b||!b.centroid&&!b.geometry)return null;b.centroid||(b.centroid=G.getCentroidOptimizedGeometry(new r.default,b.geometry,a.hasZ,a.hasM));return x(a,b.centroid,h)};e.getGeometry=function(a,b,h,d,f,k,g,c){void 0===g&&(g=b);void 0===c&&(c=h);var e=b&&g,l=h&&c;d=d?"coords"in d?d:d.geometry:null;if(!d)return null;if(f)return b=m.generalizeOptimizedGeometry(K,d,b,
h,a,f,g,c),k&&(b=m.quantizeOptimizedGeometry(u,b,e,l,a,k)),w[a](b,e,l);if(k)return b=m.quantizeOptimizedGeometry(u,d,b,h,a,k,g,c),w[a](b,e,l);m.removeZMValues(y,d,b,h,g,c);return w[a](y,e,l)};e.normalizeQuery=function(a,b,h){return n.__awaiter(this,void 0,void 0,function(){var d,f,e,g,c;return n.__generator(this,function(k){d=a.outFields;f=a.orderByFields;e=a.groupByFieldsForStatistics;g=a.outStatistics;if(d)for(c=0;c<d.length;c++)d[c]=d[c].trim();if(f)for(c=0;c<f.length;c++)f[c]=f[c].trim();if(e)for(c=
0;c<e.length;c++)e[c]=e[c].trim();if(g)for(c=0;c<g.length;c++)g[c].onStatisticField&&(g[c].onStatisticField=g[c].onStatisticField.trim());a.geometry&&!a.outSR&&(a.outSR=a.geometry.spatialReference);return[2,v(a,b,h)]})})};e.normalizeFilter=function(a,b,e){return n.__awaiter(this,void 0,void 0,function(){return n.__generator(this,function(d){return[2,v(a,b,e)]})})};e.normalizeQueryLike=v;e.cleanFromGeometryEngine=function(a){return a&&z in a?JSON.parse(JSON.stringify(a,L)):a};var z="_geVersion",L=
function(a,b){return a!==z?b:void 0}});