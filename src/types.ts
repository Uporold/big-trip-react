export interface Point {
  id: string;
  type: string;
  destination: Destination;
  basePrice: number;
  startDate: Date;
  endDate: Date;
  offers: Array<Offer>;
  isFavorite: boolean;
}

export interface PointBackend {
  id: string;
  type: string;
  destination: Destination;
  ["base_price"]: number;
  ["date_from"]: string;
  ["date_to"]: string;
  offers: Array<Offer>;
  ["is_favorite"]: boolean;
}

export interface Destination {
  description: string;
  name: string;
  pictures:
    | Array<{
        src: string;
        description: string;
      }>
    | Array<never>;
}

export interface OfferWithType {
  type: string;
  offers: Array<Offer> | Array<never>;
}

interface Offer {
  title: string;
  price: number;
}

export interface UniqueDate {
  year: number;
  day: number;
  month: string;
}
