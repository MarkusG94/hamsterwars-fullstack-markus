import { Link } from "react-router-dom"



const Nav = () => {
    return(
        <div>
        	<nav className="nav">
                <section className="nav-logo-text">
                <img className="nav-logo" src="img/hamster-logo.svg" alt ="a hamster" />
                <h1 className="nav-title">HAMSTERWARS</h1>
                </section> 
				<Link className="nav-link" to="/"><p className="nav-text">Home</p></Link>
				<Link className="nav-link" to="/battle"><p className="nav-text">Battle</p></Link>
				<Link className="nav-link" to="/gallery"><p className="nav-text">Gallery</p></Link>
                {/* <button className="nav-button">something</button> */}

			</nav>

        </div>
    )
}


export default Nav