import { useEffect, useState } from "react";
import { Hamster } from "../models/Hamster";

const Battle = () => {
  const [showStats, setShowStats] = useState<boolean>(true);
  const [randomHamsterOne, setRandomHamsterOne] = useState<Hamster | null>( null );
  const [randomHamsterTwo, setRandomHamsterTwo] = useState<Hamster | null>( null );
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState<Hamster | null>(null);

  async function isSameHamsters() {
    const response = await fetch("/hamsters/random");
    const hamsterOne = await response.json();
    setRandomHamsterOne(hamsterOne);

    const responseTwo = await fetch("/hamsters/random");
    const maybeHamsterTwo = await responseTwo.json();

    let randomHamsterTwo = maybeHamsterTwo;

    if (hamsterOne.id === maybeHamsterTwo.id) {
      const responseTwo = await fetch("hamsters/random");

      const maybehamsterTwo = await responseTwo.json();
      randomHamsterTwo = maybehamsterTwo;
    }
    setRandomHamsterTwo(randomHamsterTwo);
  }

  useEffect(() => {
    isSameHamsters();
  }, []);

  async function voteWinner(winner: Hamster, loser: Hamster) {
    await fetch("/matches", {
      method: "POST",
      body: JSON.stringify({ winnerId: winner.id, loserId: loser.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch(`/hamsters/${winner.id}`, {
      method: "PUT",
      body: JSON.stringify({ wins: winner.wins + 1, games: winner.games + 1 }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    await fetch(`/hamsters/${loser.id}`, {
      method: "PUT",
      body: JSON.stringify({
        defeats: loser.defeats + 1,
        games: loser.games + 1,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    battleResults(winner, loser);
    setShowStats(false);
  }

  async function battleResults(winner: Hamster, loser: Hamster) {
    const responseWinner = await fetch(`/hamsters/${winner.id}`);
    const winnerResults = await responseWinner.json();
    setWinner(winnerResults);

    const responseLoser = await fetch(`/hamsters/${loser.id}`);
    const loserResults = await responseLoser.json();
    setLoser(loserResults);
  }

  function resetGame() {
    // getRandomHamsters()
    isSameHamsters();
    setShowStats(true);
  }

  return (
    <div className="battle-container">
      <h1 className="battle-text">Vote for the cutest hamster</h1>

      {showStats ? (
        <section className="challengers">
          {randomHamsterOne ? (
            <div className="challenger-card">
              <h3>{randomHamsterOne.name}</h3>
              <img
                className="challenger-img"
                src={
                  randomHamsterOne.imgName.includes("http")
                    ? randomHamsterOne.imgName
                    : `img/${randomHamsterOne.imgName}`
                }
                alt="A hamster"
              />
              {/* <p> wins = {randomHamsterOne.wins}</p>
            <p> defeats = {randomHamsterOne.defeats}</p>
            <p> games = {randomHamsterOne.games}</p> */}

              <br />
              <div className="vote-btns">
                <button
                  className="custom-btn btn-3"
                  onClick={
                    randomHamsterOne && randomHamsterTwo
                      ? () => voteWinner(randomHamsterOne, randomHamsterTwo)
                      : undefined
                  }
                >
                  <span>Vote</span>
                </button>
              </div>
            </div>
          ) : (
            "Loading first hamster....."
          )}

          <h1 className="battle-vs">VS</h1>

          {randomHamsterTwo ? (
            <div className="challenger-card">
              <h3>{randomHamsterTwo.name}</h3>
              <img
                className="challenger-img"
                src={
                  randomHamsterTwo.imgName.includes("http")
                    ? randomHamsterTwo.imgName
                    : `img/${randomHamsterTwo.imgName}`
                }
                alt="A hamster"
              />
              {/* <p> wins = {randomHamsterTwo.wins}</p>
            <p> defeats = {randomHamsterTwo.defeats}</p>
            <p> games = {randomHamsterTwo.games}</p> */}
              <br />
              <div className="vote-btns">
                <button
                  className="custom-btn btn-3"
                  onClick={
                    randomHamsterOne && randomHamsterTwo
                      ? () => voteWinner(randomHamsterTwo, randomHamsterOne)
                      : undefined
                  }
                >
                  <span>Vote</span>
                </button>
              </div>
            </div>
          ) : (
            "Loading second hamster....."
          )}
        </section>
      ) : (
        <section className="show-winner">
          {winner ? (
            <section className="show-winner-container">
              <div className="challenger-card">
                {/* <h1>THE WINNER IS</h1>
            <br /> */}
                <figure className="challenger-figure">
                  <img
                    className="challenger-img"
                    src={
                      winner.imgName.includes("http")
                        ? winner.imgName
                        : `img/${winner.imgName}`
                    }
                    alt="A hamster"
                  />
                </figure>

                <article className="winner-info">
                  <h3 className="result-text">
                    The winner is <br /> {winner.name}
                  </h3>
                  <h3>Total wins: {winner.wins}</h3>
                  <h3>Total games: {winner.games}</h3>
                  <h3>Total defeats: {winner.defeats}</h3>
                </article>
              </div>
            </section>
          ) : null}

          {loser ? (
            <section>
              <div className="challenger-card">
                {/* <h1>THE LOSER IS</h1>
            <br /> */}
                <figure className="challenger-figure">
                  <img
                    className="challenger-img"
                    src={
                      loser.imgName.includes("http")
                        ? loser.imgName
                        : `img/${loser.imgName}`
                    }
                    alt="A hamster"
                  />
                </figure>

                <article className="winner-info">
                  <h3 className="result-text">
                    The loser is <br /> {loser.name}
                  </h3>
                  <h3>Total wins: {loser.wins}</h3>
                  <h3>Total games: {loser.games}</h3>
                  <h3>Total defeats: {loser.defeats}</h3>
                </article>
              </div>
            </section>
          ) : null}

          <div></div>
        </section>
      )}
      <div className="next-game-btn">
        <button className="custom-btn btn-1" onClick={() => resetGame()}>
          Next game
        </button>
      </div>
    </div>
  );
};

export default Battle;
