import { Meta, StoryObj } from "@storybook/react";
import { Form, FormItem, Label } from "@ui5/webcomponents-react";

import { FormBusyIndicator } from "../field/FormBusyIndicator";
import { TextInputField } from "../field/TextInputField";
import { FormChangeHandler, FormSubmitHandler } from "../field/types";
import { FormController } from "./FormController";

export default {
  title: "Form Example",
} satisfies Meta;
type Story = StoryObj;

interface PersonForm {
  firstName: string;
  lastName: string;
}

export const SimpleClientSideForm: Story = {
  render: () => {
    const onSubmit: FormSubmitHandler<PersonForm> = (values, formApi) => {
      // triggers only when valid
    };

    const onChange: FormChangeHandler<PersonForm> = (
      values,
      actions,
      changedField
    ) => {
      // triggers maybe with invalid values
    };

    return (
      <FormController<PersonForm> onSubmit={onSubmit} onChange={onChange}>
        <Form
          headerText={
            "Only Client Side Validation (required, minLength, maxLength"
          }
          labelSpan="S12 M12 L12 XL12"
          layout="S1 M1 L1 XL1"
        >
          <FormItem
            labelContent={
              <Label showColon required>
                firstName
              </Label>
            }
          >
            <TextInputField
              name="firstName"
              required
              minLength={1}
              maxLength={10}
              onChange={(event) => {
                console.log(
                  "change",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );
              }}
              onSubmit={(event) => {
                console.log(
                  "submit",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );

                // go to next field when field is valid
                event.detail.valid &&
                  event.detail.formApi.focusField("lastName");
              }}
            />
          </FormItem>
          <FormItem
            labelContent={
              <Label showColon required>
                lastName
              </Label>
            }
          >
            <TextInputField
              name="lastName"
              required
              minLength={1}
              maxLength={10}
              onChange={(event) => {
                console.log(
                  "change",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );
              }}
              onSubmit={(event) => {
                console.log(
                  "submit",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );

                // submit form when field is valid
                event.detail.valid && event.detail.formApi.submitForm();
              }}
            />
          </FormItem>
        </Form>
      </FormController>
    );
  },
};

export const CustomValidationForm: Story = {
  render: () => {
    const onSubmit: FormSubmitHandler<PersonForm> = (values, formApi) => {
      // triggers only when valid
      console.log("submit", values);
    };

    const onChange: FormChangeHandler<PersonForm> = (
      values,
      actions,
      changedField
    ) => {
      // triggers maybe with invalid values
    };

    return (
      <FormController<PersonForm> onSubmit={onSubmit} onChange={onChange}>
        <Form
          headerText={"Client Side Validation + custom sync/async Validation"}
          labelSpan="S12 M12 L12 XL12"
          layout="S1 M1 L1 XL1"
        >
          <FormItem
            labelContent={
              <Label showColon required>
                firstName
              </Label>
            }
          >
            <TextInputField<PersonForm, "firstName">
              name="firstName"
              required
              minLength={1}
              maxLength={10}
              validate={async (value, values) => {
                // async validation
                await new Promise((r) => setTimeout(r, 1000));
                // required, min, max already checked!
                const onlyLettersError = /^[a-zA-Z]+$/i.test(value)
                  ? undefined
                  : "Nur Buchstaben!";

                return onlyLettersError;
              }}
              onChange={(event) => {
                console.log(
                  "change",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );
              }}
              onSubmit={(event) => {
                console.log(
                  "submit",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );

                // go to next field when field is valid
                event.detail.valid &&
                  event.detail.formApi.focusField("lastName");
              }}
            />
          </FormItem>
          <FormItem
            labelContent={
              <Label showColon required>
                lastName
              </Label>
            }
          >
            <TextInputField<PersonForm, "lastName">
              name="lastName"
              required
              minLength={1}
              maxLength={10}
              validate={async (value, formApi) => {
                // required, min, max already checked!
                // async validation
                await new Promise((r) => setTimeout(r, 1000));
                // all good
                return undefined;
              }}
              onChange={(event) => {
                console.log(
                  "change",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );
              }}
              onSubmit={(event) => {
                console.log(
                  "submit",
                  event.detail.name,
                  event.detail.value,
                  event.detail.valid
                );

                // submit form when field is valid
                event.detail.valid && event.detail.formApi.submitForm();
              }}
            />
          </FormItem>
        </Form>
      </FormController>
    );
  },
};

export const AsyncInitialValuesPersonForm: Story = {
  render: () => {
    const onSubmit: FormSubmitHandler<PersonForm> = (values, formApi) => {
      // triggers only when valid
    };

    const onChange: FormChangeHandler<PersonForm> = (
      values,
      actions,
      changedField
    ) => {
      // triggers maybe with invalid values
    };

    const fetchValues: FormInitialValues<PersonForm> = async () => {
      // will only trigger once!
      // additional trigger via <FormController key="..." .../>
      return {
        firstName: "Max",
        lastName: "Mustermann",
      };
    };

    return (
      <FormController<PersonForm>
        initialValues={fetchValues}
        onSubmit={onSubmit}
        onChange={onChange}
      >
        <Form labelSpan="S12 M12 L12 XL12" layout="S12 M12 L12 XL12">
          <FormItem
            labelContent={
              <Label showColon required>
                Username
              </Label>
            }
          >
            <TextInputField
              name="username"
              required
              minLength={1}
              maxLength={10}
            />
          </FormItem>
          <FormItem
            labelContent={
              <Label showColon required>
                lastName
              </Label>
            }
          >
            <TextInputField
              name="lastName"
              required
              minLength={1}
              maxLength={10}
            />
          </FormItem>
        </Form>
      </FormController>
    );
  },
};

interface SetPasswordForm {
  password: string;
  passwordRepeat: string;
}

export const DependentValidationForm: Story = {
  render: () => {
    const onSubmit: FormSubmitHandler<SetPasswordForm> = (values, formApi) => {
      // triggers only when valid
    };

    const onChange: FormChangeHandler<SetPasswordForm> = (
      values,
      actions,
      changedField
    ) => {
      // triggers maybe with invalid values
    };

    return (
      <FormController<SetPasswordForm> onSubmit={onSubmit} onChange={onChange}>
        <Form labelSpan="S12 M12 L12 XL12" layout="S1 M1 L1 XL1">
          <FormItem
            labelContent={
              <Label showColon required>
                Password
              </Label>
            }
          >
            <TextInputField<SetPasswordForm, "password">
              name="password"
              required
              minLength={1}
              maxLength={10}
              onSubmit={(event) => {
                // go to next field when field is valid
                event.detail.valid &&
                  event.detail.formApi.focusField("passwordRepeat");
              }}
            />
          </FormItem>
          <FormItem
            labelContent={
              <Label showColon required>
                PasswordRepeat
              </Label>
            }
          >
            <TextInputField<SetPasswordForm, "passwordRepeat">
              name="passwordRepeat"
              required
              minLength={1}
              maxLength={10}
              dependsOn={["password"]}
              validate={{
                passwordMustMatch: async (value, values) => {
                  if (values.password && value !== values.password) {
                    return "Passwords don't match!";
                  }
                  // all good
                  return undefined;
                },
              }}
              onSubmit={(event) => {
                // field is valid! -> submit form
                event.detail.valid && event.detail.formApi.submitForm();
              }}
            />
          </FormItem>
        </Form>
      </FormController>
    );
  },
};
