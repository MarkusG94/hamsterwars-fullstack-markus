import { useState } from "react";
import { Hamster } from "../models/Hamster";
import OverlayStats from "./OverlayStats";

interface HamsterCard {
  hamster: Hamster;
  deleteHamster: any;
  closeStats: any;
}

const GalleryCard = ({ hamster, deleteHamster, closeStats }: HamsterCard) => {

  const [imgSrc] = useState<string>(
    hamster.imgName.includes("http")
      ? hamster.imgName
      : `img/${hamster.imgName}`
  );

  return (
    <div
      className="card"
      key={hamster.id}
      style={{ backgroundImage: `url('${imgSrc}')` }}
    >
      <div className="card-content">
        <h2 className="card-title">{hamster.name}</h2>
        <p className="card-body">
          {hamster.name} är {hamster.age} år gammal och älskar att{" "}
          {hamster.loves}. <br />
          {hamster.name}s favoritmat är {hamster.favFood}
        </p>
        <section className="button-container">
          <div className="button" onClick={() => closeStats()}>
            Statistik
          </div>
          <div
            onClick={() => deleteHamster(hamster.id)}
            className="button-delete"
          >
            Delete
          </div>
        </section>
      </div>
    </div>
  );
};

export default GalleryCard;

