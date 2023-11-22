import {
  action,
  injectable,
  makeObservable,
  observable,
} from "@cpro-js/react-core";

import type { UserErrorModel } from "./NotificationModel";

@injectable()
export class NotificationStore {
  @observable.ref
  private errors: Array<[UserErrorModel, undefined | (() => void)]> = [];

  @observable.ref
  private successMessages: Array<[string, undefined | (() => void)]> = [];

  constructor() {
    makeObservable(this);
  }

  @action
  public appendError(error: UserErrorModel, callback?: () => void) {
    this.errors = [...this.errors, [error, callback]];
  }

  @action
  public removeFromErrors = (error: UserErrorModel) => {
    this.errors = this.errors.filter(([e]) => e.message !== error.message);
  };

  public getNextError = () => {
    return this.errors.length ? this.errors[0] : [undefined, undefined];
  };

  @action
  public appendSuccessMessage(successMessage: string, callback?: () => void) {
    this.successMessages = [
      ...this.successMessages,
      [successMessage, callback],
    ];
  }

  public getNextSuccessMessage = () => {
    return this.successMessages.length
      ? this.successMessages[0]
      : [undefined, undefined];
  };

  @action
  public removeFromSuccessMessages = (successMessage: string) => {
    this.successMessages = this.successMessages.filter(
      ([s]) => s !== successMessage
    );
  };
}
