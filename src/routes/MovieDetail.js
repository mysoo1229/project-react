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
              <div className="detail-poster">
                <img
                  src={movieDetail.medium_cover_image}
                  alt={`Poster of ${movieDetail.title}`}
                  onError={(e) => {
                    e.target.onError = "";
                    e.target.remove();
                  }}/>
              </div>
              <div className="detail-text">
                <h2 className="title">{movieDetail.title}</h2>
                <div className="subText">
                  <div className="genre">
                    {movieDetail.genres.map((g) => <span key={g}>{g}</span>)}
                  </div>
                  <div className="year">{movieDetail.year}</div>
                <div className="rating">
                  <span className="rating-star">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30">
                      <path fill="#4692ff" d="M30.703 10.473h-9.35c-.56.003-1.058-.35-1.237-.877L17.236.879C17.056.353 16.56 0 16 0c-.559 0-1.055.353-1.236.879l-2.88 8.717c-.18.527-.677.88-1.237.877h-9.35c-.556-.012-1.055.337-1.231.86-.177.525.01 1.102.462 1.425l7.588 5.422c.448.317.638.887.467 1.407l-2.892 8.755c-.124.39-.052.817.194 1.145.246.329.636.52 1.048.513.275-.001.542-.09.763-.251l7.535-5.384c.46-.327 1.078-.327 1.538 0l7.535 5.384c.221.162.488.25.763.251.412.007.802-.184 1.048-.513.246-.328.318-.754.194-1.145l-2.892-8.755c-.17-.52.019-1.09.467-1.407l7.588-5.422c.451-.323.639-.9.462-1.424-.176-.524-.675-.873-1.23-.86z"/>
                    </svg>
                  </span>
                  <span className="rating-number">{movieDetail.rating}</span>
                </div>
                </div>
                <div className="description">{movieDetail.description_full}</div>
              </div>
            </div>
        </div>
      }
    </div>
  )
}

export default MovieDetail;
