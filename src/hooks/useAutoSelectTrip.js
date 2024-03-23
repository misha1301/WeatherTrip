import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useAutoSelectTrip = (tripsArray) => {
  const [selectedTrip, setSelectedTrip] = useLocalStorage("selectedTrip", {});

  useEffect(() => {
    if(tripsArray.length !== 0){
    if(Object.keys(selectedTrip).length === 0){
      setSelectedTrip(tripsArray.at(0))
    }else if(tripsArray.filter( trip => trip?.id == selectedTrip.id).length === 0)
      setSelectedTrip(tripsArray.at(0))
    } else setSelectedTrip({})
  }, [tripsArray]);

  return [selectedTrip, setSelectedTrip];
}

export default useAutoSelectTrip;