import { RefObject, useEffect } from "react";
import { useEventCallback } from "usehooks-ts";

export interface UseCustomEventDispatcherProps<EventDetails> {
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
  onEvent?: (event: CustomEvent<EventDetails>) => void;
}

/**
 * Custom hook to simplify the triggering the dispatching of custom events on a specific target element
 *
 * @param options
 */
export const useCustomEventDispatcher = <
  EventDetails extends Record<string, unknown> | unknown = unknown
>(
  options: UseCustomEventDispatcherProps<EventDetails>
): ((
  ...args: EventDetails extends Record<string, unknown> ? [EventDetails] : []
) => void) => {
  const onHandleEvent = useEventCallback((event: CustomEvent<EventDetails>) => {
    options.onEvent?.(event);
  });

  const dispatchEvent = useEventCallback(
    (
      ...args: EventDetails extends Record<string, unknown>
        ? [EventDetails]
        : []
    ) => {
      options.ref.current?.dispatchEvent(
        new CustomEvent(options.name, {
          detail: args.length > 0 ? args[0] : undefined,
          bubbles: true,
          cancelable: false,
        })
      );
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
