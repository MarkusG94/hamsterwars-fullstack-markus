import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";

const Battle = () => {


  const [showStats, setShowStats] = useState<boolean>(true);
  const [randomHamsterOne, setRandomHamsterOne] = useState<Hamster | null>(null);
  const [randomHamsterTwo, setRandomHamsterTwo] = useState<Hamster | null>(null);
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState<Hamster | null>(null);

    
  useEffect(() => {
    async function getRandomHamsterOne() {
      const response = await fetch("/hamsters/random");
      const hamsterOne = await response.json();
      setRandomHamsterOne(hamsterOne);
    }
  
  
    async function getRandomHamsterTwo() {
      const response = await fetch("/hamsters/random");
      const hamsterTwo = await response.json();
      setRandomHamsterTwo(hamsterTwo);
    }
    getRandomHamsterOne();              
    getRandomHamsterTwo();
  }, []);



  async function voteWinner(winner: Hamster, loser: Hamster) {

    await fetch('/matches', {
      method: 'POST',
      body: JSON.stringify({ winnerId: winner.id, loserId: loser.id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })


    await fetch(`/hamsters/${winner.id}`, {
      method: 'PUT',
      body: JSON.stringify({wins: winner.wins + 1, games: winner.games + 1}),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
      });

    await fetch(`/hamsters/${loser.id}`, {
      method: 'PUT',
      body: JSON.stringify({defeats: loser.defeats + 1, games: loser.games + 1}),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }

    
    })

    battleResults(winner, loser);
    setShowStats(false);

  };


  
  async function battleResults(winner: Hamster, loser: Hamster) {
    const responseWinner = await fetch(`/hamsters/${winner.id}`);
    const winnerResults = await responseWinner.json();
    setWinner(winnerResults);

    const responseLoser = await fetch(`/hamsters/${loser.id}`);
    const loserResults = await responseLoser.json();
    setLoser(loserResults);
  }

  
  return (
    <div>
      {showStats ? ( 
      <section className="challengers">
        

        {randomHamsterOne ? (
          <div className="challenger-card">
            <h2>{randomHamsterOne.name}</h2>
            <img src={"img/" + randomHamsterOne.imgName} alt="A hamster" />
            <p> wins = {randomHamsterOne.wins}</p>
            <p> defeats = {randomHamsterOne.defeats}</p>
            <p> games = {randomHamsterOne.games}</p>
            

            <button onClick={(randomHamsterOne && randomHamsterTwo)? () => voteWinner(randomHamsterOne, randomHamsterTwo): undefined}>Vote</button>
          </div>
        ) : (
          "Loading first challenger....."
        )}

        {randomHamsterTwo ? (
          <div className="challenger-card">
            <h2>{randomHamsterTwo.name}</h2>
            <img src={"img/" + randomHamsterTwo.imgName} alt="A hamster" />
            <p> wins = {randomHamsterTwo.wins}</p>
            <p> defeats = {randomHamsterTwo.defeats}</p>
            <p> games = {randomHamsterTwo.games}</p>
            <button onClick={(randomHamsterOne && randomHamsterTwo)? () => voteWinner(randomHamsterTwo, randomHamsterOne): undefined}>Vote</button>
          </div>
        ) : (
          "Loading second challenger....."
        )}

      </section>
      ) : <section className="show-winner">
              <h1>THE WINNER IS</h1>
            {winner? 
            <section>
            <div>
            <br />
            <img src={"img/" + winner.imgName} alt="A hamster" />
            <br />
            {winner.name}</div>
             
            </section>
            : 
            null} 
            
            {loser?
           <div>loser is {loser.name}</div>
           
           
           : null}
           <div>
      <button onClick={() => setShowStats(true)}> next game</button>
      </div>
      </section>
      }
 
    </div>
  );
};


export default Battle;
