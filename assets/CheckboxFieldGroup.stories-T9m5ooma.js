import{a as u,j as s}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as _}from"./FormController-a24Yjre7.js";import{C as W,a as l}from"./CheckboxField-XAtSop4l.js";import{u as D,F as M}from"./FormViewer-T_trOpy-.js";import"./index-9BFB80ap.js";import"./useFormController-QYTj16FN.js";import"./useLatestRef-8OPiqaso.js";import"./formSupport-Tri1jE22.js";import"./InputElementsFormSupport-cwSAMczA.js";import"./Checkbox-kdA6EdF0.js";import"./CheckBox-3JGrWoLD.js";import"./withWebComponent-uMO5mAaX.js";import"./ValueState-Qqn7Ekme.js";import"./Label-QZ2nubHh.js";import"./WrappingType-avPrqc94.js";import"./class-map-VCtLKyDB.js";import"./util-OqSjx520.js";import"./Button-NwTvRcXl.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./index-j_UY7yy0.js";import"./Title-siMC53XU.js";import"./clsx-2Jv0kmJG.js";import"./react-jss.esm-1qNMITJJ.js";import"./css-vendor.esm-6cc1E2ZA.js";import"./index-8BDAWP4G.js";import"./Popover-5NcXG5Re.js";import"./index-2q9JMl2_.js";import"./ToggleButton-tLhZtSzP.js";import"./CustomVariables-Ms22ARR_.js";import"./debounce-F9irgL9Y.js";import"./index-tPOYiQGZ.js";const n=y=>{const{initialValues:P,onSubmit:R,...j}=y,{submittedValues:q,handleSubmit:E}=D({onSubmit:R});return u(_,{initialValues:P,onSubmit:E,children:[u(W,{...j,name:"value",children:[s(l,{value:"cake",text:"Cake"}),s(l,{value:"waffles",text:"Waffles"}),s(l,{value:"burger",text:"Burger"})]}),s(M,{submittedValues:q})]})},e=n.bind({});e.args={};const r=n.bind({});r.args={...e.args,initialValues:{value:["waffles"]}};const o=n.bind({});o.args={...e.args,initialValues:{value:["waffles","cake"]}};const t=n.bind({});t.args={...r.args,disabled:!0};const a=n.bind({});a.args={...r.args,readonly:!0};const i=n.bind({});i.args={required:!0};const Ce={title:"Form/Field/CheckboxFieldGroup",component:W,argTypes:{onSubmit:{action:"submit"}}};var m,d,b;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(b=(d=e.parameters)==null?void 0:d.docs)==null?void 0:b.source}}};var p,c,F;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(F=(c=r.parameters)==null?void 0:c.docs)==null?void 0:F.source}}};var x,C,V;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(V=(C=o.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var h,k,S;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(S=(k=t.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var g,f,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var w,G,B;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const {
    initialValues,
    onSubmit,
    ...props
  } = args;
  const {
    submittedValues,
    handleSubmit
  } = useFormViewer({
    onSubmit: onSubmit
  });
  return <FormController {...{
    initialValues,
    onSubmit: handleSubmit
  }}>
      <CheckboxFieldGroup {...props} name="value">
        <CheckboxField value="cake" text={"Cake"} />
        <CheckboxField value="waffles" text={"Waffles"} />
        <CheckboxField value="burger" text={"Burger"} />
      </CheckboxFieldGroup>
      <FormViewer submittedValues={submittedValues} />
    </FormController>;
}`,...(B=(G=i.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};const Ve=["Empty","PrefilledSingle","PrefilledMultiple","Disabled","Readonly","ValidationRequired"];export{t as Disabled,e as Empty,o as PrefilledMultiple,r as PrefilledSingle,a as Readonly,i as ValidationRequired,Ve as __namedExportsOrder,Ce as default};
//# sourceMappingURL=CheckboxFieldGroup.stories-T9m5ooma.js.map
