import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";

const StartPage = () => {

    const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>( null);
    
    const getCutestHamster = async () => {
        const response = await fetch("/hamsters/cutest");
        const hamsters = await response.json();

        if(hamsters && hamsters.length > 1) {
            setCutestHamster([hamsters[Math.floor(Math.random() * hamsters.length)]]); 
    } else if (hamsters && hamsters.length === 1) {
        setCutestHamster([hamsters[0]]);
    }
    
}
console.log();


    useEffect(() => {
        getCutestHamster();
    }, []);

    return(

        <div className="start-page">
             <div className="test-content">
                <h1 className="test-title">Hamster Wars</h1>
             </div>

           
        {cutestHamster
        ? cutestHamster.map(hamster => (
            <div className="cutest-hamster-card" key={hamster.id}>
                
                <img src={`img/${hamster.imgName}`} alt={hamster.name} />
                <h2>{hamster.name}</h2>
                <p>{hamster.wins}</p>
            </div>
        ))
    : "Waiting for the cutest hamster...."}
      
        
        </div>
    )
} 

export default StartPage