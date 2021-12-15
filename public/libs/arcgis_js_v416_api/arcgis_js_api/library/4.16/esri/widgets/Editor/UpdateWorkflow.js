// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.16/esri/copyright.txt for details.
//>>built
define("require exports tslib ../../core/arrayUtils ../../core/maybe ../../core/promiseUtils ../../core/watchUtils ../../core/accessorSupport/decorators ../../views/support/layerViewUtils ./Edits ./UpdateWorkflowData ./Workflow ./workflowUtils".split(" "),function(E,F,a,x,w,m,y,z,A,B,C,D,p){return function(q){function d(a){a=q.call(this,a)||this;a.type="update";return a}a.__extends(d,q);l=d;d.create=function(a,e,b){a=new C({edits:new B,viewModel:a});b=new l({data:a,afterCommit:b});b._set("steps",
this._createWorkflowSteps(b,e));return b};d.prototype.highlight=function(a){var e=this.data.viewModel.view,e=a&&x.find(e.allLayerViews.items,function(b){return b.layer===a.layer});A.highlightsSupported(e)&&this.handles.add(e.highlight(a),"candidate-highlight")};d.prototype.unhighlight=function(){this.handles.remove("candidate-highlight")};d._createWorkflowSteps=function(k,e){void 0===e&&(e="awaiting-feature-to-update");var b=k.data,h=k.handles,d={"awaiting-feature-to-update":function(){return{id:"awaiting-feature-to-update",
setUp:function(){return a.__awaiter(this,void 0,void 0,function(){var c,f,d,g,e;return a.__generator(this,function(G){c=b.viewModel;f=c.spinnerViewModel;d=c.view;g=null;h.add({remove:function(){g&&(g.abort(),g=null)}},this.id);b.edits.feature=null;e=d.on("immediate-click",function(c){c.stopPropagation();f.location=c.mapPoint;f.visible=!0;g&&g.abort();var e=b.viewModel.editableItems;g=m.createAbortController();m.create(function(a,b){m.onAbort(g.signal,function(){return b(m.createAbortError())});a(p.fetchCandidates(e,
d,c))}).then(function(c){b.viewModel.spinnerViewModel.visible=!1;m.throwIfAborted(g);b.candidates=c.reduce(function(b,c){return c.error?b:a.__spreadArrays(b,c.value)},[]);0!==b.candidates.length&&(1===b.candidates.length?(b.edits.feature=b.candidates[0],b.viewModel.activeWorkflow.go("editing-existing-feature")):b.viewModel.activeWorkflow.next())})});h.add(e,this.id);return[2]})})},tearDown:function(){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){h.remove(this.id);
return[2]})})}}},"awaiting-update-feature-candidate":function(){return{id:"awaiting-update-feature-candidate",setUp:function(){return a.__awaiter(this,void 0,void 0,function(){var c;return a.__generator(this,function(a){c=b.edits;c.feature=null;h.add(y.watch(c,"feature",function(a){k.unhighlight();k.highlight(a)}),this.id);return[2]})})},tearDown:function(){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){k.unhighlight();h.remove(this.id);return[2]})})}}},"editing-existing-feature":function(){return{id:"editing-existing-feature",
setUp:function(){return a.__awaiter(this,void 0,void 0,function(){var c,f,e,d=this;return a.__generator(this,function(g){c=b.edits.feature;f=b.viewModel;b.editableItem=f.editableItems.find(function(a){return a.layer===c.layer});e=m.createAbortController();h.add({remove:function(){return e.abort()}},this.id);return[2,p.fetchFullFeature(c,f.view,e).then(function(c){return a.__awaiter(d,void 0,void 0,function(){var d,g,l,r,q,n,t,u,v;return a.__generator(this,function(a){switch(a.label){case 0:if(m.isAborted(e))return[2];
b.edits.updateGeometry(c.geometry);b.edits.updateAttributes(c.attributes);b.edits.trackChanges();d=c.layer;l=(g=p.findLayerInfo(f.layerInfos,d))&&g.fieldConfig;f.attachmentsViewModel.set({graphic:c,mode:"view"});f.featureFormViewModel.set({feature:c,fieldConfig:l});r=[f.featureFormViewModel.on("value-change",function(){b.edits.updateAttributes(f.featureFormViewModel.getValues());c.attributes=b.edits.feature.attributes}),f.attachmentsViewModel.watch("mode",function(a){"add"===a&&b.viewModel.activeWorkflow.go("adding-attachment");
"edit"===a&&b.viewModel.activeWorkflow.go("editing-attachment")})];q=d.capabilities.editing.supportsGeometryUpdate;if(!q)return[3,2];n=p.getVisualVariableAttributes(c);return[4,p.setUpGeometryUpdate(c,n,f.sketchViewModel,f.view,function(a){var c=a.geometry;a=a.attributes;if(w.isSome(n.rotation)){var d=n.rotation.field;f.featureFormViewModel.setValue(d,a[d])}w.isSome(n.size)&&(d=n.size.field,f.featureFormViewModel.setValue(d,a[d]));b.edits.updateAttributes(a);b.edits.updateGeometry(c)})];case 1:return t=
a.sent(),u=t.interactive,v=t.visual,r.push(u,v),h.add(u,k._handleKeys.beforeCommit),h.add(v,k._handleKeys.afterCommit),[3,3];case 2:k.highlight(c),a.label=3;case 3:return h.add(r,this.id),[2]}})})})]})})},tearDown:function(){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){b.editableItem=null;b.viewModel.featureFormViewModel.set({feature:null,fieldConfig:null});h.remove(this.id);k.unhighlight();return[2]})})}}},"adding-attachment":function(){return{id:"adding-attachment",
parent:"editing-existing-feature",setUp:function(){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){return[2]})})},tearDown:function(){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){return[2]})})}}},"editing-attachment":function(){return{id:"editing-attachment",parent:"editing-existing-feature",setUp:function(){return a.__awaiter(this,void 0,void 0,function(){return a.__generator(this,function(a){return[2]})})},tearDown:function(){return a.__awaiter(this,
void 0,void 0,function(){return a.__generator(this,function(a){return[2]})})}}}},l=!1;return["awaiting-feature-to-update","awaiting-update-feature-candidate","editing-existing-feature","adding-attachment","editing-attachment"].filter(function(a){return l?!0:l=a===e}).map(function(a){return d[a]()})};var l;return d=l=a.__decorate([z.subclass("esri.widgets.Editor.UpdateWorkflow")],d)}(D)});