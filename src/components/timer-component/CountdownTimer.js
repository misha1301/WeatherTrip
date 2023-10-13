import React from "react";
import './countdown_timer.css';


const CountdownTimer = ({futureDate}) => {

    const daysRef = React.useRef(null);
    const hoursRef = React.useRef(null);
    const minutesRef = React.useRef(null);
    const secondsRef = React.useRef(null);


    React.useEffect(() => {
        countTime(futureDate);
        let isMounted = true;
        const interval = setInterval(() => {
            countTime(futureDate);
        }, 1000);
        return () => {
            clearInterval(interval);
            isMounted = false;
        }
    }, [futureDate]);

    React.useEffect(() => {
        console.log("rerender timer");
    });

    const countTime = (endDate) => {
        if (endDate) {
            const countDate = new Date(endDate).getTime();
            const nowDate = new Date().getTime();
            const gapDate = countDate - nowDate;

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            const countedDays = Math. floor(gapDate / day);
            const countedHours = Math. floor((gapDate % day) / hour);
            const countedMinutes = Math. floor((gapDate % hour) / minute);
            const countedSeconds = Math. floor((gapDate % minute) / second);


            if(gapDate > 0){
                daysRef.current.innerText = countedDays;
                hoursRef.current.innerText = countedHours;
                minutesRef.current.innerText = countedMinutes;
                secondsRef.current.innerText = countedSeconds;
            }else {
                daysRef.current.innerText = 0;
                hoursRef.current.innerText = 0;
                minutesRef.current.innerText = 0;
                secondsRef.current.innerText = 0;
            }

        }
    }

    return (
        <section className='countdown_timer-section'>
            <div className='timer_days-div'>
                <p ref={daysRef} className='days'>1</p>
                <h4>days</h4>
            </div>
            <div className='timer_hours-div'>
                <p ref={hoursRef} className='hours'>3</p>
                <h4>hours</h4>
            </div>
            <div className='timer_minutes-div'>
                <p ref={minutesRef} className='minutes'>45</p>
                <h4>minutes</h4>
            </div>
            <div className='timer_seconds-div'>
                <p ref={secondsRef} className='seconds'>30</p>
                <h4>seconds</h4>
            </div>
        </section>
    )
}

export default CountdownTimer;