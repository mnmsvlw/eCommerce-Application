export interface ElementParams {
  tag: string;
  attributes?: {
    [index: string]: string;
  };
  classNames?: string;
  text?: string;
}
