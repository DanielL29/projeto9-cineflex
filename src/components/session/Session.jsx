import { SessionContainer, Buttons, ScheduleCard } from './SessionStyle'
import PageTitle from '../page-title/PageTitle';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';

function Schedule({ weekDay, date, children }) {
    return (
        <ScheduleCard>
            <h1>{weekDay} - {date}</h1>
            <Buttons>
                {children}
            </Buttons>
        </ScheduleCard>
    )
}

export default function Session({ setPreviousPath }) {
    const { id } = useParams()
    const [days, setDays] = useState([])
    const [film, setFilm] = useState({})

    useEffect(() => {
        getFilm()
        setPreviousPath("/")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getFilm() {
        const filmData = await axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
        setDays(filmData.data.days)
        setFilm(filmData.data)
    }

    return (
        <SessionContainer>
            <PageTitle title="Selecione o horário" />
            {days.map(schedule => {
                return (
                    <Schedule key={schedule.id} weekDay={schedule.weekday} date={schedule.date}>
                        {schedule.showtimes.map(hour => {
                            return (
                                <Link key={hour.id} to={`/assentos/${hour.id}`} onClick={() => setPreviousPath(`/sessoes/${id}`)}>
                                    <button>{hour.name}</button>
                                </Link>
                            )
                        })}
                    </Schedule>
                )
            })}
            <Footer>
                <div className="footer-card">
                    <img src={film.posterURL} alt="film-footer" />
                </div>
                <h2>{film.title}</h2>
            </Footer>
        </SessionContainer>
    )
}