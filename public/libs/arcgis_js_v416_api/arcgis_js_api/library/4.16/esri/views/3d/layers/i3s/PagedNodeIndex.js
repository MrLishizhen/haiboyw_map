// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../geometry/support/aaBoundingBox","./I3SUtil","../../support/orientedBoundingBox"],function(u,v,q,r,p){return function(){function c(a,b,d){this._pages=[];this.pageSize=0;this._renderSR=this._nodeSR=null;this._nodeSR=a;this._renderSR=b;this.pageSize=d}c.prototype.addPage=function(a,b,d){for(void 0===d&&(d=0);this._pages.length<a;)this._pages.push(null);for(var c=this._nodeSR,g=this._renderSR,k=new p.ObbArray(b.length),e=0;e<b.length;e++)r.transformObb(b[e].obb,
c,k.obbs[e],g,d);this._pages[a]={nodes:b,renderObbs:k.obbs,parents:new Uint32Array(this.pageSize)};a=this._pages;b=this.pageSize;for(c=[0];c.length;)for(g=c.pop(),d=a[g/b|0].nodes[g%b],k=0;k<d.childCount;k++)e=d.firstChild+k,null!=a[e/b|0]&&(a[e/b|0].parents[e%b]=g,c.push(e))};c.prototype.hasPage=function(a){return!!this._pages[a]};c.prototype.getNode=function(a){var b=this.pageSize;return this._pages[a/b|0].nodes[a%b]};c.prototype.getRenderObb=function(a){var b=this.pageSize;return this._pages[a/
b|0].renderObbs[a%b]};c.prototype.getRenderCenter=function(a){return this.getRenderObb(a).center};c.prototype.setRenderObb=function(a,b){var d=this.pageSize;p.set(b,this._pages[a/d|0].renderObbs[a%d])};c.prototype.getParentId=function(a){var b=this.pageSize;return this._pages[a/b|0].parents[a%b]};c.prototype.hasNodes=function(a,b){b=(a+b-1)/this.pageSize|0;for(a=a/this.pageSize|0;a<=b;a++)if(null==this._pages[a])return!1;return!0};c.prototype.forEachNodeId=function(a){for(var b=0;b<this._pages.length;b++){var d=
this._pages[b];if(d)for(var c=0;c<d.nodes.length;c++)a(b*this.pageSize+c)}};c.prototype.createVisibilityTraverse=function(){var a=this,b=[],c=[],r=q.create();return function(d,k){if(a.hasNodes(0,1))for(b.length=0,b.push(0),c.length=0,c.push(0);0<b.length;){var e=b.pop(),g=c.pop(),l=a.getNode(e),m=a.getRenderObb(e),n=!0;if(null!=d.clippingBox){var h=1<<d.frustumPlanes.length;if(0===(g&h)){var f=p.toAaBoundingBox(m,r);q.contains(d.clippingBox,f)?g|=h:q.intersects(d.clippingBox,f)||(n=!1)}}for(f=0;f<
d.frustumPlanes.length&&n;f++)if(h=1<<f,0===(g&h)){var t=p.intersectPlane(m,d.frustumPlanes[f]);0<t?n=!1:0>t&&(g|=h)}if(k.predicate(e,l,n)){m=l.firstChild;l=l.childCount;f=!1;n=(m+l-1)/a.pageSize|0;for(h=m/a.pageSize|0;h<=n;h++)if(!a.hasPage(h)){k.pageMiss(e,h);f=!0;break}if(!f)for(f=0;f<l;f++)b.push(m+f),c.push(g)}}}};return c}()});