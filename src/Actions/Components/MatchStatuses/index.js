import C, { URL_MATCH_STATUSES } from "../../../Constants/";

const addMatchStatuses = statuses => {
  return {
    type: C.ADD_MATCH_STATUSES,
    statuses
  };
};

export const fetchMatchStatuses = () => {
  return function(dispatch) {
    fetch(URL_MATCH_STATUSES)
      .then(
        response => response.json(),
        error => console.log("Не подгрузил матч статусы", error)
      )
      .then(statuses => dispatch(addMatchStatuses(statuses)));
  };
};
