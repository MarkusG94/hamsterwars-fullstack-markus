import { useState } from 'react'



interface OverlayProps {
	close: () => void;
	addHamster: () => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {
	const [age, setAge] = useState<number>()
	const [name, setName] = useState<string>('')
	const [loves, setLoves] = useState<string>('')
	const [favFood, setFavfood] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
	const [games, setGames] = useState<number>(0)
	const [wins, setWins] = useState<number>(0)
	const [defeats, setDefeats] = useState<number>(0)


	const handleAddHamster = async() => {
		// förbered Movie-objekt och anropa addMovie-funktionen
		let addNewHamster = { age: age, name: name, loves: loves, favFood: favFood, imgName: imgName, games: games, wins: wins, defeats: defeats }
        const response = await fetch('/hamsters', {
            method: 'POST',
            body: JSON.stringify(addNewHamster),
            headers: {
                'Content-Type': 'application/json', charset: 'utf-8'
            }
        })
        const data = await response.json()
		addHamster()
		close()
	}

	return (
		<div className="overlay">
			<div className="addForm">
                <h2>Lägg till Ny hamster</h2>
                <section>
                    <input type="text" placeholder="Hamsterns namn"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                </section>

                <section>
                    <input type="number" placeholder="Hamsterns ålder"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))} />
                </section>

                <section>
                    <input type="text" placeholder="Hamstern älskar att..."
                    value={loves}
                    onChange={e => setLoves(e.target.value)} />
                </section>
                <section>
                    <input type="text" placeholder="Hamsterns favoritmat är"
                    value={favFood}
                    onChange={e => setFavfood(e.target.value)} />
                </section>
                <section>
                    <input type="text" placeholder="URL till en bild på hamstern"
                    value={imgName}
                    onChange={e => setImgName(e.target.value)} />
                </section>

                <input type="hidden" placeholder="Antal matcher" value={games} 
                    onChange={e => setGames(Number(e.target.valueAsNumber))} />

                <input type="hidden" placeholder="Antal vinster" value={wins} 
                    onChange={e => setWins(Number(e.target.valueAsNumber))} />

                <input type="hidden" placeholder="Antal förluster" value={defeats} 
                    onChange={e => setDefeats(Number(e.target.valueAsNumber))} />
                

		
		
			<div>
				<button type="submit" onClick={handleAddHamster}> Add Hamster </button>
				<button onClick={close}> Cancel </button>
			</div>
			</div>
		</div>
	)
}

export default Overlay