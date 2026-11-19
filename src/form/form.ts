export type Attributes = Record<string, string | number>;

type Field = {
  readonly name: string;
  readonly value: string;
  readonly attributes: Attributes;
  readonly label?: string;
  readonly labelAttributes: Attributes;
};

export type FormInput =
  | (Field & { readonly type: "text" })
  | (Field & { readonly type: "textarea" })
  | {
      readonly type: "submit";
      readonly value: string;
    };

export type Form = {
  readonly attributes: Attributes;
  readonly inputs: readonly FormInput[];
};
