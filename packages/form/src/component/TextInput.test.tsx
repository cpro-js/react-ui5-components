import { composeStories } from "@storybook/testing-react";
import { RenderResult, render } from "@testing-library/react";
import { ReactElement } from "react";

import * as stories from "./TextInput.stories";

const { Standard, Prefilled } = composeStories(stories);

const renderWithDefine = async (
  ui: ReactElement,
  elements: string[]
): Promise<RenderResult> => {
  const result = render(ui);
  await Promise.all(elements.map((tag) => customElements.whenDefined(tag)));
  return result;
};

test("renders standard textinput", async () => {
  const result = await renderWithDefine(<Standard {...Standard.args} />, [
    "ui5-input",
  ]);

  const element = result.container.firstChild as HTMLInputElement;

  expect(element).not.toBeNull();
  expect(element.value).toBe("");
});

test("renders prefilled textinput", async () => {
  const result = await renderWithDefine(<Prefilled {...Prefilled.args} />, [
    "ui5-input",
  ]);

  const element = result.container.firstChild as HTMLInputElement;

  expect(element).not.toBeNull();
  expect(element.value).toBe(Prefilled.args?.value);
});
