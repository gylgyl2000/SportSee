import React, { useEffect, useState } from 'react'

const Count = ({ number }) => {
    // label of counter
    // number to increment to
    // duration of count in seconds
    // const { number } = props.data

    // number displayed by component
    const [count, setCount] = useState("0")

    useEffect(() => {
        let start = 0;
        // first three numbers from props
        // const end = parseInt(data.substring(0,3))
        const end = parseInt(number.toString().substring(0,3))
        // if zero, return
        if (start === end) return;

        // find duration per increment
        let totalMilSecDur = parseInt(2);
        let incrementTime = (totalMilSecDur / end) * 1000;

        // timer increments start counter 
        // then updates count
        // ends if start reaches end
        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + number.toString().substring(3))
            // setCount(String(start))
            if (start === end) clearInterval(timer)       
        }, incrementTime);

        // dependency array
    }, [number]);

    return (
        <span>{count}</span>
    )
}

export default Count