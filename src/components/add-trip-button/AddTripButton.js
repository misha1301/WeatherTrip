import React from "react";
import './add_trip_button.css'

const AddTripButton = ({...props}) => {

    return (
        <button id="add_trip-button" {...props}>
            <p>+</p>
            <p>Add trip</p>
        </button>
    );
}
export default AddTripButton;