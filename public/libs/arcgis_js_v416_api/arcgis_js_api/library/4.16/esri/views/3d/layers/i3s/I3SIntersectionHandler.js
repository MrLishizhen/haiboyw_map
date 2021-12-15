// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/maybe ../../../../core/libs/gl-matrix-2/vec3 ../../support/orientedBoundingBox ../../webgl-engine/lib/intersectorUtils".split(" "),function(h,k,l,v,w,t){function x(b,a,e,d){void 0===d&&(d=0);d=b[3]+d;var m=a[0]-b[0],f=a[1]-b[1];b=a[2]-b[2];a=e[0];var c=e[1];e=e[2];var n=a*m+c*f+e*b;return 0<=n*n-(a*a+c*c+e*e)*(m*m+f*f+b*b-d*d)}Object.defineProperty(k,"__esModule",{value:!0});h=function(){function b(a){this.type="I3S";this.layerUid=a.layerUid;this.sublayerUid=
a.sublayerUid;this.collection=a.collection;this.forEach=a.forEach;this.slicePlane=a.slicePlaneEnabled;this.isGround=a.isGround}b.prototype.intersect=function(a,b,d,m){var f=this,c=a.results,e=2===a.options.store,h=a.ray.direction,r=a.tolerance,k=function(a){return a},u=function(a){return a},g=t.getVerticalOffsetI3S(a.verticalOffset);l.isSome(g)&&(k=function(a){return g.applyToMbs(a)},u=function(a){return g.applyToObb(a)});this.forEach(function(q,n){l.isNone(q.authorativeObb)&&!x(k(q.renderMbs),d,
h,r)||l.isSome(q.renderObb)&&!w.intersectLine(u(q.renderObb),d,h,r)||f.collection.intersect(n,d,m,r,g,function(h,p,k,n){if(0<=p&&(null==b||b(d,m,p))){var g=function(a){a.intersector=f.type;a.target={type:"external",metadata:{layerUid:f.layerUid,sublayerUid:f.sublayerUid,nodeIndex:q.index,componentIndex:h}};a.dist=p;v.vec3.copy(a.normal,k);a.triangleNr=n};(null==c.min.dist||p<c.min.dist)&&g(c.min);(null==c.max.dist||p>c.max.dist)&&g(c.max);if(e){var l=new t.IntersectorResult(a.ray);g(l);a.results.all.push(l)}f.isGround&&
(null==c.ground.dist||p<c.ground.dist)&&g(c.ground)}})})};Object.defineProperty(b.prototype,"intersectionHandlerId",{get:function(){return this.layerUid},enumerable:!0,configurable:!0});return b}();k.I3SIntersectionHandler=h});