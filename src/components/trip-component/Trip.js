import React from 'react';
import './trip.css';
import Moment from "moment/moment";

const Trip = ({id, tripKey, imgUrl, country, startDate, endDate, setSelectedTrip, onCancelTrip, cancelDisabled, selectedTripId}) => {

    const tripRef = React.useRef(null);

    React.useEffect(()=>{
        console.log("trip render");
        console.log(selectedTripId, id);
        tripRef.current.checked = selectedTripId == id;
    },);

    return (
        <article
            onClick={() => {
                // tripRef.current.checked = true;
                setSelectedTrip?.({tripKey, id, country, startDate, endDate});
            }}
            className='trip-article'
        >
            <button type='button' disabled={cancelDisabled}  title={'cancel trip'}
                   onClick={(e) => {
                       e.stopPropagation();
                       onCancelTrip?.(id);
                   }}>x</button>
            <figure className='trip-figure'>
                <img src={imgUrl} alt={'country photo'}/>
            </figure>
            <input
                type='radio'
                value={tripKey}
                ref={tripRef}
                name='country-article'
            />
            <section className='trip-section'>
                <h1>
                    {country}
                </h1>
                <p>
                    {Moment(startDate).format('DD.MM.YYYY')} - {Moment(endDate).format('DD.MM.YYYY')}
                </p>
            </section>
        </article>
    );
}

export default Trip;