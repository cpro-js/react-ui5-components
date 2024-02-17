import { act, fireEvent, screen } from "@testing-library/react";
import { RefObject, createRef } from "react";

import { renderWithDefine } from "../../test/util/render";
import { TextInputField } from "../field/TextInputField";
import { FormRef, PartialFormValues } from "../field/types";
import { FormController } from "./FormController";

interface TestForm {
  input1: string;
  input2: string;
}

describe("ref", () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  test("provides access to form", async () => {
    const onSubmit = jest.fn();
    const ref: RefObject<FormRef<TestForm>> = createRef();

    expect(ref.current).toBeNil();

    await act(async () => {
      await renderWithDefine(
        <FormController<TestForm> ref={ref} onSubmit={onSubmit}>
          <TextInputField name={"input1"} data-testid={"input1"} />
          <TextInputField name={"input2"} />
        </FormController>
      );
    });

    expect(ref.current).not.toBeNil();
    expect(ref.current!.isValid).toBeBoolean();
    expect(ref.current!.values).toBeObject();
    expect(ref.current!.clear).toBeFunction();
    expect(ref.current!.submit).toBeFunction();
    expect(ref.current!.reset).toBeFunction();
    expect(ref.current!.setErrors).toBeFunction();
    expect(ref.current!.setValues).toBeFunction();
  });

  describe(".values", () => {
    test("initial rendering - without initial values", async () => {
      const onSubmit = jest.fn();
      const ref: RefObject<FormRef<TestForm>> = createRef();
      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm> ref={ref} onSubmit={onSubmit}>
            <TextInputField name="input1" data-testid="input1" />
            <TextInputField name="input2" data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.values).toMatchObject({
        input1: undefined,
        input2: undefined,
      });
    });

    test("initial rendering - with initial values", async () => {
      const onSubmit = jest.fn();
      const ref: RefObject<FormRef<TestForm>> = createRef();
      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm>
            ref={ref}
            initialValues={{ input1: "Value1", input2: "Value2" }}
            onSubmit={onSubmit}
          >
            <TextInputField name="input1" data-testid="input1" />
            <TextInputField name="input2" data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.values).toMatchObject({
        input1: "Value1",
        input2: "Value2",
      });
    });

    test("matches values of onChange", async () => {
      const ref: RefObject<FormRef<any>> = createRef();
      const valueState = {
        onChangeValues: {},
        refValues: {},
      };
      const onSubmit = jest.fn();
      const onChange = jest
        .fn()
        .mockImplementation((values: PartialFormValues<any>) => {
          valueState.onChangeValues = { ...values };
          valueState.refValues = { ...ref.current!.values };
        });

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm>
            ref={ref}
            onSubmit={onSubmit}
            onChange={onChange}
          >
            <TextInputField name={"input1"} data-testid={"input1"} />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();

      fireEvent.change(screen.getByTestId("input1"), {
        target: {
          value: "Value11",
        },
      });

      expect(onChange).toHaveBeenCalledOnce();

      expect(valueState.onChangeValues).toMatchObject({
        input1: "Value11",
      });

      expect(valueState.refValues).toMatchObject(valueState.onChangeValues);
    });
  });

  describe(".isValid", () => {
    test("initial rendering - should be valid when non-required", async () => {
      const ref: RefObject<FormRef<TestForm>> = createRef();
      const onSubmit = jest.fn();

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm> ref={ref} onSubmit={onSubmit}>
            <TextInputField name="input1" data-testid="input1" />
            <TextInputField name="input2" data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.isValid).toBeTrue();
    });

    test("initial rendering - should be valid when complete", async () => {
      const ref: RefObject<FormRef<TestForm>> = createRef();
      const onSubmit = jest.fn();

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm>
            ref={ref}
            initialValues={{ input1: "Value1", input2: "Value2" }}
            onSubmit={onSubmit}
          >
            <TextInputField name="input1" required data-testid="input1" />
            <TextInputField name="input2" required data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.isValid).toBeTrue();
    });

    test("initial rendering - should be invalid when required initial values are missing", async () => {
      const ref: RefObject<FormRef<TestForm>> = createRef();
      const onSubmit = jest.fn();

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm> ref={ref} onSubmit={onSubmit}>
            <TextInputField name="input1" required data-testid="input1" />
            <TextInputField name="input2" required data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.isValid).toBeFalse();
    });

    test("initial rendering - should be invalid when required initial values are incomplete", async () => {
      const ref: RefObject<FormRef<TestForm>> = createRef();
      const onSubmit = jest.fn();

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm>
            ref={ref}
            initialValues={{ input1: "Value1", input2: undefined }}
            onSubmit={onSubmit}
          >
            <TextInputField name="input1" required data-testid="input1" />
            <TextInputField name="input2" required data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.isValid).toBeFalse();
    });

    test("should switch from invalid to valid", async () => {
      const ref: RefObject<FormRef<TestForm>> = createRef();
      const onSubmit = jest.fn();

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm>
            ref={ref}
            initialValues={{ input1: "Value1" }}
            onSubmit={onSubmit}
          >
            <TextInputField name="input1" required data-testid="input1" />
            <TextInputField name="input2" required data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.isValid).toBeFalse();

      await act(async ( ) => {
        fireEvent.change(screen.getByTestId("input2"), {
          target: {
            value: "Value2",
          },
        });
        fireEvent.blur(screen.getByTestId("input2"));

        ref.current!.submit();
      });


      expect(ref.current!.isValid).toBeTrue();
    });
  });

  describe(".validate()", () => {

    test("should switch from invalid to valid", async () => {
      const ref: RefObject<FormRef<TestForm>> = createRef();
      const onSubmit = jest.fn();

      await act(async () => {
        await renderWithDefine(
          <FormController<TestForm>
            ref={ref}
            initialValues={{ input1: "Value1" }}
            onSubmit={onSubmit}
          >
            <TextInputField name="input1" required data-testid="input1" />
            <TextInputField name="input2" required data-testid="input2" />
          </FormController>
        );
      });

      expect(ref.current).not.toBeNil();
      expect(ref.current!.isValid).toBeFalse();
      await act(async () => {
        expect(await ref.current!.validate()).toBeFalse();
      });


      await act(async ( ) => {
        fireEvent.change(screen.getByTestId("input2"), {
          target: {
            value: "Value2",
          },
        });
        fireEvent.blur(screen.getByTestId("input2"));
      });

      expect(ref.current!.isValid).toBeTrue();

      await act(async () => {
        expect(await ref.current!.validate()).toBeTrue();
      });
    });
  });


});
