import React from "react";
import { useSetMode } from "../../redux/app/hooks/useSetMode";
import { useSetActivePointId } from "../../redux/app/hooks/useSetActivePointId";
import { Filter, Mode, SortType } from "../../const";
import { useMode } from "../../redux/app/hooks/selectors";
import { useSetSortType } from "../../redux/app/hooks/useSetSortType";
import { useSetFilterType } from "../../redux/app/hooks/useSetFilterType";

const NewEventButton: React.FC = (): JSX.Element => {
  const setMode = useSetMode();
  const setSortType = useSetSortType();
  const setFilterType = useSetFilterType();
  const mode = useMode();
  const setActivePointId = useSetActivePointId();
  const newEventButtonClickHandler = () => {
    setActivePointId(-1);
    setSortType(SortType.EVENT);
    setFilterType(Filter.EVERYTHING);
    setMode(Mode.ADDING);
  };
  console.log(`btn`);
  return (
    <button
      className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
      disabled={mode === Mode.ADDING}
      onClick={newEventButtonClickHandler}
    >
      New event
    </button>
  );
};

export default NewEventButton;
