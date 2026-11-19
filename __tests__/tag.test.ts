import { describe, expect, test } from "vitest";

import { Tag } from "../src/tag/index.js";

type TagCase = [description: string, tag: Tag, expected: string];

const tagCases: TagCase[] = [
  ["single tag without attributes", new Tag("br"), "<br>"],
  [
    "single tag with an attribute",
    new Tag("img", { src: "path/to/image" }),
    '<img src="path/to/image">',
  ],
  [
    "single tag with multiple attributes",
    new Tag("input", { type: "submit", value: "Save" }),
    '<input type="submit" value="Save">',
  ],
  ["paired tag with content", new Tag("label", {}, "Email"), "<label>Email</label>"],
  [
    "paired tag with an attribute and content",
    new Tag("label", { for: "email" }, "Email"),
    '<label for="email">Email</label>',
  ],
  ["empty paired tag", new Tag("div"), "<div></div>"],
  [
    "paired tag with numeric attributes",
    new Tag("textarea", { cols: 20, rows: 40 }, "Text"),
    '<textarea cols="20" rows="40">Text</textarea>',
  ],
];

describe("Tag", () => {
  test.each(tagCases)("generates a %s", (_description, tag, expected) => {
    expect(tag.toString()).toBe(expected);
  });
});
