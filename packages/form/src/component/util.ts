import { useDebounceCallback } from "@react-hook/debounce";
import {
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useCallback,
  useRef,
} from "react";

export const triggerSubmitOnEnter = (event: KeyboardEvent<HTMLElement>) => {
  if (event.key !== "Enter" || !(event.target instanceof Element)) {
    return;
  }

  // delay dispatch to avoid race conditions between storing new value in onChange and submitting form state in onSubmit
  setTimeout(() => {
    triggerSubmit(event);
  }, 1);
};

export const getForm = (
  event: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>,
  form?: string
): HTMLFormElement | null => {
  let formElement: HTMLFormElement | null = null;
  if (form != null) {
    formElement = document.getElementById(form) as HTMLFormElement | null;
  } else if (event.target instanceof Element) {
    formElement = event.target.closest("form");
  }
  return formElement;
};

export const triggerSubmit = (
  event: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>,
  form?: string
) => {
  const formElement = getForm(event, form);

  if (formElement != null) {
    const submitEvent = new SubmitEvent("submit", {
      bubbles: true,
      cancelable: true,
      submitter: event.target as HTMLElement,
    });

    formElement.dispatchEvent(submitEvent);

    if (!submitEvent.defaultPrevented) {
      formElement.submit();
    }
  }
};

export const triggerReset = (
  event: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>,
  form?: string
) => {
  const formElement = getForm(event, form);

  if (formElement != null) {
    formElement.reset();
  }
};

export const useAllowAction = (
  initialValue: boolean
): [RefObject<boolean>, (enabled: boolean) => void] => {
  const allowActionRef = useRef<boolean>(initialValue);
  const setAllowActionImmediate = useCallback((allowEnter: boolean) => {
    allowActionRef.current = allowEnter;
  }, []);
  const setAllowActionDebounced = useDebounceCallback(
    setAllowActionImmediate,
    50
  );
  const setAllowAction = useCallback(
    (allowEnter: boolean) => {
      if (allowEnter) {
        setAllowActionDebounced(true);
      } else {
        setAllowActionImmediate(false);
      }
    },
    [setAllowActionImmediate, setAllowActionDebounced]
  );

  return [allowActionRef, setAllowAction];
};
