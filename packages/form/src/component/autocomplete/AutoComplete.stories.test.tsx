import { StoryFn } from "@storybook/react";
import { composeStories } from "@storybook/react";

import { renderWithDefine } from "../../test/render";
import * as stories from "./Autocomplete.stories";

const testCases = Object.values(composeStories(stories)).map(
  (StoryFn: StoryFn) => [StoryFn.storyName!, StoryFn]
);
// Batch snapshot testing
test.each(testCases)("Renders %s story", async (_storyName, StoryFn) => {
  const tree = await renderWithDefine(<StoryFn />);
  expect(tree.container).toMatchSnapshot();
});
