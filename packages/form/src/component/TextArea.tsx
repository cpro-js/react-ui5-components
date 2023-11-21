import "../form/formSupport";

import { TextArea as UI5TextArea } from "@ui5/webcomponents-react";
import { TextAreaDomRef, TextAreaPropTypes } from "@ui5/webcomponents-react";
import { forwardRef } from "react";

export interface TextAreaProps extends TextAreaPropTypes {}

export const TextArea = forwardRef<TextAreaDomRef, TextAreaProps>(
  ({ ...props }, forwardedRef) => {
    return <UI5TextArea {...props} ref={forwardedRef} />;
  }
);
