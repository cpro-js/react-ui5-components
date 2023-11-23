import{j as u,a as j}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as I}from"./chunk-AY7I2SME-4UylTnhF.js";import{C as c}from"./Checkbox-kdA6EdF0.js";import"./index-9BFB80ap.js";import"./CheckBox-3JGrWoLD.js";import"./withWebComponent-uMO5mAaX.js";import"./ValueState-Qqn7Ekme.js";import"./Label-QZ2nubHh.js";import"./WrappingType-avPrqc94.js";import"./class-map-VCtLKyDB.js";const i="test",e=({form:y,...d})=>y?j("form",{onSubmit:b=>{b.preventDefault();const w=new FormData(b.currentTarget).get(i),H=`Submitted value for key [${i}]: ${w}`;I("onSubmit")(H)},children:[u(c,{...d}),u("button",{children:"Submit"})]}):u(c,{...d}),t=e.bind({});t.args={name:i};const n=e.bind({});n.args={...t.args,checked:!0};const o=e.bind({});o.args={...t.args,indeterminate:!0,checked:!0};const a=e.bind({});a.args={...t.args,disabled:!0};const s=e.bind({});s.args={...t.args,disabled:!0,checked:!0};const r=e.bind({});r.args={...t.args,form:!0};const m=e.bind({});m.args={...r.args,value:"my-value"};const Q={title:"Form/Component/Checkbox",component:c,argTypes:{onChange:{action:"change"}}};var g,f,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...(p=(f=t.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var l,S,D;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...(D=(S=n.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var A,k,E;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...(E=(k=o.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var L,h,F;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...(F=(h=a.parameters)==null?void 0:h.docs)==null?void 0:F.source}}};var T,C,x;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...(x=(C=s.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var v,_,$;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...($=(_=r.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var M,N,U;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`({
  form,
  ...args
}) => {
  if (!form) {
    return <Checkbox {...args} />;
  }
  return <form onSubmit={e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget).get(DEFAULT_NAME);
    const toLog = \`Submitted value for key [\${DEFAULT_NAME}]: \${data}\`;
    action("onSubmit")(toLog);
  }}>
      <Checkbox {...args} />
      <button>Submit</button>
    </form>;
}`,...(U=(N=m.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};const R=["Standard","Checked","Indeterminate","Disabled","DisabledAndChecked","HtmlForm","HtmlFormWithValue"];export{n as Checked,a as Disabled,s as DisabledAndChecked,r as HtmlForm,m as HtmlFormWithValue,o as Indeterminate,t as Standard,R as __namedExportsOrder,Q as default};
//# sourceMappingURL=Checkbox.stories-eaKaMtEy.js.map
