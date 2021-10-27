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
			<li key={hamster.id}> {hamster.name} </li>
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
