import { Hamster } from "../models/Hamster";


interface OverlayStatsProps {
    hamster: Hamster;
    close: () => void;
    
}


const OverlayStats = ({close, hamster}:OverlayStatsProps) => {
    

    return(
        <div className="statsOverlay">
            <div className="showStats">
           <h2>{hamster.name}</h2>
           <p>Wins: {hamster.wins}</p>
           <p>Defeats: {hamster.defeats}</p>
           <p>Games: {hamster.games}</p>
           <button className="custom-btn btn-2" onClick={() => close()}>Close</button>
           </div>
        </div>
    )

}


export default OverlayStats;