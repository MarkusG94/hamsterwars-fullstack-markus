import './App.css';
import BadUrl from './components/BadUrl';
import Battle from './components/Battle';
import Gallery from './components/Gallery';
import StartPage from './components/StartPage';
import Nav from './components/Nav';
import { Switch, Route  } from 'react-router-dom';


function App() {
	return (
		<div className="app">
			<Nav /> 
		<main className="app-main">

		<Switch>
			<Route path="/" exact> <StartPage /> </Route>
			<Route path="/battle"> <Battle /> </Route>
			<Route path="/gallery"> <Gallery /> </Route>

			<Route path="*"> <BadUrl /> </Route>
		</Switch>

			
		</main>
		
		</div>
	);
}

export default App;
