import AnimalList from './components/animals/AnimalList'
import './App.css';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import BadUrl from './components/BadUrl';

function App() {
	return (
		<div className="app">
		<header>
			<h1> Fullstack app </h1>
			<nav>
				<Link to="/">Startsida</Link>
				<Link to="/">Tävla</Link>
				<Link to="/">Galleri</Link>

			</nav>
		</header>
		<main>
		<Switch>
		<Route path="/" exact> <AnimalList /> </Route>
		<Route path="/"> <BadUrl /> </Route>
	</Switch>
			
		</main>
		</div>
	);
}

export default App;
