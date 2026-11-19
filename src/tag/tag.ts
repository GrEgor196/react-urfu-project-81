export type TagAttributes = Record<string, string | number>;

const singleTags = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

export default class Tag {
  constructor(
    private readonly name: string,
    private readonly attributes: TagAttributes = {},
    private readonly body = '',
  ) {}

  public toString(): string {
    const attributes = Object.entries(this.attributes)
      .map(([name, value]) => `${name}="${value}"`)
      .join(' ');

    const openingTag = attributes.length > 0
      ? `<${this.name} ${attributes}>`
      : `<${this.name}>`;

    return singleTags.has(this.name)
      ? openingTag
      : `${openingTag}${this.body}</${this.name}>`;
  }
}
