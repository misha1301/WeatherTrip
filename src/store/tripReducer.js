import { defaultTripsList } from "./defaultData";

const getLocalStorageData = () => {
  const localStrorageTrips = JSON.parse(localStorage.getItem("trips"));
  if (localStrorageTrips === null || localStrorageTrips === "" || localStrorageTrips.length === 0)
    return defaultTripsList.slice(0, 3);
  return localStrorageTrips;
};

const defaultState = {
  trips: getLocalStorageData(),
};

const ActionType = {
  addTrip: "ADD_TRIP",
  deleteTrip: "DELETE_TRIP",
};

export const tripReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionType.addTrip:
      return { ...state, trips: [...state.trips, action.payload] };
    case ActionType.deleteTrip:
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    default:
      return state;
  }
};
