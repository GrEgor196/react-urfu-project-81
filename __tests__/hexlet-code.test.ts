import { describe, expect, test } from "vitest";

import HexletCode from "../src/index.js";

const template = {
  name: "rob",
  job: "hexlet",
  gender: "m",
};

describe("HexletCode.formFor", () => {
  test.each([
    [{}, '<form action="#" method="post"></form>'],
    [{ url: "/users" }, '<form action="/users" method="post"></form>'],
  ])("generates an empty form with options %j", (options, expected) => {
    const form = HexletCode.formFor(template, options, () => {});

    expect(form).toBe(expected);
  });
});
