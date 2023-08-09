export interface IElementCreator {
  element: HTMLElement | null;
}

export interface ElementParams {
  tag: string;
  attributes?: {
    [index: string]: string;
  };
  classNames?: string[];
  text?: string;
}
