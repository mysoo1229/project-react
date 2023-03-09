import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState([]);
  const getMovie = async() => {
    const movieJson = await(
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovieDetail(movieJson.data.movie);
    setLoading(false);
    console.log(movieDetail);
  }

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {
        loading
        ? <div className="movie-container">
            <div className="movie-contents">
              <div className="movie-loading">loading...</div>
            </div>
          </div>
        : <div
            className="movie-detail"
            style={{backgroundImage:`url(${movieDetail.background_image})`}}>
            <div className="movie-detail-contents">
              <div className="poster">
                <img src={movieDetail.medium_cover_image} alt={`Poster of ${movieDetail.title}`} />
              </div>
              <div className="text">
                <div className="title">{movieDetail.title}</div>
                <div className="subText">
                  <div className="genre">
                    {movieDetail.genres.map((g) => <span key={g}>{g}</span>)}
                  </div>
                  <div className="year">{movieDetail.year}</div>
                </div>
                <div className="">{movieDetail.description_full}</div>
              </div>
            </div>
        </div>
      }
    </div>
  )
}

export default MovieDetail;
