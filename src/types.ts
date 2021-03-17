export interface PointInterface {
  id: string;
  type: string;
  destination: DestinationInterface;
  basePrice: number;
  startDate: Date;
  endDate: Date;
  offers: Array<Offer>;
  isFavorite: boolean;
}

export interface PointBackend {
  id: string;
  type: string;
  destination: DestinationInterface;
  ["base_price"]: number;
  ["date_from"]: string;
  ["date_to"]: string;
  offers: Array<Offer>;
  ["is_favorite"]: boolean;
}

export interface DestinationInterface {
  description: string;
  name: string;
  pictures: Picture[] | Array<never>;
}

export interface OfferWithType {
  type: string;
  offers: Array<Offer> | Array<never>;
}

export interface Picture {
  src: string;
  description: string;
}

export interface Offer {
  title: string;
  price: number;
}

export interface UniqueDate {
  year: number;
  day: number;
  month: string;
}

export type SortingType = `event` | `time` | `price`;
export type FilterType = `everything` | `future` | `past` | `favorites`;
