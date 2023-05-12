import React, { useEffect, useState } from 'react';
import './RowPost.css';
import Youtube from 'react-youtube';
import { API_KEY } from '../../constants/constants';
import { imageURL } from '../../constants/constants'
import axios from '../axios';

function RowPost(props) {
  const [movies, setMovies] = useState([]); //for showing movies in a Row
  const [urlId, seturlId] = useState(''); //for getting URL for showing youtube trailer

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    })

    return () => {
    }
  }, );

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovieTrailer = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if(response.data.results!==0){
        seturlId(response.data.results[0])

      }else{
        console.log('Array Empty');
      }
    })
  }

  return (
    <div>
      <h2 className='row'>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) =>
          <img onClick={()=> handleMovieTrailer(obj.id)} className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageURL+obj.backdrop_path}`} alt="poster" />
        )}
      </div>
      <div className='youtube'>
        {urlId && <Youtube opts={opts} videoId={urlId.key}  />}
      </div>
    </div>

  )
}

export default RowPost