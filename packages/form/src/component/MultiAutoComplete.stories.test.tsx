import { Story } from "@storybook/react";
import { composeStories } from "@storybook/testing-react";

import { renderWithDefine } from "../test/render";
import * as stories from "./MultiAutoComplete.stories";

const testCases = Object.values(composeStories(stories)).map(
  (StoryFn: Story) => [StoryFn.storyName!, StoryFn]
);
// Batch snapshot testing
test.each(testCases)("Renders %s story", async (_storyName, StoryFn) => {
  const tree = await renderWithDefine(<StoryFn />);
  expect(tree.container).toMatchSnapshot();
});
