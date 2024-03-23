import React, { useMemo } from "react";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { defaultTripsList } from "../../store/defaultData";
import "./add_trip_form.css";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const AddTripForm = ({ open = false, onClose, onSubmit }) => {
  const [showValidation, setShowValidation] = useState(false);
  const [
    selectedCountry,
    setSelectedCountry,
    tripStartDate,
    setTripStartDate,
    tripEndDate,
    setTripEndDate,
    countryErr,
    firstDateErr,
    secondDateErr,
  ] = useFormInput();

  const [
    minFirstDateInput,
    maxFirstDateInput,
    minSecondtDateInput,
    maxSecondtDateInput,
  ] = useMinMaxDateRange(tripStartDate, tripEndDate);

  const cities = useMemo(() => {
    return defaultTripsList.map((trip) => {
      return {
        name: trip.country,
        imgUrl: trip.imgUrl,
      };
    });
  }, [defaultTripsList]);

  const createTrip = (e) => {
    e.preventDefault();

    if (validateForm(countryErr, firstDateErr, secondDateErr)) {
      setShowValidation(true);
      return;
    }

    const newTrip = {
      imgUrl: selectedCountry.imgUrl,
      country: selectedCountry.name,
      startDate: tripStartDate,
      endDate: tripEndDate,
    };

    clearFormFields();

    return onSubmit?.(newTrip);
  };

  const cancelTrip = (e) => {
    e.preventDefault();

    clearFormFields();

    return onClose();
  };

  const clearFormFields = () => {
    setShowValidation(false);
    setSelectedCountry("");
    setTripStartDate("");
    setTripEndDate("");
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="add_trip-blur">
      <form name="add_trip-form" className="add_trip-form">
        <div className="header">
          <p className="form_title">Create trip</p>
          <input onClick={cancelTrip} type="button" value="X" />
        </div>
        <div className="main">
          <div className="content">
            <p>
              <span>*</span>City
            </p>
            <Dropdown
              className={showValidation && countryErr && "p-invalid"}
              onChange={(e) => setSelectedCountry(e.value)}
              value={selectedCountry}
              options={cities}
              optionLabel="name"
              placeholder="Select a City"
            />
          </div>
          <div className="content">
            <p>
              <span>*</span>Start date
            </p>
            <Calendar
              className={showValidation && firstDateErr && "p-invalid"}
              dateFormat="dd/mm/yy"
              onChange={(e) => setTripStartDate(e.value)}
              placeholder="dd/mm/yy"
              minDate={minFirstDateInput}
              maxDate={maxFirstDateInput}
              showIcon
            />
          </div>
          <div className="content">
            <p>
              <span>*</span>End date
            </p>
            <Calendar
              className={showValidation && secondDateErr && "p-invalid"}
              dateFormat="dd/mm/yy"
              onChange={(e) => setTripEndDate(e.value)}
              placeholder="dd/mm/yy"
              minDate={minSecondtDateInput}
              maxDate={maxSecondtDateInput}
              showIcon
            />
            {/* <input placeholder='Select date' type="date" className='add_trip_date-input' /> */}
          </div>
        </div>
        <div className="footer">
          <Button label="Cancel" onClick={cancelTrip} outlined />
          <Button label="Save" onClick={createTrip} />
        </div>
      </form>
    </div>,
    document.getElementById("portal")
  );
};

export default AddTripForm;

const useFormInput = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");

  const [countryErr, setCountryErr] = useState(false);
  const [firstDateErr, setFirstDateErr] = useState(false);
  const [secondDateErr, setSecondDateErr] = useState(false);

  const isEmpty = (state) => {
    if (state === null || state === undefined || state === "") return true;
    return false;
  };

  useEffect(() => {
    if (isEmpty(selectedCountry)) setCountryErr(true);
    else setCountryErr(false);

    if (isEmpty(tripStartDate)) setFirstDateErr(true);
    else setFirstDateErr(false);

    if (isEmpty(tripEndDate)) setSecondDateErr(true);
    else setSecondDateErr(false);
  }, [tripStartDate, tripEndDate, selectedCountry]);

  return [
    selectedCountry,
    setSelectedCountry,
    tripStartDate,
    setTripStartDate,
    tripEndDate,
    setTripEndDate,
    countryErr,
    firstDateErr,
    secondDateErr,
  ];
};

const validateForm = (countryErr, firstDateErr, secondDateErr) => {
  if (countryErr || firstDateErr || secondDateErr) return true;
  return false;
};

const useMinMaxDateRange = (tripStartDate, tripEndDate) => {
  const todaysDate = new Date();
  const fourteenDaysInMilliseconds = 14 * 24 * 60 * 60 * 1000;
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

  const getDate = (daysAheadInMilliseconds) => {
    return new Date(daysAheadInMilliseconds);
  };

  const [minFirstDateInput, setMinFirstDateInput] = useState(todaysDate);
  const [maxFirstDateInput, setMaxFirstDateInput] = useState(
    getDate(todaysDate.getTime() + thirtyDaysInMilliseconds)
  );
  const [minSecondtDateInput, setMinSecondDateInput] = useState(todaysDate);
  const [maxSecondtDateInput, setMaxSecondDateInput] = useState(
    getDate(todaysDate.getTime() + thirtyDaysInMilliseconds)
  );

  useEffect(() => {

    if(tripStartDate === '' && tripEndDate === ''){
      setMinSecondDateInput(todaysDate)
      setMaxSecondDateInput(getDate(todaysDate.getTime() + thirtyDaysInMilliseconds))
      setMinFirstDateInput(todaysDate)
      setMaxFirstDateInput(getDate(todaysDate.getTime() + thirtyDaysInMilliseconds))
    }

    if(tripStartDate !== ''){
      setMinSecondDateInput(tripStartDate)
      setMaxSecondDateInput(getDate(tripStartDate.getTime() + fourteenDaysInMilliseconds))
    }
    if(tripEndDate !== ''){
      setMinFirstDateInput(getDate(tripEndDate.getTime() - fourteenDaysInMilliseconds))
      setMaxFirstDateInput(tripEndDate)
    }

  }, [tripStartDate, tripEndDate]);

  return [
    minFirstDateInput,
    maxFirstDateInput,
    minSecondtDateInput,
    maxSecondtDateInput,
  ];
};
