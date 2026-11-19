import type { Attributes, FormInput } from "../form/index.js";

type Template = Record<string, unknown>;

type InputOptions = Attributes & {
  as?: string;
};

export default class FormBuilder {
  private inputs: readonly FormInput[] = [];

  public constructor(private readonly template: Template) {}

  public input(name: string, options: InputOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, ...attributes } = options;
    const value = String(this.template[name]);
    const type = as === "textarea" ? "textarea" : "text";
    const input: FormInput = { type, name, value, attributes };

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
