import './App.css';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import BadUrl from './components/BadUrl';
import Battle from './components/Battle';
import Gallery from './components/Gallery';
import StartPage from './components/StartPage';


function App() {
	return (
		<div className="app">
		<header>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/battle">Battle</Link>
				<Link to="/gallery">Gallery</Link>

			</nav>
		</header>
		<main>

		<Switch>
		<Route path="/" exact> <StartPage /> </Route>
		<Route path="/battle"> <Battle /> </Route>
		<Route path="/gallery"> <Gallery /> </Route>

		<Route path="/"> <BadUrl /> </Route>
	</Switch>

			
		</main>
		</div>
	);
}

export default App;
