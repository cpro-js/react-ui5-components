// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "@ui5/webcomponents-react/jestSetup.js";

import { setGlobalConfig } from "@storybook/testing-react";
// add all jest-extended matchers
import * as matchers from "jest-extended";
import ResizeObserverPolyfill from "resize-observer-polyfill";

import * as globalStorybookConfig from "../.storybook/preview"; // path of your preview.js file

expect.extend(matchers);

setGlobalConfig(globalStorybookConfig);

window.ResizeObserver = ResizeObserverPolyfill;
