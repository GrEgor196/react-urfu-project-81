import { Tag } from "../tag/index.js";

type Template = Record<string, unknown>;

type FormOptions = {
  url?: string;
};

type FormCallback = (form: object) => void;

export default class HexletCode {
  public static formFor(
    _template: Template,
    options: FormOptions,
    _callback: FormCallback,
  ): string {
    const action = options.url ?? "#";

    return new Tag("form", { action, method: "post" }).toString();
  }
}
