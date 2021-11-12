import { Link } from "react-router-dom"



const Nav = () => {
    return(
        <div>
        	<nav className="nav">
                <section className="nav-logo-text">
                    <Link className="nav-link" to="/"><img className="nav-logo" src="img/hamster-logo.svg" alt ="a hamster" /> </Link>
                    <Link className="nav-link" to="/"><h1 className="nav-title">HAMSTERWARS</h1> </Link>
                </section> 
                 <section className="nav-links">
                        <Link className="nav-link" to="/"><p className="nav-text">Home</p></Link>
                        <Link className="nav-link" to="/battle"><p className="nav-text">Battle</p></Link>
                        <Link className="nav-link" to="/gallery"><p className="nav-text">Gallery</p></Link>
                </section>

			</nav>

        </div>
    )
}


export default Nav