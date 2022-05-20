import { MoviesContainer, Available, CardContainer } from './MoviesStyle.jsx'
import PageTitle from './../page-title/PageTitle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loading from '../../assets/images/cineflex-loading.gif'

function Card({ image, id }) {
    return (
        <Link to={`/sessoes/${id}`}>
            <CardContainer>
                <img src={image} alt="film" />
            </CardContainer>
        </Link>
    )
}

export default function Movies() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies()
    }, [])

    function getMovies() {
        const moviesData = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
        moviesData.then(res => setMovies(res.data))
    }

    return (
        <MoviesContainer>
            <PageTitle title="Selecione o Filme" />
            <Available>
                {movies.length === 0 ? (
                    <img src={loading} alt="cineflex-loading" />
                ) : (
                    movies.map(film => {
                        return (
                            <Card key={film.id} image={film.posterURL} id={film.id} />
                        )
                    })
                )}
            </Available>
        </MoviesContainer>
    )
}