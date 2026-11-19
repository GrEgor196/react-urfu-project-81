import { readFileSync } from "node:fs";

import { describe, expect, test } from "vitest";

import HexletCode from "../src/index.js";

const template = {
  name: "rob",
  job: "hexlet",
  gender: "m",
};

const readFixture = (filename: string): string =>
  readFileSync(new URL(`./__fixtures__/${filename}`, import.meta.url), "utf8").trim();

describe("HexletCode.formFor", () => {
  test.each([
    [{}, '<form method="post" action="#"></form>'],
    [{ url: "/users" }, '<form method="post" action="/users"></form>'],
  ])("generates an empty form with options %j", (options, expected) => {
    const form = HexletCode.formFor(template, options, () => {});

    expect(form).toBe(expected);
  });

  test("generates input and textarea fields", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
    });

    expect(form).toBe(readFixture("form-with-fields.html"));
  });

  test("adds custom attributes and overrides default values", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", { class: "user-input" });
      f.input("job", { as: "textarea", rows: 50, cols: 50 });
    });

    expect(form).toBe(readFixture("form-with-custom-attributes.html"));
  });

  test("uses the specified form method", () => {
    const form = HexletCode.formFor(template, { method: "get" }, (f) => {
      f.input("gender");
    });

    expect(form).toBe(
      '<form method="get" action="#"><label for="gender">Gender</label><input name="gender" type="text" value="m"></form>',
    );
  });

  test("customizes label text and attributes", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name", {
        label: "User",
        labelHtml: { class: "form-label", id: "name-label" },
      });
      f.submit("Ok");
    });

    expect(form).toBe(
      '<form method="post" action="#"><label for="name" class="form-label" id="name-label">User</label><input name="name" type="text" value="rob"><input type="submit" value="Ok"></form>',
    );
  });

  test("generates a submit button with the default value", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.input("name");
      f.input("job", { as: "textarea" });
      f.submit();
    });

    expect(form).toBe(readFixture("form-with-submit.html"));
  });

  test("generates a submit button with a custom value", () => {
    const form = HexletCode.formFor(template, {}, (f) => {
      f.submit("Wow");
    });

    expect(form).toBe('<form method="post" action="#"><input type="submit" value="Wow"></form>');
  });

  test("throws an error when a field is missing from the template", () => {
    expect(() =>
      HexletCode.formFor(template, { url: "/users" }, (f) => {
        f.input("age");
      }),
    ).toThrow("Field 'age' does not exist in the template.");
  });
});
