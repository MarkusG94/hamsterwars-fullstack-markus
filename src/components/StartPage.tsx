import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";

const StartPage = () => {

    const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>( null);
    
    const getCutestHamster = async () => {
        const response = await fetch("/hamsters/cutest");
        const hamsters = await response.json();
        setCutestHamster(hamsters);
    }

    useEffect(() => {
        getCutestHamster();
    }, []);

    return(
        <div className="start-page">
            <h1>Welcome to Hamster Wars</h1>

           
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