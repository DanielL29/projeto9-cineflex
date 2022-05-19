import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageTitle from '../page-title/PageTitle'
import Seat from '../seat/Seat'
import UserFields from '../user-fields/UserFields'
import { SeatContainer } from '../seat/SeatStyle'
import { SeatsContainer, SeatsSection, Status, UserForm } from './SeatsStyle'
import './SeatsStyle.jsx'
import Footer from '../footer/Footer';

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

    async function getSeats() {
        const seatsData = await axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
        setSeats(seatsData.data.seats)
        setDay(seatsData.data.day)
        setFilm(seatsData.data.movie)
        setPreviousPath(`/sessoes/${seatsData.data.movie.id}`)
    }

    function validateBuyers() {
        let counterValidate = 0
        for(let i = 0; i < buyers.length; i++) {
            if(buyers[i].name !== '' && buyers[i].cpf.length === 11) {
                counterValidate++
            }
        }
        
        if(buyers.length > 0 && counterValidate === buyers.length) setValidateAllFields(true)
        else setValidateAllFields(false)
    }

    function sendOrder() {
        let counter = 0
        setValidate(true)
        if (buyers.length > 0 && validateAllFields) {
            buyers.sort((a, b) => a.id - b.id)

            const getSeatsName = seat => {
                if(buyers[counter] !== undefined) {
                    if(seat.id === buyers[counter].id) {
                        counter++
                        return seat.name
                    }
                }
            }

            const idsName = seats.map(getSeatsName).filter(name => name !== undefined).map((user, i) => {
                return { idAssento: user, nome: buyers[i].name, cpf: buyers[i].cpf }
            })
            
            const ids = buyers.map(user => user.id)
            let orderData = { ids, compradores: idsName }
            setOrder({
                ...order,
                title: film.title,
                weekday: day.weekday,
                date: day.date,
                ids: idsName,
            })
            setPreviousPath(`/assentos/${id}`)

            const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', orderData)
            promise.then(() => navigate('/sucesso'))
            promise.catch(() => alert('Solicitação não enviada!'))
        }
    }

    return (
        <SeatsContainer>
            <PageTitle title="Selecione o(s) assento(s)" />
            <SeatsSection>
                {seats.map(seat => {
                    return (
                        <Seat key={seat.id} 
                            status={seat.isAvailable} number={seat.name} id={seat.id} buyers={buyers} setBuyers={setBuyers} />
                    )
                })}
            </SeatsSection>
            <Status>
                <div>
                    <SeatContainer green></SeatContainer>
                    <p>Selecionado</p>
                </div>
                <div>
                    <SeatContainer></SeatContainer>
                    <p>Disponível</p>
                </div>
                <div>
                    <SeatContainer yellow></SeatContainer>
                    <p>Indisponível</p>
                </div>
            </Status>
            <UserForm>
                {buyers.sort((a, b) => a.id - b.id).map(buyer => {
                    return (
                        <UserFields key={buyer.id} 
                            id={buyer.id} seats={seats} buyers={buyers} setBuyers={setBuyers} name={buyer.name} cpf={buyer.cpf} validate={validate} />
                    )
                })}
            </UserForm>
            <button onClick={sendOrder}>Reservar assento(s)</button>
            <Footer>
                <div className="footer-card">
                    <img src={film.posterURL} alt="film-footer" />
                </div>
                <div>
                    <h2>{film.title}</h2>
                    <h2>{day.weekday} - {day.date}</h2>
                </div>
            </Footer>
        </SeatsContainer>
    )
}