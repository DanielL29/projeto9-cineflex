import { SessionContainer, Buttons, ScheduleCard, Loading } from './SessionStyle'
import PageTitle from '../page-title/PageTitle';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../footer/Footer';
import loading from '../../assets/images/cineflex-loading.gif'

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

    function getFilm() {
        const filmData = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
        filmData.then(res => {
            setDays(res.data.days)
            setFilm(res.data)
        })
    }

    return (
        <SessionContainer>
            <PageTitle title="Selecione o horário" />
            {days.length === 0 ? <Loading><img src={loading} alt="cineflex-loading" /></Loading> : (
                days.map(schedule => {
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
                })
            )}
            <Footer>
                <div className="footer-card">
                    {Object.keys(film).length === 0 ? <img src={loading} alt="cineflex-loading" /> : <img src={film.posterURL} alt="film-footer" />}
                </div>  
                <h2>{film.title}</h2>
            </Footer>
        </SessionContainer>
    )
}