import { Tag, type TagAttributes } from "../tag/index.js";

type Template = Record<string, unknown>;

type InputOptions = TagAttributes & {
  as?: string;
};

export default class FormBuilder {
  private readonly fields: string[] = [];

  public constructor(private readonly template: Template) {}

  public input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, ...attributes } = options;
    const value = String(this.template[name]);

    if (as === "textarea") {
      this.fields.push(
        new Tag("textarea", { cols: 20, rows: 40, name, ...attributes }, value).toString(),
      );
      return;
    }

    this.fields.push(
      new Tag("input", {
        name,
        type: "text",
        value,
        ...attributes,
      }).toString(),
    );
  }

  public toString(): string {
    return this.fields.join("");
  }
}
