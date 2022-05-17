import './Film.css'
import PageTitle from './../page-title/PageTitle';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';

function Schedule({ weekDay, date, children }) {
    return (
        <div className="schedule">
            <h1>{weekDay} - {date}</h1>
            <div className="buttons">
                {children}
            </div>
        </div>
    )
}

export default function Film() {
    const { id } = useParams()
    const [days, setDays] = useState([])
    const [film, setFilm] = useState({})

    useEffect(() => {
        getFilm()
    }, [])

    async function getFilm() {
        const filmData = await axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
        setDays(filmData.data.days)
        setFilm(filmData.data)
    }

    return (
        <div className="film">
            <PageTitle title="Selecione o horário" />
            <div className="sessions">
                {days.map(schedule => {
                    return (
                        <Schedule key={schedule.id} weekDay={schedule.weekday} date={schedule.date}>
                            {schedule.showtimes.map(hour => {
                                return (
                                    <Link to={`/sessao/${hour.id}`}>
                                        <button key={hour.id}>{hour.name}</button>
                                    </Link>
                                )
                            })}
                        </Schedule>
                    )
                })}
            </div>
            <Footer>
                <div className="footer-card">
                    <img src={film.posterURL} alt="film-footer" />
                </div>
                <h2>{film.title}</h2>
            </Footer>
        </div>
    )
}