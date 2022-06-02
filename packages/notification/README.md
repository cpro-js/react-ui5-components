# @cpro-js/react-ui5-notification

Provides a service to add new success or error messages (NotificationService)
and a simple renderer component (NotificationRenderer),
which takes care of rendering the appropriate user interfaces.

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

First add the `NotificationRenderer` to your app.

```tsx
import { NotificationRenderer } from "@cpro-js/react-ui5-notification";

// add the Renderer to your App.tsx, beside the AppRouter
  <AppRouter />
  <NotificationRenderer />
//...
```

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
