import { Link } from "react-router-dom"



const Nav = () => {
    return(
        <div>
        	<nav>
				<Link to="/">Home</Link>
				<Link to="/battle">Battle</Link>
				<Link to="/gallery">Gallery</Link>

			</nav>

        </div>
    )
}


export default Nav