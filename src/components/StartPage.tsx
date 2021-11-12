import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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



    useEffect(() => {
        getCutestHamster();
    }, []);

    return(

        <div className="start-page">
             <div className="test-content">
                <h1 className="test-title"> Welcome to Hamster Wars</h1>
                <p className="test-p"> <br />This game is very simple. <br/> 
                Go to the <Link className="start-link" to="/battle">BATTLE</Link> page and click on the hamster you think is the cutest one. Thats it!<br/>
                Also, if you want to check out all our hamsters or if you want to add one yourself, you can visit the <Link className="start-link" to="/gallery">GALLERY</Link> .
                
                 </p>
             </div>

           
        {cutestHamster
        ? cutestHamster.map(hamster => (
            <div className="cutest-hamster-card" key={hamster.id}>
                <div className="cutest-card">
                <h3>The currently cutest hamster is:</h3>
                <img className="cutest-img" src={hamster.imgName.includes('http') ? hamster.imgName : `img/${hamster.imgName}` } alt={hamster.name} />
                <h1>{hamster.name}</h1>
                </div>
            </div>
        ))
    : "Waiting for the cutest hamster...."}
      
        
        </div>
    )
} 

export default StartPage