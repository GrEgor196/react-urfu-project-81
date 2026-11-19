import { Tag, type TagAttributes } from "../tag/index.js";

type Template = Record<string, unknown>;

type InputOptions = TagAttributes & {
  as?: string;
};

export default class FormBuilder {
  private readonly fields: Tag[] = [];

  public constructor(private readonly template: Template) {}

  public input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, ...attributes } = options;
    const value = String(this.template[name]);
    const label = new Tag("label", { for: name }, this.capitalize(name));

    if (as === "textarea") {
      this.fields.push(
        label,
        new Tag("textarea", { cols: 20, rows: 40, name, ...attributes }, value),
      );
      return;
    }

    this.fields.push(
      label,
      new Tag("input", {
        name,
        type: "text",
        value,
        ...attributes,
      }),
    );
  }

  public submit(value = "Save"): void {
    this.fields.push(new Tag("input", { type: "submit", value }));
  }

  public toString(): string {
    return this.fields.map((field) => field.toString()).join("");
  }

  private capitalize(value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }
}
