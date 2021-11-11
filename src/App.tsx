import './App.css';
import BadUrl from './components/BadUrl';
import Battle from './components/Battle';
import Gallery from './components/Gallery';
import StartPage from './components/StartPage';
import Nav from './components/Nav';
import { Link, Switch, Route  } from 'react-router-dom';


function App() {
	return (
		<div className="app">
			
				<nav className="nav">
                <section className="nav-logo-text">
                <img className="nav-logo" src="img/hamster-logo.svg" alt ="a hamster" />
                <h1 className="nav-title">HAMSTERWARS</h1>
                </section> 
                <section className="nav-links">
				<Link className="nav-link" to="/"><p className="nav-text">Home</p></Link>
				<Link className="nav-link" to="/battle"><p className="nav-text">Battle</p></Link>
				<Link className="nav-link" to="/gallery"><p className="nav-text">Gallery</p></Link>
                {/* <button className="nav-button">something</button> */}
                </section>

			</nav>

			{/* <Nav /> */}
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
