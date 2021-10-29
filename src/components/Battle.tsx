import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";

const Battle = () => {

  const [randomHamsterOne, setRandomHamsterOne] = useState<Hamster>();
  const [randomHamsterTwo, setRandomHamsterTwo] = useState<Hamster>();

  async function getRandomHamsterOne() {
    const response = await fetch("/hamsters/random");
    const data = await response.json();
    setRandomHamsterOne(data);
  }


  async function getRandomHamsterTwo() {
    const response = await fetch("/hamsters/random");
    const data = await response.json();
    setRandomHamsterTwo(data);
  }
    
  useEffect(() => {
    getRandomHamsterOne();              
    getRandomHamsterTwo();
  }, []);


  // console.log('hamster 1 ',  randomHamsterOne)
  // console.log('hamster 2 ',  randomHamsterTwo)

  return (
    <div>
      <section>

        {randomHamsterOne ? (
          <div>
            <h2>{randomHamsterOne.name}</h2>
            <img src={"img/" + randomHamsterOne.imgName} alt="A hamster" />
            <button>Vote</button>
          </div>
        ) : (
          "Loading first challenger....."
        )}

        <br />
            <h1>VS</h1>
        <br />

        {randomHamsterTwo ? (
          <div>
            <h2>{randomHamsterTwo.name}</h2>
            <img src={"img/" + randomHamsterTwo.imgName} alt="A hamster" />
            <button>Vote</button>
          </div>
        ) : (
          "Loading second challenger....."
        )}

      </section>
    </div>
  );
};

export default Battle;
