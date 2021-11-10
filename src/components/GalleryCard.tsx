
import { useState } from "react";
import { Hamster } from "../models/Hamster"

interface HamsterCard {
    hamster: Hamster;
    deleteHamster: any;

    
}


const GalleryCard = ({hamster, deleteHamster}: HamsterCard ) => {
   
    const [ src ] = useState<string>(hamster.imgName.includes('http') ? hamster.imgName : `img/${hamster.imgName}`);

    return(

    <div className="card" key={hamster.id}  style={{ backgroundImage:`url('${src}')` }}>
        <div className="card-content">
            <h2 className="card-title">{hamster.name}</h2>
            <p className="card-body">{hamster.name} är {hamster.age} år gammal och älskar att {hamster.loves}. <br/>
            {hamster.name}s favoritmat är {hamster.favFood}
            </p>
            <section className="button-container">
             <div className="button">Statistik</div>
             <div onClick={() => deleteHamster(hamster.id)} className="button-delete">Delete</div>
             </section>

        </div>
    </div>

    )
}

export default GalleryCard


        // <div className="card-container-body">
        //     <div className="card" key={hamster.id} style={{ backgroundImage:`url('img/${hamster.imgName}')` }}>
        //         <div className="card-content">
        //             <h2 className="card-title">{hamster.name}</h2>
        //             <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        //             Explicabo minima</p>
        //              <a href="#" className="button">Learn More</a>
        //         </div>
        //     </div>
        // </div>