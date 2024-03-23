import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Trip,
  DayForecast,
  AddTripButton,
  HorizontalScroll,
  CountdownTimer,
  CurrentDayForecast,
  AddTripForm,
} from "./components";
import { useEffect, useMemo, useReducer, useRef, useState, memo } from "react";
import useCheckMobileScreen from "./hooks/useCheckScreenWidth";
import { isMobile } from "react-device-detect";
import useTripPeariodPorecast from "./hooks/useTripPeariodPorecast";
import useOneDayForecast from "./hooks/useOneDayForecast";
import useLocalstorage from "./hooks/useLocalStorage";
import useAutoSelectTrip from "./hooks/useAutoSelectTrip";

const MEDIUM_SCREEN = 1035; // width px
const SMALL_SCREEN = 600; // width px

function App() {
  const dispatch = useDispatch();
  const tripList = useSelector((state) => state.trips);

  const [query, setQuery] = useState("");

  const currentTripList = useMemo(() => {
    return tripList
      .filter((item) => {
        return item.country.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => {
        return +new Date(a.startDate) - +new Date(b.startDate);
      });
  }, [tripList, query]);

  const asideRef = useRef(null);
  const [showAddTripForm, setShowAddTripForm] = useState(false);

  const clientScreenWidth = useCheckMobileScreen();
  const [selectedTrip, setSelectedTrip] = useAutoSelectTrip(currentTripList);

  const [dayForecast, error, errorStatus, loading] =
    useOneDayForecast(selectedTrip);
  const [tripForecast, tripForecastError, tripForecastloading] =
    useTripPeariodPorecast(selectedTrip);

  const [trips, setTripsToLocalStorage] = useLocalstorage("trips", []);
  const [selectedTripStorage, setSelectedTripStorage] = useLocalstorage(
    "selectedTrip",
    {}
  );

  useEffect(() => {
    setTripsToLocalStorage(tripList);
  }, [tripList]);

  const deleteTrip = (tripId) => {
    dispatch({ type: "DELETE_TRIP", payload: tripId });
  };

  return (
    <main className="main_app-layout">
      <section
        className={`${
          isMobile || clientScreenWidth <= MEDIUM_SCREEN
            ? " main_app-section main_app-section-mobile"
            : "main_app-section main_app-section-desktop"
        }`}
      >
        <header>
          <h1>
            Weather <strong>Forecast</strong>
          </h1>
          <div className="main_header_wrapper">
            <Search placeholder={"Search trip"} setState={setQuery} />
            {(isMobile || clientScreenWidth <= SMALL_SCREEN) && (
              <AddTripButton
                id="add_trip-button-mobile"
                onClick={() => setShowAddTripForm(true)}
              />
            )}
          </div>
        </header>
        <div className="country_scroll-list">
          <HorizontalScroll>
            {useMemo(
              () =>
                tripList.length !== 0 &&
                currentTripList.map((trip, index) => (
                  <Trip
                    cancelDisabled={tripList.length === 0}
                    key={index}
                    id={trip?.id}
                    tripKey={index}
                    imgUrl={trip?.imgUrl}
                    country={trip?.country}
                    startDate={trip?.startDate}
                    endDate={trip?.endDate}
                    selectedTripId={selectedTrip.id}
                    setSelectedTrip={(tripObject) => {
                      setSelectedTrip(() => {
                        return { ...tripObject };
                      });
                    }}
                    onCancelTrip={(tripId) => {
                      deleteTrip(tripId);
                    }}
                  />
                )),
              [currentTripList, selectedTrip]
            )}
          </HorizontalScroll>
          {!isMobile && clientScreenWidth > SMALL_SCREEN && (
            <div className="country_scroll-list-btn">
              <AddTripButton onClick={() => setShowAddTripForm(true)} />
            </div>
          )}
        </div>
        {(isMobile || clientScreenWidth <= MEDIUM_SCREEN) && (
          <aside ref={asideRef} className="main_app_aside-mobile">
            <CurrentDayForecast
              ifLoading={loading}
              ifErrorByLoading={error}
              day={dayForecast?.datetime}
              icon={dayForecast?.icon}
              temp={dayForecast?.temp}
              cityName={selectedTrip?.country}
            />

            <CountdownTimer futureDate={selectedTrip?.startDate} />
          </aside>
        )}
        {!tripForecastError && (
          <div className="weather_scroll-list">
            <h2>Week</h2>
            <HorizontalScroll disableArrow={false}>
              {tripList.length !== 0 &&
                tripForecast.map((day, index) => (
                  <DayForecast
                    key={index}
                    day={day?.datetime}
                    tempMin={day?.tempmin}
                    tempMax={day?.tempmax}
                    iconName={day?.icon}
                  />
                ))}
            </HorizontalScroll>
          </div>
        )}
      </section>
      {!isMobile && clientScreenWidth > MEDIUM_SCREEN && (
        <aside ref={asideRef} className="main_app_aside">
          <CurrentDayForecast
            ifLoading={loading}
            ifErrorByLoading={error}
            errorStatus={errorStatus}
            day={dayForecast?.datetime}
            icon={dayForecast?.icon}
            temp={dayForecast?.temp}
            cityName={selectedTrip?.country}
          />
          <CountdownTimer futureDate={selectedTrip?.startDate} />
        </aside>
      )}
      <AddTripForm
        open={showAddTripForm}
        onClose={() => setShowAddTripForm(false)}
        onSubmit={(newTrip) => {
          dispatch({
            type: "ADD_TRIP",
            payload: {
              id: tripList[tripList.length - 1]?.id + 1 || 1,
              ...newTrip,
            },
          });
          setShowAddTripForm(() => false);
        }}
      />
    </main>
  );
}

export default App;
