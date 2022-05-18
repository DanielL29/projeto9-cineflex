import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../page-title/PageTitle'
import './Seats.css'
import Footer from '../footer/Footer';

function Seat({ number, status, id, ids, setIds }) {
    const [color, setColor] = useState(false)
    const selectSeat = color ? 'green' : ''

    function getSeatId(id) {
        setColor(!color)
        setIds([...ids, id])
    }

    return (
        <div className={`seat ${!status ? 'yellow' : selectSeat}`} 
            onClick={status ? () => getSeatId(id) : () => alert('Esse assento não está disponível')}>{number}</div>
    )
}

export default function Seats({ order, setOrder }) {
    const { id } = useParams()
    const [seats, setSeats] = useState([])
    const [day, setDay] = useState({})
    const [film, setFilm] = useState('')
    const [name, setName] = useState('')
    const [cpf, setCPF] = useState('')
    const [ids, setIds] = useState([])

    useEffect(() => {
        getSeats()
    }, [])

    async function getSeats() {
        const seatsData = await axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
        setSeats(seatsData.data.seats)
        setDay(seatsData.data.day)
        setFilm(seatsData.data.movie)
    }

    function sendOrder() {
        let orderData = { ids, name, cpf }
        let counter = 0
        ids.sort((a, b) => a - b)
        const getSeatsName = (seat) => {
            if(seat.id === ids[counter]) {
                counter++
                return seat.name
            }
        }
        const idsName = seats.map(getSeatsName).filter(name => name !== undefined)
        setOrder({
            ...order,
            title: film.title,
            weekday: day.weekday,
            date: day.date,
            ids: idsName,
            name,
            cpf
        })
        
        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', orderData)
        promise.then(res => console.log(res.data))
        promise.catch(res => res.response.data)
    }

    return (
        <div className="session">
            <PageTitle title="Selecione o(s) assento(s)" />
            <div className="seats">
                {seats.map(seat => {
                    return (
                        <Seat key={seat.id} 
                            status={seat.isAvailable} 
                            number={seat.name} 
                            ids={ids} 
                            setIds={setIds}
                            id={seat.id}
                        />
                    )
                })}
            </div>
            <div className="status">
                <div>
                    <div className="seat green"></div>
                    <p>Selecionado</p>
                </div>
                <div>
                    <div className="seat"></div>
                    <p>Disponível</p>
                </div>
                <div>
                    <div className="seat yellow"></div>
                    <p>Indisponível</p>
                </div>
            </div>
            <div className="user-form">
                <div>
                    <label>Nome do comprador:</label>
                    <input type="text" placeholder="Digite seu nome..." value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>CPF do comprador:</label>
                    <input type="text" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => setCPF(e.target.value)} />
                </div>
            </div>
            <Link to="/sucesso">
                <button className="send" onClick={sendOrder}>Reservar assento(s)</button>
            </Link>
            <Footer>
                <div className="footer-card">
                    <img src={film.posterURL} alt="film-footer" />
                </div>
                <div>
                    <h2>{film.title}</h2>
                    <h2>{day.weekday} - {day.date}</h2>
                </div>
            </Footer>
        </div>
    )
}