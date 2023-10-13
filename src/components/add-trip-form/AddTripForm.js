import React from "react";
import ReactDOM from "react-dom";
import './add_trip_form.css';

const AddTripForm = ({open= false, onClose }) => {
    if(!open) return null;

    return ReactDOM.createPortal (
        <div className='add_trip-blur'>
            <form name='add_trip-form' className='add_trip-form'>
                <div className="header">
                    <p className='form_title'>Create trip</p>
                    <input onClick={onClose} type='button' value='X'/>
                </div>
                <div className="main">
                    <div className="content">
                        <p><span>*</span>City</p>
                        <select className='add_trip_city-select'>
                            <option value="" disabled selected>Select the city</option>
                            <option> Germany
                            </option>
                            <option>Ukraine</option>
                        </select>
                    </div>
                    <div className="content">
                        <p><span>*</span>City</p>
                        <input placeholder='Select date' className='add_trip_date-input' type='date'/>
                    </div>
                    <div className="content">
                        <p><span>*</span>City</p>
                        <input placeholder='Select date' type="date" className='add_trip_date-input' />
                    </div>
                </div>
                <div className="footer">
                    <input onClick={onClose} type='button' name='cansel' value='Cancel'/>
                    <input type='submit' name='save' value='Save'/>
                </div>
            </form>
        </div>,
        document.getElementById("portal")
    );
}

export default AddTripForm;