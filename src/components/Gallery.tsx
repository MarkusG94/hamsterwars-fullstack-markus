import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";
import Overlay from "./Overlay";
import GalleryCard from "./GalleryCard";
import { filterHamsters } from "./helperFunctions";



const Gallery = () => {
    //get all hamsters from the database
    const [hamsters, setHamsters] = useState<Hamster[]>([]);
	const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(false) 
	// const [showStats, setShowStats] = useState<boolean>(false)  // ändra till false när vi testat klart
    const [searchString, setSearchstring] = useState<string>('');




    const filteredHamsters: Hamster[] = filterHamsters(hamsters, searchString)



    async function getHamsters() {
        const response = await fetch("/hamsters");
        const hamsterArray = await response.json();
        setHamsters(hamsterArray);
    }

    const showOverlay = () => {
        setShowAddHamsterOverlay(true);
    }

    // const showStatsOverlay = () => {
    //     setShowStats(true);
    // }

    useEffect(() => {
      getHamsters();
    }, [])
  
    const deleteHamster = async (id: string) => {
        await fetch(`/hamsters/${id}`, {
            method: "DELETE",
        });
        getHamsters()
    }

    const addHamster = () => {
        getHamsters()
    }


    let addHamsterOverlay = null
	if( showAddHamsterOverlay ) {
		const closeOverlay = () => setShowAddHamsterOverlay(false)
		addHamsterOverlay = <Overlay close={closeOverlay} addHamster={addHamster} />
		// JSX översätts till funktionsanrop: _jsx('h1', 'content')
	}
    // let addStatsOverlay = null
   
    // if(showStats) {
    //     const closeStatsOverlay = () => setShowStats(false)
    //     addStatsOverlay = <OverlayStats close={closeStatsOverlay} />
    // }



    return (
        <>
            {addHamsterOverlay}
            {/* {addStatsOverlay} */}
            <header className="gallery-header">
            <h1>Gallery</h1>
            <input type="text"
            className="search-hamster"
			value={searchString}
			onChange={event => setSearchstring(event.target.value)}
            placeholder='🔍 Search hamster' 
			/>
            <button className="custom-btn btn-11" onClick={showOverlay}>ADD HAMSTER</button>
            </header>
        <div className="card-container-body">
            
             {filteredHamsters.map(hamster => 
                <GalleryCard hamster={hamster} key={hamster.id} deleteHamster={deleteHamster} 
                />)}
                
            </div>
        </>

    )
}





export default Gallery



    //     <div className="card-container-body">
    //         {hamsters.map(hamster => (
    //     <div className="card" key={hamster.id} style={{ backgroundImage:`url('img/${hamster.imgName}')` }}>
    //         <div className="card-content">
    //             <h2 className="card-title">{hamster.name}</h2>
    //             <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    //             Explicabo minima</p>
    //              <a  className="button">Learn More</a>
    //         </div>
            
    //     </div>
    //     ))}
            
    // </div>
    // )