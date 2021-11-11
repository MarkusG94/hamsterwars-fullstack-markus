

interface OverlayStatsProps {

    close: () => void;
}


const OverlayStats = ({close}:OverlayStatsProps) => {

    return(
        <div className="overlayy">
            <div className="dialogg">
           <h2>Stats</h2>
       
        
     
          
           <button onClick={() => close()}>Close</button>
           </div>
        </div>
    )

}


export default OverlayStats;