import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = () => {
    let [flag, setFlag] = useState(true);
    let [hour, setHour] = useState(0);
    let [minute, setMinute] = useState(0);
    let [second, setSecond] = useState(0);
    let [time, setTime] = useState(0);

    let id;

    const divider = () => {
        if (flag && time > 0) {
            const totalMinutes = time; 
            setHour(Math.floor(totalMinutes / 60));
            setMinute(totalMinutes % 60);
            setSecond(0); 
            setTime(0);
            setFlag(false); 
        } else {
            clearInterval(id);
            setFlag(true); 
        }
    };

    useEffect(() => {
        if (!flag) {
            id = setInterval(() => {
                if (second > 0) {
                    setSecond(second-1);
                } else if (minute > 0) {
                    setSecond(59);
                    setMinute(minute-1);
                } else if (hour > 0) {
                    setSecond(59);
                    setMinute(59);
                    setHour(hour-1);
                } else {
                    clearInterval(id);
                    setFlag(true);
                }
            }, 1000);
        }

        return () => clearInterval(id); 
    }, [flag, hour, minute, second]);

    return (
        <div className='timer-container'>
            <input
                type="number"
                placeholder="Enter time in minutes"
                onChange={(e) => setTime(Number(e.target.value))}
                disabled={!flag} 
                className='time-input'
            />

            <h1 className='timer-display'>
                {hour}:{minute}:{second}
            </h1>

            <button  className='timer-button' onClick={divider}>{flag ? 'Start' : 'Stop'}</button>
        </div>
    );
};

export default Timer;
