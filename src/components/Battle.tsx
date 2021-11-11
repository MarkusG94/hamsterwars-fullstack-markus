import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";

const Battle = () => {


  const [showStats, setShowStats] = useState<boolean>(true);
  const [randomHamsterOne, setRandomHamsterOne] = useState<Hamster | null>(null);
  const [randomHamsterTwo, setRandomHamsterTwo] = useState<Hamster | null>(null);
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState<Hamster | null>(null);

 

    
async function getRandomHamsters() {
  const response = await fetch("/hamsters/random")
  const hamsterOne = await response.json();
  setRandomHamsterOne(hamsterOne);

  const responseTwo = await fetch("/hamsters/random")
  const hamsterTwo = await responseTwo.json();
  setRandomHamsterTwo(hamsterTwo);
}

  useEffect(() => {
    getRandomHamsters();

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

  function resetGame() { 
    getRandomHamsters()
    setShowStats(true)
  }
  
  
  return (
    
    <div className="battle-container">
     
      <h1 className="battle-text">Vote for the cutest hamster</h1>

      {showStats ? ( 
      <section className="challengers">
        
        {randomHamsterOne ? (
          
          <div className="challenger-card">
            <h3>{randomHamsterOne.name}</h3>
            <img className="challenger-img" src={randomHamsterOne.imgName.includes('http') ? randomHamsterOne.imgName : `img/${randomHamsterOne.imgName}` } alt="A hamster" />
            {/* <p> wins = {randomHamsterOne.wins}</p>
            <p> defeats = {randomHamsterOne.defeats}</p>
            <p> games = {randomHamsterOne.games}</p> */}
            
              <br />
            <button onClick={(randomHamsterOne && randomHamsterTwo)? () => voteWinner(randomHamsterOne, randomHamsterTwo): undefined}>Vote</button>
          </div>
        ) : (
          "Loading first hamster....."
        )}

        <h1 className="battle-text">VS</h1>

        {randomHamsterTwo ? (
          <div className="challenger-card">
            <h3>{randomHamsterTwo.name}</h3>
            <img className="challenger-img" src={randomHamsterTwo.imgName.includes('http') ? randomHamsterTwo.imgName : `img/${randomHamsterTwo.imgName}` } alt="A hamster" />
            {/* <p> wins = {randomHamsterTwo.wins}</p>
            <p> defeats = {randomHamsterTwo.defeats}</p>
            <p> games = {randomHamsterTwo.games}</p> */}
              <br />
            <button onClick={(randomHamsterOne && randomHamsterTwo)? () => voteWinner(randomHamsterTwo, randomHamsterOne): undefined}>Vote</button>
          </div>
        ) : (
          "Loading second hamster....."
        )}

      </section>
      ) : <section className="show-winner">
              
            {winner? 
            <section>
              
            <div className="challenger-card">
            <h1>THE WINNER IS</h1>
            <h2>{winner.name}</h2>
     

            <br />
            <img className="challenger-img" src={winner.imgName.includes('http') ? winner.imgName : `img/${winner.imgName}`} alt="A hamster" />
            <br />
            <button onClick={() => resetGame()}>next game</button>
           
            </div>
            </section>
            : 
            null} 
            
            {/* {loser?
           <div>loser is {loser.name}</div>
           
           
           : null} */}
     <div>
      
    </div>
      </section>
      }
 
    </div>
  );
};


export default Battle;
