import { ReactElement, ReactNode } from "react";

export type ErrorDetail = string | ReactElement | ReactNode | null | undefined;

export interface UserErrorModel {
  message: string;
  details?: ErrorDetail;
}
