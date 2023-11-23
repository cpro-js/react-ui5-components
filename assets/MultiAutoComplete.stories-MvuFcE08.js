import{j as N}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import"./add-LiDuknGm.js";import{a as T}from"./chunk-AY7I2SME-4UylTnhF.js";import{S as j,C as s}from"./AutoComplete-storyData-ahnPkInH.js";import{M as _}from"./MultiAutoComplete-KzFup3ln.js";import{V as $}from"./ValueState-Qqn7Ekme.js";import"./index-9BFB80ap.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./CommonSelection-w2tAztTJ.js";import"./GroupHeaderListItem-NSzFLVaM.js";import"./ItemNavigation-SKlyB5ng.js";import"./BusyIndicator-LnPMRz3m.js";import"./Label-QZ2nubHh.js";import"./WrappingType-avPrqc94.js";import"./Button-Kg1wKD-C.js";import"./Suggestions.css-_W_4sSd4.js";import"./CheckBox-3JGrWoLD.js";import"./slim-arrow-right-h-63TUj1.js";import"./ValueStateMessage.css-NtFaRvah.js";import"./Title-siMC53XU.js";import"./PasteHandler-M9lQqGah.js";import"./ScrollEnablement-Ha971trf.js";import"./Input-jvkg1AKt.js";import"./value-help-yHR1Fcmv.js";import"./debounce-F9irgL9Y.js";const o=e=>N(_,{...e,onSelectionChange:z=>{T("onSelect")(z)},style:{width:"50%"}}),r=o.bind({});r.args={values:[],onSearch:j};const t=o.bind({});t.args={...r.args,values:[s[0].value,s[4].value,s[5].value],initialSuggestions:[s[0],s[4],s[5]]};const n=o.bind({});n.args={...t.args,itemLabel:"withUmlaut"};const a=o.bind({});a.args={...t.args,itemLabel:e=>`ISO code: ${e.value}`};const l=o.bind({});l.args={...t.args,itemValue:"label"};const c=o.bind({});c.args={...t.args,itemValue:e=>`VALUE_${e.label.toUpperCase()}`};const u=o.bind({});u.args={...r.args,suggestionProps:e=>({text:e.label,description:e.withUmlaut,icon:"add",info:"Infozzz",infoState:$.Success})};const i=o.bind({});i.args={...t.args,renderValue:e=>({text:e.label+" - custom !!!",className:"test-class-name"})};const ge={title:"Form/Component/MultiAutoComplete",component:_};var p,m,d;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var S,g,C;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(C=(g=t.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var v,h,A;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(A=(h=n.parameters)==null?void 0:h.docs)==null?void 0:A.source}}};var V,b,y;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(y=(b=a.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var f,w,M;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(M=(w=l.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var L,P,R;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(R=(P=c.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var U,x,E;u.parameters={...u.parameters,docs:{...(U=u.parameters)==null?void 0:U.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(E=(x=u.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var F,I,O;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`props => {
  const onSelect = (values: Array<string>) => {
    // setStoredValues(values);
    action("onSelect")(values);
  };
  return <MultiAutoComplete {...props} onSelectionChange={onSelect} style={{
    width: "50%"
  }} />;
}`,...(O=(I=i.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const Ce=["Standard","Prefilled","CustomLabelProp","CustomLabelFunction","CustomValueProp","CustomValueFunction","RenderSuggestion","RenderValue"];export{a as CustomLabelFunction,n as CustomLabelProp,c as CustomValueFunction,l as CustomValueProp,t as Prefilled,u as RenderSuggestion,i as RenderValue,r as Standard,Ce as __namedExportsOrder,ge as default};
//# sourceMappingURL=MultiAutoComplete.stories-MvuFcE08.js.map
