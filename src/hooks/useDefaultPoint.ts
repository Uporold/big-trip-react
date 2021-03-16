import { PointInterface } from "../types";
import { Mode, typeItemsActivity } from "../const";
import { useActivePointId, useMode } from "../redux/app/hooks/selectors";
import { useSetMode } from "../redux/app/hooks/useSetMode";
import { useSetActivePointId } from "../redux/app/hooks/useSetActivePointId";
import { formatDate } from "../utils/time";

export const useDefaultPoint = (point: PointInterface) => {
  const isTypeActivity = typeItemsActivity.some(
    (it) => point.type === it.toLowerCase(),
  )
    ? `in`
    : `to`;
  const mode = useMode();
  const setMode = useSetMode();
  const setActivePointId = useSetActivePointId();
  const activePointId = useActivePointId();
  const startTime = formatDate(point.startDate);
  const endTime = formatDate(point.endDate);

  const editPointButtonHandler = () => {
    setActivePointId(Number(point.id));
    setMode(Mode.EDIT);
  };

  return {
    isTypeActivity,
    mode,
    activePointId,
    startTime,
    endTime,
    editPointButtonHandler,
  };
};
