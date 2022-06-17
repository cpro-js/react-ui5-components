import { ReactElement, ReactFragment, ReactNode, ReactPortal } from "react";

export type ErrorDetail =
  | string
  | ReactElement
  | ReactFragment
  | null
  | undefined;

export interface UserErrorModel {
  message: string;
  details?: ErrorDetail;
}
