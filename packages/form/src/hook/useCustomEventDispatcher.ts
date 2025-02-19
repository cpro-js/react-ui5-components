import { RefObject, useEffect } from "react";
import { useEventCallback } from "usehooks-ts";

export interface TypedCustomEvent<EventTarget = HTMLElement, Detail = never>
  extends Omit<CustomEvent<Detail>, "target"> {
  readonly target: EventTarget;
}

export interface UseCustomEventDispatcherProps<
  EventTarget extends HTMLElement,
  EventDetails extends Record<string, unknown> | unknown = unknown
> {
  /**
   * Target element ref
   */
  ref: RefObject<HTMLElement | null>;
  /**
   * Custom event name
   */
  name: string;
  /**
   * Callback that should be triggered when the event was dispatched on the target element
   * @param event
   */
  onEvent?: (event: TypedCustomEvent<EventTarget, EventDetails>) => void;
  /**
   * Delays the dispatching of the event by setTimeout
   * Triggers instantly when undefined
   */
  delay?: number;
}

/**
 * Custom hook to simplify the triggering the dispatching of custom events on a specific target element
 *
 * @param options
 */
export const useCustomEventDispatcher = <
  EventTarget extends HTMLElement,
  EventDetails extends Record<string, unknown> | never = never
>(
  options: UseCustomEventDispatcherProps<EventTarget, EventDetails>
): ((
  ...args: [EventDetails] extends [never]
    ? []
    : [EventDetails] extends [Record<string, unknown>]
    ? [EventDetails]
    : []
) => void) => {
  const onHandleEvent = useEventCallback(
    (event: TypedCustomEvent<EventTarget, EventDetails>) => {
      options.onEvent?.(event);
    }
  );

  const dispatchEvent = useEventCallback(
    (
      ...args: [EventDetails] extends [never]
        ? []
        : [EventDetails] extends [Record<string, unknown>]
        ? [EventDetails]
        : []
    ) => {
      const event = new CustomEvent(options.name, {
        detail: args.length > 0 ? args[0] : undefined,
        bubbles: true,
        cancelable: false,
      });

      if (options.delay != null) {
        setTimeout(
          () => options.ref.current?.dispatchEvent(event),
          options.delay
        );
      } else {
        options.ref.current?.dispatchEvent(event);
      }
    }
  );

  useEffect(() => {
    const element = options.ref;

    element.current?.addEventListener(
      options.name,
      onHandleEvent as EventListener
    );

    return () => {
      element.current?.removeEventListener(
        options.name,
        onHandleEvent as EventListener
      );
    };
  }, [options.name, options.ref.current]);

  return dispatchEvent;
};
