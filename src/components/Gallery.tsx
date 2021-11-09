import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";
import GalleryCard from "./GalleryCard";


const Gallery = () => {
    //get all hamsters from the database
    const [hamsters, setHamsters] = useState<Hamster[]>([]);

    async function getHamsters() {
        const response = await fetch("/hamsters");
        const hamsterArray = await response.json();
        setHamsters(hamsterArray);
    }

    useEffect(() => {
      getHamsters();
    }, [])
  
    return (
        <div className="card-container-body">
             {hamsters.map(hamster => 
                <GalleryCard hamsterList={hamster} key={hamster.id}
                />)}
                <button>ADD HAMSTER</button>
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
    //              <a href="#" className="button">Learn More</a>
    //         </div>
            
    //     </div>
    //     ))}
            
    // </div>
    // )