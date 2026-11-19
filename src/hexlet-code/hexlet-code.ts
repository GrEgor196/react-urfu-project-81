import FormBuilder from "../form-builder/index.js";
import { Tag } from "../tag/index.js";

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

    return new Tag("form", { action, method }, form.toString()).toString();
  }
}
