import { useState } from 'react'



interface OverlayProps {
	close: () => void;
	addHamster: () => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {
	const [age, setAge] = useState<number>(0)
	const [name, setName] = useState<string>('')
	const [loves, setLoves] = useState<string>('')
	const [favFood, setFavfood] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')
	const [games, setGames] = useState<number>(0)
	const [wins, setWins] = useState<number>(0)
    const [defeats, setDefeats] = useState<number>(0)

	const [nameTouch, setNameTouch] = useState<boolean>(false)
	const [ageTouch, setAgeTouch] = useState<boolean>(false)
    const [lovesTouch, setLovesTouch] = useState<boolean>(false)
    const [favFoodTouch, setFavFoodTouch] = useState<boolean>(false)
    const [imgNameTouch, setImgNameTouch] = useState<boolean>(false)
   







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

    const nameIsValid = isValidName(name)
    const nameClass = nameIsValid && nameTouch ? 'valid' : nameTouch ?  'invalid' : 'valid' ;
    

    const ageIsValid = isValidAge(age)
    const ageClass = ageIsValid && ageTouch ? 'valid' : ageTouch? 'invalid' : 'valid';

    const lovesIsValid = isValidLoves(loves)
    const lovesClass = lovesIsValid && lovesTouch ? 'valid' : lovesTouch? 'invalid' : 'valid';

    const favFoodIsValid = isValidFavFood(favFood)
    const favFoodClass = favFoodIsValid && favFoodTouch ? 'valid' : favFoodTouch? 'invalid' : 'valid';

    const imgIsValid = isValidImgName(imgName)
    const imgClass = imgIsValid && imgNameTouch ? 'valid' : imgNameTouch ? 'invalid' : 'valid';
    
    const validForm = nameIsValid && ageIsValid && lovesIsValid && favFoodIsValid && imgIsValid

    function isValidName(name: string) {
        return name.length >= 2
    }

    function isValidAge(age: number): boolean {
        if( isNaN(age) ) return false
        if( age <= 0 ) return false
        
        let ageString = String(age)
        if( ageString.includes(',') || ageString.includes('.') ) return false
        return true
    }

    function isValidLoves(loves: string): boolean {
        return loves.length >= 2
    }

    function isValidFavFood(favFood: string): boolean {
        return favFood.length >= 2
    }

    function isValidImgName(imgName: string): boolean {
        return imgName.length >= 2
    }
    
  
 

	return (
		<div className="overlay">
			<div className="addForm">
                <h2>Lägg till Ny hamster</h2>
                <label className="custom-field">
                    <input type="text" required
                    value={name} className={nameClass}
                    onBlur={() => setNameTouch(true)}
                    onChange={e => setName(e.target.value)} />
                    <span className="placeholder">Hamsterns namn</span>
                    <span className={nameClass}>Var vänlig skriv ett annat namn</span>

                </label>

                <label className="custom-field">
                    <input type="number" required
                    value={age} className={ageClass}
                    onBlur={() => setAgeTouch(true)}
                    onChange={e => setAge(Number(e.target.value))} />
                    <span className="placeholder">Ange hamsterns ålder</span>
                    <span className={ageClass}>Åldern skall vara ett heltal större än 0</span>
                </label>

                <label className="custom-field">
                    <input type="text" required
                    value={loves} className={lovesClass}
                    onBlur={() => setLovesTouch(true)}
                    onChange={e => setLoves(e.target.value)} />
                    <span className="placeholder">Hamstern älskar att..</span>
                    <span className={lovesClass}>Skriv minst 2 tecken</span>

                </label>
                <label className="custom-field">
                    <input type="text" required
                    value={favFood} className={favFoodClass}
                    onBlur={() => setFavFoodTouch(true)}
                    onChange={e => setFavfood(e.target.value)} />
                    <span className="placeholder">Hamsterns favoritmat är..</span>
                    <span className={favFoodClass}>Skriv minst 2 tecken</span>

                </label>
                <label className="custom-field">
                    <input type="text" required
                    value={imgName} className={imgClass}
                    onBlur={() => setImgNameTouch(true)}
                    onChange={e => setImgName(e.target.value)} />
                    <span className="placeholder">Länk till en bild på hamstern</span>
                    <span className={imgClass}>Var vänlig skriv en giltlig bildadress</span>

                </label>

                <input type="hidden" placeholder="Antal matcher" value={games} 
                    onChange={e => setGames(Number(e.target.valueAsNumber))} />

                <input type="hidden" placeholder="Antal vinster" value={wins} 
                    onChange={e => setWins(Number(e.target.valueAsNumber))} />

                <input type="hidden" placeholder="Antal förluster" value={defeats} 
                    onChange={e => setDefeats(Number(e.target.valueAsNumber))} />
                

		
		
                <div>
                    <button type="submit" onClick={handleAddHamster} disabled={!validForm}> Add Hamster </button>
                    <button onClick={close}> Cancel </button>
                </div>
			</div>
		</div>
	)
}

export default Overlay