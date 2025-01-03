import React, { useEffect, useState } from 'react'

const Timer = () => {

    let [flag, setFlag] = useState(true);
    let [hour,setHour]= useState(0);
    let [minute,setMinute]= useState(0);
    let [second,setSecond]= useState(0);
    let [time,setTime]= useState(0);

    let id;


    const  divider = () => {
        let newTime= time/60;

        setHour(Math.floor(newTime));
        setMinute(time-(Math.floor(newTime)*60)-1);
        setSecond(59);
        setTime(0);
        setFlag(!flag);

        return ()=>{
            clearInterval(id);

        }
    }

    useEffect(()=>{

        id=setInterval((divider)=>{

            if(time>0){
                if(flag){
                    setSecond(second-1);    
                }
                if(second===0){
                    setSecond(59);
                    setMinute(minute-1);
                }
                if(minute===0){
                    setMinute(59);
                    setHour(hour-1);
                }
            }

            if(hour===0 && minute===0 && second===0){
                clearInterval(id);
            }
        },1000);

    },[hour,minute,second]);
    
  return (
    <div>

<input type='number' onChange={(e)=>{setTime(e.target.value)}}/>

<h1>{hour}:{minute}:{second}</h1>

<button onClick={divider}>{flag ? 'Start' : 'Stop'}</button>


    </div>
  )
}

export default Timer