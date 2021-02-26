import { Point, PointBackend } from "../../types";

export const pointAdapter = (data: PointBackend): Point => {
  return {
    id: data.id,
    type: data.type,
    destination: data.destination,
    basePrice: data.base_price,
    startDate: new Date(data.date_from),
    endDate: new Date(data.date_to),
    offers: data.offers,
    isFavorite: data.is_favorite,
  };
};
