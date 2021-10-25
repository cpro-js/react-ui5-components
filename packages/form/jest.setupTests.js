// Info: this file will run before the tests in jest.
import { setGlobalConfig } from "@storybook/testing-react";

const globalStorybookConfig = require("./.storybook/preview");

setGlobalConfig(globalStorybookConfig);
