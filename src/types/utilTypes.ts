export interface ElementParams {
  tag: string;
  attributes?: {
    [index: string]: string | boolean | number;
  };
  classNames?: string;
  text?: string;
  children?: ElementParams[];
}
