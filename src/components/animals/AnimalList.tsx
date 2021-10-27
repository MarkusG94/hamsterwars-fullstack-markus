import { useEffect, useState } from 'react'

type Animal = string;
const AnimalList = () => {
	const [data, setData] = useState<Animal[] | null>(null)

	useEffect(() => {
		sendRequest(setData)
	}, [])

	return (
		<div>
		<h2> Animal list </h2>
		{data
		? data.map(animal => (
			<li> {animal} </li>
		))
		: 'Loading animals...' }
		</div>
	)
}

async function sendRequest(saveData: any) {
	const response = await fetch('/animals')
	const data = await response.json()
	saveData(data)
}

export default AnimalList
