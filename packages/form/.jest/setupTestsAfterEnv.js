// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "construct-style-sheets-polyfill";

import { setProjectAnnotations } from "@storybook/react";
import ResizeObserverPolyfill from "resize-observer-polyfill";

import globalStorybookConfig from "../.storybook/preview";

setProjectAnnotations(globalStorybookConfig);

window.ResizeObserver = ResizeObserverPolyfill;

jest.useFakeTimers().setSystemTime(new Date("2022-01-02T13:30:36.000Z"));
