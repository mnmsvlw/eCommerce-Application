export type NavItem = {
  title: string;
  href: string;
};

export interface RangeEvent extends Event {
  detail?: {
    lower: number;
    upper: number;
  };
}
