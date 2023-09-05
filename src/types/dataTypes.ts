export type NavItem = {
  title: string;
  href: string;
};

export interface RangeEventParams {
  lower: number;
  upper: number;
}

export interface RangeEvent extends Event {
  detail?: RangeEventParams;
}
