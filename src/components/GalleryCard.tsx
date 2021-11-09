
import { Hamster } from "../models/Hamster"

interface HamsterCard {
    hamsterList: Hamster;
}


const GalleryCard = ({hamsterList}: HamsterCard ) => {
   

    return(

    <div className="card" key={hamsterList.id}  style={{ backgroundImage:`url('img/${hamsterList.imgName}')` }}>
        <div className="card-content">
            <h2 className="card-title">{hamsterList.name}</h2>
            <p className="card-body">{hamsterList.name} är {hamsterList.age} år gammal och älskar att {hamsterList.loves}. <br/>
            {hamsterList.name}s favoritmat är {hamsterList.favFood}
            </p>
             <a href="#" className="button">Statistik</a>
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