import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    // Your solution starts here
    function factorial(n){
        if(n<1 || n>170){
            return "Meh";
        }
        if(n == 1){
            return 1;
        }
        return n*factorial(n-1);
    }
    const expensiveValue = useMemo(()=>{
        const fac =  factorial(input);
        return fac;
    },[input]); 
    // Your solution ends here

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => {
                    setInput(Number(e.target.value));
                }
                } 
            />
            <p>Calculated Value: <b>{expensiveValue}</b></p>
        </div>
    );
}