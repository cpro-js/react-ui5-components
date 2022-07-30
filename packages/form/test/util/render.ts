import { RenderResult, render } from "@testing-library/react";
import { ReactElement } from "react";

export const renderWithDefine = async (
  ui: ReactElement
): Promise<RenderResult> => {
  const result = render(ui);

  const allCustomElementNames = Array.from(
    new Set(
      Array.from(result.container.querySelectorAll("*")).map((element) =>
        element.nodeName.toLowerCase()
      )
    )
  )
    // Filter by which ones are registered
    .filter((nodeName) => !!customElements.get(nodeName));

  await Promise.all(
    allCustomElementNames.map((tag) => customElements.whenDefined(tag))
  );
  return result;
};
