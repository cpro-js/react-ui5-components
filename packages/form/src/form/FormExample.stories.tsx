import { Meta, StoryObj } from "@storybook/react";
import { Form, FormItem, Label } from "@ui5/webcomponents-react";

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
          layout="S12 M12 L12 XL12"
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
              onFieldSubmit={(value, formApi) => {
                // field is valid! -> focus next field
                void formApi.focusField("lastName");
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
              onFieldSubmit={(value, formApi) => {
                // field is valid! -> submit form
                void formApi.submit();
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
          layout="S12 M12 L12 XL12"
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
              validateField={(value, formApi) => {
                // required, min, max already checked!

                const onlyLettersError = /^[a-zA-Z]+$/i.test(value)
                  ? undefined
                  : "Nur Buchstaben!";

                return onlyLettersError;
              }}
              onFieldSubmit={(value, formApi) => {
                // field is valid! -> focus next field
                void formApi.focusField("lastName");
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
              validateField={async (value, formApi) => {
                // required, min, max already checked!

                // async validation
                new Promise((r) => setTimeout(r, 1000));
                // all good
                return undefined;
              }}
              onFieldSubmit={(value, formApi) => {
                // field is valid! -> submit form
                void formApi.submit();
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
        <Form labelSpan="S12 M12 L12 XL12" layout="S12 M12 L12 XL12">
          <FormItem
            labelContent={
              <Label showColon required>
                Password
              </Label>
            }
          >
            <TextInputField
              name="password"
              required
              minLength={1}
              maxLength={10}
              validateField={(value, formApi) => {
                // required, min, max already checked!
                return undefined;
              }}
              onFieldSubmit={(value, formApi) => {
                // field is valid! -> focus next field
                void formApi.focusField("passwordRepeat");
              }}
            />
          </FormItem>
          <FormItem
            labelContent={
              <Label showColon required>
                passwordRepeat
              </Label>
            }
          >
            <TextInputField
              name="passwordRepeat"
              required
              minLength={1}
              maxLength={10}
              validateForFields={["password"]}
              validateField={async (value, formApi) => {
                const otherValues = formApi.getValues();

                if (otherValues.password && value !== otherValues.password) {
                  return "Passwords don't match!";
                }
                // all good
                return undefined;
              }}
              onFieldSubmit={(value, formApi) => {
                // field is valid! -> submit form
                void formApi.submit();
              }}
            />
          </FormItem>
        </Form>
      </FormController>
    );
  },
};
