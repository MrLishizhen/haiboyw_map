// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../core/asyncUtils ../../core/Error ../../core/promiseUtils ../../core/SetUtils ../../core/uuid ../../portal/support/resourceUtils".split(" "),function(G,h,f,k,C,w,x,D,E){function y(a,c){return f.__awaiter(this,void 0,void 0,function(){var b;return f.__generator(this,function(e){switch(e.label){case 0:return[4,k.result(a.resource.portalItem.addResource(a.resource,a.content,c))];case 1:b=e.sent();if(!0===b.ok)a.finish&&a.finish(a.resource);else throw a.error&&a.error(b.error),
b.error;return[2]}})})}function F(a,c){return f.__awaiter(this,void 0,void 0,function(){var b;return f.__generator(this,function(e){switch(e.label){case 0:return[4,k.result(a.resource.update(a.content,c))];case 1:b=e.sent();if(!0===b.ok)a.finish(a.resource);else throw a.error(b.error),b.error;return[2]}})})}Object.defineProperty(h,"__esModule",{value:!0});h.saveResources=function(a,c,b){return f.__awaiter(this,void 0,void 0,function(){var e,n,p,g,l,q,d,h,k,z,A,r,m,t,u,B,v;return f.__generator(this,
function(f){switch(f.label){case 0:if(!c||!c.resources)return[2];e=c.portalItem===a.portalItem?x.SetFromValues(a.paths):new Set;a.paths.length=0;a.portalItem=c.portalItem;n=x.SetFromValues(c.resources.toKeep.map(function(a){return a.resource.path}));p=new Set;g=[];n.forEach(function(b){e.delete(b);a.paths.push(b)});l=0;for(q=c.resources.toUpdate;l<q.length;l++)d=q[l],e.delete(d.resource.path),n.has(d.resource.path)||p.has(d.resource.path)?(h=d.resource,k=d.content,z=d.finish,A=d.error,r=E.getSiblingOfSameType(h,
D.generateUUID()),a.paths.push(r.path),g.push(y({resource:r,content:k,finish:z,error:A},b))):(a.paths.push(d.resource.path),g.push(F(d,b)),p.add(d.resource.path));m=0;for(t=c.resources.toAdd;m<t.length;m++)u=t[m],g.push(y(u,b)),a.paths.push(u.resource.path);e.forEach(function(a){a=c.portalItem.resourceFromPath(a);g.push(a.portalItem.removeResource(a).catch(function(){}))});return 0===g.length?[2]:[4,w.eachAlways(g)];case 1:B=f.sent();w.throwIfAborted(b);v=B.filter(function(a){return"error"in a}).map(function(a){return a.error});
if(0<v.length)throw new C("save:resources","Failed to save one or more resources",{errors:v});return[2]}})})}});