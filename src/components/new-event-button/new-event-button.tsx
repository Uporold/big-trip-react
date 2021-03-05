import React from "react";
import { useSetMode } from "../../redux/app/hooks/useSetMode";
import { useSetActivePointId } from "../../redux/app/hooks/useSetActivePointId";
import { Mode } from "../../const";
import { useMode } from "../../redux/app/hooks/selectors";

const NewEventButton: React.FC = (): JSX.Element => {
  const setMode = useSetMode();
  const mode = useMode();
  const setActivePointId = useSetActivePointId();
  return (
    <button
      className="trip-main__event-add-btn  btn  btn--big  btn--yellow"
      type="button"
      disabled={mode === Mode.ADDING}
      onClick={() => {
        setActivePointId(-1);
        setMode(Mode.ADDING);
      }}
    >
      New event
    </button>
  );
};

export default NewEventButton;
