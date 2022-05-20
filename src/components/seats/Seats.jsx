import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageTitle from '../page-title/PageTitle'
import Seat from '../seat/Seat'
import UserFields from '../user-fields/UserFields'
import { SeatContainer } from '../seat/SeatStyle'
import { SeatsContainer, SeatsSection, Status, UserForm } from './SeatsStyle'
import Footer from '../footer/Footer';
import { sendOrder } from '../../functions/sendOrder'
import loading from '../../assets/images/cineflex-loading.gif'

export default function Seats({ order, setOrder, setPreviousPath }) {
    const { id } = useParams()
    const [seats, setSeats] = useState([])
    const [day, setDay] = useState({})
    const [film, setFilm] = useState({})
    const [buyers, setBuyers] = useState([])
    const [validate, setValidate] = useState(false)
    const [validateAllFields, setValidateAllFields] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getSeats()       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        validateBuyers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyers])

    function getSeats() {
        const seatsData = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
        seatsData.then(res => {
            setSeats(res.data.seats)
            setDay(res.data.day)
            setFilm(res.data.movie)
            setPreviousPath(`/sessoes/${res.data.movie.id}`)
        })
    }

    function validateBuyers() {
        let counterValidate = 0
        for(let i = 0; i < buyers.length; i++) {
            if(buyers[i].name !== '' && buyers[i].cpf.length === 14) counterValidate++
        }
        
        if(buyers.length > 0 && counterValidate === buyers.length) setValidateAllFields(true)
        else setValidateAllFields(false)
    }

    return (
        <SeatsContainer>
            <PageTitle title="Selecione o(s) assento(s)" />
            <SeatsSection>
                {seats.length === 0 ? <img src={loading} alt="cineflex-loading" /> : (
                    seats.map(seat => {
                        return <Seat key={seat.id} 
                            status={seat.isAvailable} number={seat.name} id={seat.id} buyers={buyers} setBuyers={setBuyers} />
                    })
                )}
            </SeatsSection>
            <Status>
                <div>
                    <SeatContainer green />
                    <p>Selecionado</p>
                </div>
                <div>
                    <SeatContainer />
                    <p>Disponível</p>
                </div>
                <div>
                    <SeatContainer yellow />
                    <p>Indisponível</p>
                </div>
            </Status>
            <UserForm>
                {buyers.sort((a, b) => a.id - b.id).map(buyer => {
                    return <UserFields key={buyer.id} 
                        id={buyer.id} seats={seats} buyers={buyers} setBuyers={setBuyers} name={buyer.name} cpf={buyer.cpf} validate={validate} />
                })}
            </UserForm>
            <button onClick={() => sendOrder(id, buyers, seats, validateAllFields, order, film, day, axios, setValidate, setPreviousPath, setOrder, navigate)}>
                Reservar assento(s)
            </button>
            <Footer>
                <div className="footer-card">
                    {Object.keys(film).length === 0 ? <img src={loading} alt="cineflex-loading" /> : <img src={film.posterURL} alt="film-footer" />}
                </div>
                <div>
                    <h2>{film.title}</h2>
                    <h2>{day.weekday} - {day.date}</h2>
                </div>
            </Footer>
        </SeatsContainer>
    )
}