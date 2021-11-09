import { Link } from "react-router-dom"



const Nav = () => {
    return(
        <div>
        	<nav className="nav">
                <img className="nav-logo" src="img/hamster-logo.svg" alt ="a hamster" />
				<Link className="nav-link" to="/"><p className="nav-text">Home</p></Link>
				<Link className="nav-link" to="/battle"><p className="nav-text">Battle</p></Link>
				<Link className="nav-link" to="/gallery"><p className="nav-text">Gallery</p></Link>
                {/* <button className="nav-button">something</button> */}

			</nav>

        </div>
    )
}


export default Nav