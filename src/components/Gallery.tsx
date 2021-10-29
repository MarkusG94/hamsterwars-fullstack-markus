import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";


const Gallery = () => {
    //get all hamsters from the database
    const [hamsters, setHamsters] = useState<Hamster[]>([]);
    useEffect(() => {
        fetch('/hamsters')
            .then(res => res.json())
            .then(hamsters => setHamsters(hamsters))
    }, []);
    
    return (
        <div className="gallery">
            <h1>Gallery</h1>
            <div className="gallery-container">
                {hamsters.map(hamster => (
                    <div className="gallery-item" key={hamster.id}>
                        <img src={'img/' + hamster.imgName} alt={hamster.name} />
                        <div className="gallery-item-info">
                            <h3>{hamster.name}</h3>
                            <p>Loves: {hamster.loves}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default Gallery