// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../request ../core/promiseUtils ../core/queryUtils ../core/accessorSupport/decorators ../geometry/support/normalizeUtils ./Task ./mixins/NAServiceDescription ./support/ServiceAreaSolveResult".split(" "),function(w,x,b,m,n,p,k,q,r,t,u){var v=p.createQueryParamsHelper({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,defaultBreaks:!0,facilities:!0,outSpatialReference:{name:"outSR",getter:function(b){return b.outSpatialReference.wkid}},
pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},travelMode:!0});return function(l){function c(a){a=l.call(this,a)||this;a.url=null;return a}b.__extends(c,l);c.prototype.solve=function(a,c){var f=this,g=[],d=[],e={},h={};a.facilities&&a.facilities.features&&this._collectGeometries(a.facilities.features,d,"facilities.features",e);a.pointBarriers&&a.pointBarriers.features&&this._collectGeometries(a.pointBarriers.features,
d,"pointBarriers.features",e);a.polylineBarriers&&a.polylineBarriers.features&&this._collectGeometries(a.polylineBarriers.features,d,"polylineBarriers.features",e);a.polygonBarriers&&a.polygonBarriers.features&&this._collectGeometries(a.polygonBarriers.features,d,"polygonBarriers.features",e);return q.normalizeCentralMeridian(d).then(function(a){for(var b in e){var c=e[b];g.push(b);h[b]=a.slice(c[0],c[1])}return f._isInputGeometryZAware(h,g)?f.getServiceDescription():n.resolve({dontCheck:!0})}).then(function(d){("dontCheck"in
d?d.dontCheck:d.hasZ)||f._dropZValuesOffInputGeometry(h,g);d=function(b){h[b].forEach(function(d,c){a.get(b)[c].geometry=d})};for(var e in h)d(e);e={query:b.__assign(b.__assign(b.__assign({},f.parsedUrl.query),{f:"json"}),v.toQueryParams(a))};if(f.requestOptions||c)e=b.__assign(b.__assign(b.__assign({},f.requestOptions),c),e);return m(f.parsedUrl.path+"/solveServiceArea",e)}).then(function(a){return u.fromJSON(a.data)})};c.prototype._collectGeometries=function(a,b,c,g){g[c]=[b.length,b.length+a.length];
a.forEach(function(a){b.push(a.geometry)})};b.__decorate([k.property()],c.prototype,"url",void 0);return c=b.__decorate([k.subclass("esri.tasks.ServiceAreaTask")],c)}(t.NAServiceDescriptionMixin(r))});