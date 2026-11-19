import type { Attributes, FormInput } from "../form/index.js";

type Template = Record<string, unknown>;

type InputOptions = {
  [name: string]: string | number | Attributes | undefined;
  as?: string;
  label?: string;
  labelHtml?: Attributes;
};

export default class FormBuilder {
  private inputs: readonly FormInput[] = [];

  public constructor(private readonly template: Template) {}

  public input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, label, labelHtml = {}, ...inputAttributes } = options;
    const attributes = inputAttributes as Attributes;
    const value = String(this.template[name]);
    const type = as === "textarea" ? "textarea" : "text";
    const input: FormInput = {
      type,
      name,
      value,
      attributes,
      label,
      labelAttributes: labelHtml,
    };

    this.inputs = [...this.inputs, input];
  }

  public submit(value = "Save"): void {
    const input: FormInput = { type: "submit", value };

    this.inputs = [...this.inputs, input];
  }

  public build(): readonly FormInput[] {
    return [...this.inputs];
  }
}
