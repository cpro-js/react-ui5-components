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
  private errors: Array<UserErrorModel> = [];

  @observable.ref
  private successMessages: Array<string> = [];

  constructor() {
    makeObservable(this);
  }

  @action
  public appendError(error: UserErrorModel) {
    this.errors = [...this.errors, error];
  }

  @action
  public removeFromErrors = (error: UserErrorModel) => {
    this.errors = this.errors.filter((e) => e.message !== error.message);
  };

  public getNextError = () => {
    return this.errors[0];
  };

  @action
  public appendSuccessMessage(successMessage: string) {
    this.successMessages = [...this.successMessages, successMessage];
  }

  public getSuccessMessages = () => {
    return this.successMessages;
  };

  @action
  public removeFromSuccessMessages = (successMessage: string) => {
    this.successMessages = this.successMessages.filter(
      (s) => s !== successMessage
    );
  };
}
