import FormBuilder from "../form-builder/index.js";
import type { Form } from "../form/index.js";
import renderForm from "../form-renderer/index.js";

type Template = Record<string, unknown>;

type FormOptions = {
  url?: string;
  method?: string;
};

type FormCallback = (form: FormBuilder) => void;

export default class HexletCode {
  public static formFor(template: Template, options: FormOptions, callback: FormCallback): string {
    const action = options.url ?? "#";
    const method = options.method ?? "post";
    const form = new FormBuilder(template);

    callback(form);

    const representation: Form = {
      attributes: { action, method },
      inputs: form.build(),
    };

    return renderForm(representation);
  }
}
