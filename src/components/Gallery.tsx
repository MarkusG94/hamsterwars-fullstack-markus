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
            
        <div className="card-container-body">
            {hamsters.map(hamster => (
        <div className="card" key={hamster.id} style={{ backgroundImage:`url('img/${hamster.imgName}')` }}>
            <div className="card-content">
                <h2 className="card-title">{hamster.name}</h2>
                <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Explicabo minima</p>
                 <a href="#" className="button">Learn More</a>
            </div>
            
        </div>
        ))}
            
    </div>

    
    )}





export default Gallery