# Notification Service

Provides a `NotificationService` to programmatically add new success or error messages
and a simple renderer component (`NotificationRenderer`),
which takes care of rendering these messages.

Success messages are rendered as
[Toast Messages](https://sap.github.io/ui5-webcomponents-react/?path=/story/modals-popovers-toast--default-story).
They automatically disappear after 3 seconds.

Each error message is rendered as
[Message Box](https://sap.github.io/ui5-webcomponents-react/?path=/story/modals-popovers-messagebox--default-story)
and must be acknowledged by the user.

## Installation

```
$ yarn add @cpro-js/react-ui5-notification
```

## Usage

First add the `NotificationRenderer` to your app so that it always gets rendered.

Use the `NotificationService` to show error or success messages.
Inject the service as usual:

```tsx
import { NotificationService } from "@cpro-js/react-ui5-notification";

export const SomeScreen: FC<{}> = () => {
  const { showSuccess, showError } = useInjection(NotificationService);
  const someEventHandler = () => {
    try {
      //...
      showSuccess("Yippie!")
    }
    catch(error: any) {
      showError("Oh no!", error);                       // must be instance of Error
      showError("Oh no!", "my own error message");      // custom error message
      showError("Oh no!", <div>Some complex jsx</div>); // custom complex error message
    }
  }

  // ....
}
```

## Testing

For testing any development of this package:

1. `yarn build`
2. `npm link`
3. open a sample app
4. `npm link @cpro-js/react-ui5-notification`
5. start & test the sample app
6. `npm unlink @cpro-js/react-ui5-notification`
