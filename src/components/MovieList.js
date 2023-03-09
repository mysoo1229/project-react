import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function MovieList({id, image, title, year, summary, rating, genres}) {
  return (
    <li>
      <Link to={`/project-react/movie/${id}`}>
        <div className="image">
          <img
            src={image}
            alt=""
            onError={(e) => {
              e.target.onError = "";
              e.target.remove();
            }} />
          <h3>{title}</h3>
        </div>
        <div className="info">
          <div className="info-genre">
            {genres !== '' ? genres.map((g) => <span key={g}>{g}</span>) : null}
          </div>
          <div className="info-year">{year}</div>
        </div>
        <p className="summary">{summary}</p>
        <div className="rating">
          <span className="rating-star">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30">
              <path fill="#4692ff" d="M30.703 10.473h-9.35c-.56.003-1.058-.35-1.237-.877L17.236.879C17.056.353 16.56 0 16 0c-.559 0-1.055.353-1.236.879l-2.88 8.717c-.18.527-.677.88-1.237.877h-9.35c-.556-.012-1.055.337-1.231.86-.177.525.01 1.102.462 1.425l7.588 5.422c.448.317.638.887.467 1.407l-2.892 8.755c-.124.39-.052.817.194 1.145.246.329.636.52 1.048.513.275-.001.542-.09.763-.251l7.535-5.384c.46-.327 1.078-.327 1.538 0l7.535 5.384c.221.162.488.25.763.251.412.007.802-.184 1.048-.513.246-.328.318-.754.194-1.145l-2.892-8.755c-.17-.52.019-1.09.467-1.407l7.588-5.422c.451-.323.639-.9.462-1.424-.176-.524-.675-.873-1.23-.86z"/>
            </svg>
          </span>
          <span className="rating-number">({rating})</span>
        </div>
      </Link>
    </li>
  );
}

MovieList.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
  year: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
}

export default MovieList;
