import{a as l,j as r,F as b}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as f}from"./chunk-AY7I2SME-4UylTnhF.js";import{B as m}from"./Button-NwTvRcXl.js";import"./index-9BFB80ap.js";import"./util-5JWwSdnm.js";import"./index-iYocmi5m.js";import"./Button-Kg1wKD-C.js";import"./withWebComponent-uMO5mAaX.js";const y=({buttons:o})=>l("form",{onSubmit:t=>{t.preventDefault(),f("onSubmit")(t)},children:[r("input",{type:"text",defaultValue:"change value and reset"}),o.map((t,a)=>r(m,{...t},a))]}),e=y.bind({});e.args={buttons:[{children:"Button"},{children:"Submit",type:"submit"},{children:"Reset",type:"reset"}]};const x=({buttons:o})=>l(b,{children:[r("form",{id:"my-form-id",onSubmit:t=>{t.preventDefault(),f("onSubmit")(t)},children:r("input",{type:"text",defaultValue:"change value and reset"})}),o.map((t,a)=>r(m,{...t},a))]}),n=x.bind({});n.args={buttons:[{children:"Button",form:"my-form-id"},{form:"my-form-id",children:"Submit",type:"submit"},{form:"my-form-id",children:"Reset",type:"reset"}]};const E={title:"Form/Component/Button",component:m,argTypes:{onClick:{action:"click"}}};var i,s,u;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`({
  buttons
}) => {
  return <form onSubmit={e => {
    e.preventDefault();
    action("onSubmit")(e);
  }}>
      <input type={"text"} defaultValue="change value and reset" />
      {buttons.map((props, index) => <Button key={index} {...props} />)}
    </form>;
}`,...(u=(s=e.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};var p,c,d;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`({
  buttons
}) => {
  return <>
      <form id={"my-form-id"} onSubmit={e => {
      e.preventDefault();
      action("onSubmit")(e);
    }}>
        <input type={"text"} defaultValue="change value and reset" />
      </form>
      {buttons.map((props, index) => <Button key={index} {...props} />)}
    </>;
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const V=["ParentForm","ExternalForm"];export{n as ExternalForm,e as ParentForm,V as __namedExportsOrder,E as default};
//# sourceMappingURL=Button.stories-HhVC--X9.js.map
