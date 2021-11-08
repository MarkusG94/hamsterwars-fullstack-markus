


const GalleryCard = () => {

    return(
        <div className="card-container-body">
            <div className="card" style={{ backgroundImage: "url('/img/hamster-1.jpg')" }}>
                <div className="card-content">
                    <h2 className="card-title">Something awesome</h2>
                    <p className="card-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Explicabo minima</p>
                     <a href="#" className="button">Learn More</a>
                </div>
            </div>
        </div>
    )


}

export default GalleryCard