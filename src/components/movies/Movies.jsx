import './Movies.css'
import PageTitle from './../page-title/PageTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Card({ image, id }) {
    return (
        <Link to={`/filme/${id}`}>
            <div className="card">
                <img src={image} alt="film" />
            </div>
        </Link>
    )
}

export default function Movies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies()
    }, [movies])

    async function getMovies() {
        const moviesData = await axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
        setMovies(moviesData.data)
    }

    return (
        <div className="movies">
            <PageTitle title="Selecione o Filme" />
            <div className="available">
                {movies.map(film => {
                    return (
                        <Card key={film.id} image={film.posterURL} id={film.id} />
                    )
                })}
            </div>
        </div>
    )
}