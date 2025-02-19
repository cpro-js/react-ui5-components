import { Meta, StoryObj } from "@storybook/react";
import { Form, FormItem, Label } from "@ui5/webcomponents-react";
import { useEventCallback } from "usehooks-ts";

import { Button } from "../component/Button";
import { FormBusyIndicator } from "../field/FormBusyIndicator";
import { TextInputField } from "../field/TextInputField";
import {
  FormChangeHandler,
  FormSubmitHandler,
  InitialFormValues,
} from "../field/types";
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

      return new Promise((r) => setTimeout(r, 3000));
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
        <FormBusyIndicator style={{ display: "block" }}>
          <Form
            style={{ width: "100%" }}
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
                  event.detail.valid && event.detail.form.focus("lastName");
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
                  event.detail.valid && event.detail.form.submit();
                }}
              />
            </FormItem>
          </Form>
        </FormBusyIndicator>
      </FormController>
    );
  },
};

export const CustomValidationForm: Story = {
  render: () => {
    return (
      <FormController<PersonForm>
        onSubmit={useEventCallback(async (values, formApi) => {
          // triggers only when valid
          console.log("submit", values);

          await new Promise((r) => setTimeout(r, 3000));

          formApi.setErrors([{ name: "firstName", message: "Backend Error" }], {
            shouldFocus: true,
          });
        })}
      >
        <FormBusyIndicator style={{ display: "block" }}>
          <Form
            style={{ width: "100%" }}
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
              <FormBusyIndicator<PersonForm>
                name="firstName"
                delay={100}
                style={{ display: "block" }}
              >
                <TextInputField<PersonForm, "firstName">
                  style={{ width: "100%" }}
                  name="firstName"
                  required
                  minLength={1}
                  maxLength={10}
                  validate={async (value, values) => {
                    console.log("validate firstname", value);
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
                    event.detail.valid && event.detail.form.focus("lastName");
                  }}
                />
              </FormBusyIndicator>
            </FormItem>
            <FormItem
              labelContent={
                <Label showColon required>
                  lastName
                </Label>
              }
            >
              <FormBusyIndicator<PersonForm>
                name="lastName"
                delay={100}
                style={{ display: "block" }}
              >
                <TextInputField<PersonForm, "lastName">
                  style={{ width: "100%" }}
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
                      event.target.name,
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
                    event.detail.valid && event.detail.form.submit();
                  }}
                />
              </FormBusyIndicator>
            </FormItem>
          </Form>
        </FormBusyIndicator>

        <Button type="submit">Submit</Button>
        <Button type="reset">Reset</Button>
      </FormController>
    );
  },
};

export const AsyncInitialValuesPersonForm: Story = {
  render: () => {
    const onSubmit: FormSubmitHandler<PersonForm> = async (values, formApi) => {
      // triggers only when valid

      await new Promise((r) => setTimeout(r, 1000));
    };

    const onChange: FormChangeHandler<PersonForm> = (
      values,
      actions,
      changedField
    ) => {
      // triggers maybe with invalid values
    };

    const fetchValues: InitialFormValues<PersonForm> = async () => {
      await new Promise((r) => setTimeout(r, 1000));
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
        <FormBusyIndicator style={{ display: "block" }}>
          <Form
            style={{ width: "100%" }}
            headerText={"Async Initial Values"}
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
                onSubmit={useEventCallback((event) => {
                  event.detail.valid && event.detail.form.focus("lastName");
                })}
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
                onSubmit={useEventCallback((event) => {
                  event.detail.valid && event.detail.form.submit();
                })}
              />
            </FormItem>
          </Form>
        </FormBusyIndicator>
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
      <FormController<SetPasswordForm>
        onSubmit={useEventCallback(async (values, formApi) => {
          // triggers only when valid
          console.log("submit", values);

          await new Promise((r) => setTimeout(r, 3000));
        })}
      >
        <FormBusyIndicator style={{ display: "block" }}>
          <Form
            style={{ width: "100%" }}
            headerText={"Dependent validation"}
            labelSpan="S12 M12 L12 XL12"
            layout="S1 M1 L1 XL1"
          >
            <FormItem
              labelContent={
                <Label showColon required>
                  Password
                </Label>
              }
            >
              <FormBusyIndicator<SetPasswordForm>
                name="password"
                delay={100}
                style={{ display: "block" }}
              >
                <TextInputField<SetPasswordForm, "password">
                  style={{ width: "100%" }}
                  name="password"
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
                      event.detail.form.focus("passwordRepeat");
                  }}
                />
              </FormBusyIndicator>
            </FormItem>
            <FormItem
              labelContent={
                <Label showColon required>
                  PasswordRepeat
                </Label>
              }
            >
              <FormBusyIndicator<SetPasswordForm>
                name="passwordRepeat"
                delay={100}
                style={{ display: "block" }}
              >
                <TextInputField<SetPasswordForm, "passwordRepeat">
                  style={{ width: "100%" }}
                  name="passwordRepeat"
                  required
                  minLength={1}
                  maxLength={10}
                  dependsOn={["password"]}
                  validate={{
                    passwordMustMatch: async (value, values) => {
                      await new Promise((r) => setTimeout(r, 1000));

                      if (values.password && value !== values.password) {
                        return "Passwords don't match!";
                      }
                      // all good
                      return undefined;
                    },
                  }}
                  onChange={(event) => {
                    console.log(
                      "change",
                      event.target.name,
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
                    event.detail.valid && event.detail.form.submit();
                  }}
                />
              </FormBusyIndicator>
            </FormItem>
          </Form>
        </FormBusyIndicator>
      </FormController>
    );
  },
};
