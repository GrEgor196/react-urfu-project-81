import type { Form, FormInput } from "../form/index.js";
import { Tag } from "../tag/index.js";

const capitalize = (value: string): string => `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

const renderLabel = (input: Exclude<FormInput, { type: "submit" }>): string =>
  new Tag(
    "label",
    { for: input.name, ...input.labelAttributes },
    input.label ?? capitalize(input.name),
  ).toString();

const renderInput = (input: FormInput): string => {
  switch (input.type) {
    case "text":
      return `${renderLabel(input)}${new Tag("input", {
        name: input.name,
        type: "text",
        value: input.value,
        ...input.attributes,
      }).toString()}`;
    case "textarea":
      return `${renderLabel(input)}${new Tag(
        "textarea",
        {
          cols: 20,
          rows: 40,
          name: input.name,
          ...input.attributes,
        },
        input.value,
      ).toString()}`;
    case "submit":
      return new Tag("input", { type: "submit", value: input.value }).toString();
  }
};

const renderForm = (form: Form): string => {
  const body = form.inputs.map(renderInput).join("");

  return new Tag("form", form.attributes, body).toString();
};

export default renderForm;
