import { PointInterface, PointBackend } from "../../types";

export const pointAdapter = (data: PointBackend): PointInterface => {
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

export const toRawPoint = (data: PointInterface): PointBackend => {
  return {
    id: data.id,
    type: data.type,
    destination: data.destination,
    base_price: data.basePrice,
    date_from: data.startDate.toDateString(),
    date_to: data.endDate.toDateString(),
    offers: data.offers,
    is_favorite: data.isFavorite,
  };
};
