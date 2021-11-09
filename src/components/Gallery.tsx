import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";
import Overlay from "./addHamster/Overlay";
import GalleryCard from "./GalleryCard";


const Gallery = () => {
    //get all hamsters from the database
    const [hamsters, setHamsters] = useState<Hamster[]>([]);
	const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(true)  // ändra till false när vi testat klart


    async function getHamsters() {
        const response = await fetch("/hamsters");
        const hamsterArray = await response.json();
        setHamsters(hamsterArray);
    }

    const showOverlay = () => {
        setShowAddHamsterOverlay(true);
    }

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


    return (
        <div>
            {addHamsterOverlay}
            <button className="button" onClick={showOverlay}>ADD HAMSTER</button>
        <div className="card-container-body">
            
             {hamsters.map(hamster => 
                <GalleryCard hamster={hamster} key={hamster.id} deleteHamster={deleteHamster}
                />)}
                
            </div>
        </div>

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