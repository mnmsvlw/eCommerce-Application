export interface ElementParams {
  tag: string;
  attributes?: {
    [index: string]: string | boolean;
  };
  classNames?: string;
  text?: string;
}
