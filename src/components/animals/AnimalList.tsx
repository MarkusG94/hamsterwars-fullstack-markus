import { useEffect, useState } from 'react'

type Hamsters = any;
const AnimalList = () => {
	const [data, setData] = useState<Hamsters[]>()

	useEffect(() => {
		sendRequest(setData)
	}, [])

	return (
		<div>
		<h2> Hamster list </h2>
		{data
		? data.map(hamster => (
			<div key={hamster.id}>
				<li> {hamster.name} </li>
				<img src={'img/' + hamster.imgName} alt="test"/>
			</div>
			
		))
		: 'Loading hamsters...' }
		</div>
	)
}

async function sendRequest(saveData: any) {
	const response = await fetch('/hamsters')
	const data = await response.json()
	saveData(data)
}

export default AnimalList
