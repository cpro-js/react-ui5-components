import{j as Wr}from"./useIsomorphicLayoutEffect-xRq3KBKR.js";import{a as Lr}from"./chunk-AY7I2SME-4UylTnhF.js";import{N as vr}from"./NumberInput-c0IrYTrX.js";import"./index-9BFB80ap.js";import"./NumberContext-DQE6BGmH.js";import"./util-5JWwSdnm.js";import"./ValueState-Qqn7Ekme.js";import"./index-DEsUDRQH.js";import"./Input-jvkg1AKt.js";import"./withWebComponent-uMO5mAaX.js";import"./Popover-5NcXG5Re.js";import"./class-map-VCtLKyDB.js";import"./Suggestions.css-_W_4sSd4.js";import"./ValueStateMessage.css-NtFaRvah.js";const Br={title:"Form/Component/NumberInput",component:vr},r=f=>Wr(vr,{...f}),e=r.bind({});e.args={};const a=r.bind({});a.args={...e.args,value:123456.789};const s=r.bind({});s.args={...a.args,useGrouping:!0};const N=r.bind({});N.args={...s.args,locale:"de"};const D=r.bind({});D.args={...s.args,locale:"en-IN"};const M=r.bind({});M.args={...s.args,locale:"pl"};const S=r.bind({});S.args={...e.args,icon:Wr("span",{children:"EUR"})};const t=r.bind({});t.storyName="Display Config: MinIntegerDigits = 3";t.args={...e.args,minimumIntegerDigits:3,value:1};const n=r.bind({});n.storyName="Display Config: MinFractionDigits = 6";n.args={...e.args,minimumFractionDigits:6,maximumFractionDigits:9,value:1.234};const o=r.bind({});o.storyName="Display Config: MaxFractionDigits = 1";o.args={...a.args,maximumFractionDigits:1};const i=r.bind({});i.storyName="Display Config: MinSignificantDigits = 3";i.args={...e.args,minimumSignificantDigits:3,value:1};const u=r.bind({});u.storyName="Display Config: MaxSignificantDigits = 3";u.args={...a.args,maximumSignificantDigits:3};const c=r.bind({});c.storyName="Input Config: MinValue = 0";c.args={...a.args,minimumValue:0};const m=r.bind({});m.storyName="Input Config: MinValue = -3";m.args={...a.args,minimumValue:-3};const p=r.bind({});p.storyName="Input Config: Fails for MinValue = 2";p.args={...a.args,minimumValue:2};const g=r.bind({});g.storyName="Input Config: MaxValue = 999";g.args={...a.args,maximumValue:999};const d=r.bind({});d.storyName="Input Config: Fails for MaxValue = -2";d.args={...a.args,maximumValue:-2};const l=r.bind({});l.storyName="Input Config: MaxFractionDigits = 1";l.args={...a.args,maximumFractionDigits:1};const I=r.bind({});I.storyName="Input Config: Integers Only = maxFractionDigits = 0";I.args={...a.args,maximumFractionDigits:0};const b=r.bind({});b.storyName="Input Events: onInput triggers on replaced values";b.args={...e.args,maximumValue:2,onInput:f=>Lr("onInput")(f.target.value)};var x,F,y;e.parameters={...e.parameters,docs:{...(x=e.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(y=(F=e.parameters)==null?void 0:F.docs)==null?void 0:y.source}}};var C,h,V;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(V=(h=a.parameters)==null?void 0:h.docs)==null?void 0:V.source}}};var W,v,L;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(L=(v=s.parameters)==null?void 0:v.docs)==null?void 0:L.source}}};var O,P,E;N.parameters={...N.parameters,docs:{...(O=N.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(E=(P=N.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var G,j,A;D.parameters={...D.parameters,docs:{...(G=D.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(A=(j=D.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var _,R,T;M.parameters={...M.parameters,docs:{...(_=M.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(T=(R=M.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var U,k,q;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(q=(k=S.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var w,z,B;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(B=(z=t.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var H,J,K;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(K=(J=n.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Y;o.parameters={...o.parameters,docs:{...(Q=o.parameters)==null?void 0:Q.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(Y=(X=o.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,rr;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(rr=($=i.parameters)==null?void 0:$.docs)==null?void 0:rr.source}}};var ar,er,sr;u.parameters={...u.parameters,docs:{...(ar=u.parameters)==null?void 0:ar.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(sr=(er=u.parameters)==null?void 0:er.docs)==null?void 0:sr.source}}};var tr,nr,or;c.parameters={...c.parameters,docs:{...(tr=c.parameters)==null?void 0:tr.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(or=(nr=c.parameters)==null?void 0:nr.docs)==null?void 0:or.source}}};var ir,ur,cr;m.parameters={...m.parameters,docs:{...(ir=m.parameters)==null?void 0:ir.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(cr=(ur=m.parameters)==null?void 0:ur.docs)==null?void 0:cr.source}}};var mr,pr,gr;p.parameters={...p.parameters,docs:{...(mr=p.parameters)==null?void 0:mr.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(gr=(pr=p.parameters)==null?void 0:pr.docs)==null?void 0:gr.source}}};var dr,lr,Ir;g.parameters={...g.parameters,docs:{...(dr=g.parameters)==null?void 0:dr.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(Ir=(lr=g.parameters)==null?void 0:lr.docs)==null?void 0:Ir.source}}};var br,Nr,Dr;d.parameters={...d.parameters,docs:{...(br=d.parameters)==null?void 0:br.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(Dr=(Nr=d.parameters)==null?void 0:Nr.docs)==null?void 0:Dr.source}}};var Mr,Sr,fr;l.parameters={...l.parameters,docs:{...(Mr=l.parameters)==null?void 0:Mr.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(fr=(Sr=l.parameters)==null?void 0:Sr.docs)==null?void 0:fr.source}}};var xr,Fr,yr;I.parameters={...I.parameters,docs:{...(xr=I.parameters)==null?void 0:xr.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(yr=(Fr=I.parameters)==null?void 0:Fr.docs)==null?void 0:yr.source}}};var Cr,hr,Vr;b.parameters={...b.parameters,docs:{...(Cr=b.parameters)==null?void 0:Cr.docs,source:{originalSource:`args => {
  return <NumberInput {...args} />;
}`,...(Vr=(hr=b.parameters)==null?void 0:hr.docs)==null?void 0:Vr.source}}};const Hr=["Standard","Prefilled","WithGrouping","WithLocaleDe","WithLocaleIn","WithLocalePl","WithIcon","MinIntegerDigits","MinFractionDigits","MaxFractionDigits","MinSignificantDigits","MaxSignificantDigits","InputMin","InputMinAlt","InputMinFailure","InputMax","InputMaxFailure","InputMaxFractionDigits","InputIntegersOnly","InputOnInput"];export{I as InputIntegersOnly,g as InputMax,d as InputMaxFailure,l as InputMaxFractionDigits,c as InputMin,m as InputMinAlt,p as InputMinFailure,b as InputOnInput,o as MaxFractionDigits,u as MaxSignificantDigits,n as MinFractionDigits,t as MinIntegerDigits,i as MinSignificantDigits,a as Prefilled,e as Standard,s as WithGrouping,S as WithIcon,N as WithLocaleDe,D as WithLocaleIn,M as WithLocalePl,Hr as __namedExportsOrder,Br as default};
//# sourceMappingURL=NumberInput.stories-Co598AKj.js.map
