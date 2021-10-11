import { FC } from "react";
import { Controller } from "react-hook-form";

export interface HiddenFieldProps {
  name: string;
  // Note: using disabled to hide values within submit data is not supported in react hook form, yet
  // see https://github.com/react-hook-form/react-hook-form/issues/2826
  // disabled?: boolean;
}

export const HiddenField: FC<HiddenFieldProps> = ({ name }) => {
  return (
    <Controller<any>
      name={name}
      render={({ field }) => {
        return (
          <input
            {...field}
            type="hidden"
            value={field.value == null ? "" : field.value}
          />
        );
      }}
    />
  );
};
