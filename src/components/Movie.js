import React from 'react';


const Movie = (props) => {
    return (
        <div className="col s12 m6 l3">
            <div className="card" onClick={()=> props.viewMovieInfo(props.movieId)}>
                <div className="card-image waves-effect waves-block waves-light">
                    {
                        props.image == null ? <img src={`https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg`} alt="card" style={{width: "100%", height: 360}}/> : <img src={`https://image.tmdb.org/t/p/w185${props.image}`} alt="card" style={{width: "100%", height: 360}}/>
                    }
                </div>
                <div className="card-content">
                    <p><a href='/#'onClick = {() => props.viewMovieInfo(props.movieId)} >View details</a></p>
                </div>
            </div>
        </div>
    )
}

export default Movie;