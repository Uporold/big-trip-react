import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  useDestinations,
  useFormBlockedStatus,
  useFormErrorStatus,
  useOffers,
} from "../redux/data/hooks/selectors";
import { useCreatePoint } from "../redux/data/hooks/useCreatePoint";
import { useUpdatePoint } from "../redux/data/hooks/useUpdatePoint";
import { useChangePointFavoriteStatus } from "../redux/data/hooks/useChangePointFavoriteStatus";
import { useMode } from "../redux/app/hooks/selectors";
import { useSetMode } from "../redux/app/hooks/useSetMode";
import { useSetActivePointId } from "../redux/app/hooks/useSetActivePointId";
import { useDeletePoint } from "../redux/data/hooks/useDeletePoint";
import {
  DestinationInterface,
  Offer,
  PointBackend,
  PointInterface,
} from "../types";
import { ensure } from "../utils/common";
import { Mode } from "../const";

const useEditForm = (point: PointInterface) => {
  const allDestinations = useDestinations();
  const allOffers = useOffers();
  const cities = allDestinations.map((destination) => destination.name);

  const createPoint = useCreatePoint();
  const updatePoint = useUpdatePoint();

  const [currentType, setType] = useState(point.type);
  const [currentCity, setCity] = useState(point.destination.name);
  const [stateOffers, setOffers] = useState(point.offers);
  const [currentPrice, setPrice] = useState(point.basePrice);

  const changePointFavoriteStatus = useChangePointFavoriteStatus();

  const mode = useMode();
  const setMode = useSetMode();

  const setActivePointId = useSetActivePointId();
  const deletePoint = useDeletePoint();

  const isFormBlocked = useFormBlockedStatus();
  const isFormError = useFormErrorStatus();

  const [startDate, setStartDate] = useState(point.startDate);
  const [endDate, setEndDate] = useState(point.endDate);

  useEffect(() => {
    if (currentType !== point.type) {
      setOffers([]);
    }
  }, [currentType, point.type]);

  const handleOfferClick = useCallback(
    (formOffer: Offer) => (_: React.MouseEvent) => {
      if (stateOffers.some((offer) => offer.title === formOffer.title)) {
        setOffers(
          stateOffers.filter((offer) => offer.title !== formOffer.title),
        );
      } else {
        setOffers([
          ...stateOffers,
          { title: formOffer.title, price: formOffer.price },
        ]);
      }
    },
    [stateOffers],
  );

  const handleFavoriteClick = () => {
    changePointFavoriteStatus(point, !point.isFavorite);
  };

  const handleTypeClick = (type: string) => () => {
    setType(type);
  };

  const handleCityChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCity(evt.target.value);
  };

  const selectedTypeOffers = ensure(
    allOffers.find((it) => it.type.toLowerCase() === currentType),
  ).offers;

  const currentDestination = allDestinations.find(
    (it) => it.name === currentCity,
  );

  const parseData: PointBackend = {
    id: point.id || new Date().valueOf().toString(),
    type: currentType,
    destination: currentDestination as DestinationInterface,
    base_price: currentPrice,
    date_from: startDate.toJSON(),
    date_to: endDate.toJSON(),
    offers: stateOffers,
    is_favorite: point.isFavorite,
  };

  const cancelButtonHandler = () => {
    if (mode === Mode.ADDING) {
      setMode(Mode.DEFAULT);
    }
    if (mode === Mode.EDIT) {
      deletePoint(Number(point.id));
    }
  };

  const submitFormHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (mode === Mode.ADDING) {
      createPoint(parseData);
    }
    if (mode === Mode.EDIT) {
      updatePoint(parseData);
    }
  };

  const closeArrowHandler = () => {
    setMode(Mode.DEFAULT);
    setActivePointId(-1);
  };

  const priceHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(+evt.target.value);
  };

  return {
    cities,
    mode,
    stateOffers,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    currentType,
    currentCity,
    currentDestination,
    currentPrice,
    isFormBlocked,
    isFormError,
    priceHandler,
    handleCityChange,
    handleFavoriteClick,
    handleOfferClick,
    handleTypeClick,
    selectedTypeOffers,
    cancelButtonHandler,
    closeArrowHandler,
    submitFormHandler,
  };
};

export default useEditForm;
