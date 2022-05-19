import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../page-title/PageTitle'
import './Seats.css'
import Footer from '../footer/Footer';

function Seat({ number, status, id, ids, setIds, buyer, setBuyer }) {
    const [color, setColor] = useState(false)
    const selectSeat = color ? 'green' : ''

    function getSeatId(id) {
        if (color) {
            if (window.confirm('Deseja remover o assento e apagar os dados?')) {
                for (let i = 0; i < ids.length; i++) {
                    if (id === ids[i]) {
                        ids.splice(i, 1)
                    }
                    if (buyer.length > 0) {
                        for (let j = 0; j < buyer.length; j++) {
                            if (id === buyer[j].id) {
                                buyer.splice(j, 1)
                            }
                        }
                    }
                }
                setColor(!color)
                setIds([...ids])
                setBuyer([])
            }
        } else {
            setColor(!color)
            setIds([...ids, id])
        }
    }

    return (
        <div className={`seat ${!status ? 'yellow' : selectSeat}`}
            onClick={status ? () => getSeatId(id) : () => alert('Esse assento não está disponível')}>{number}</div>
    )
}

function UserFields({ id, seats, buyer, setBuyer, validate }) {
    const [name, setName] = useState('')
    const [cpf, setCPF] = useState('')
    const cpfValid = cpf.length === 11
    const noBuyer = buyer.length === 0
    const seatNumber = seats.find(seat => seat.id === id)

    useEffect(() => {
        if (cpf !== "") {
            getBuyer()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cpfValid])

    useEffect(() => {
        if (buyer.length === 0) {
            setName('')
            setCPF('')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noBuyer])

    function getBuyer() {
        setBuyer([...buyer, { id, name, cpf }])
    }

    function limitCPF(e) {
        if (e.target.value.length <= 11) {
            setCPF(e.target.value)
        }
    }

    return (
        <div>
            <h1>Comprador do assento: {seatNumber.name}</h1>
            <div>
                <label>Nome do comprador:</label>
                <input type="text" placeholder="Digite seu nome..." value={name} onChange={(e) => setName(e.target.value)} />
                {name === "" && validate ? <p>Nome não informado</p> : ''}
            </div>
            <div>
                <label>CPF do comprador:</label>
                <input type="text" placeholder="Digite seu CPF..." value={cpf} onChange={(e) => limitCPF(e)} />
                {cpf.length < 11 && validate ? <p>O campo de CPF precisa ter 11 caracteres</p> : ''}
            </div>
        </div>
    )
}

export default function Seats({ order, setOrder, setPreviousPath }) {
    const { id } = useParams()
    const [seats, setSeats] = useState([])
    const [day, setDay] = useState({})
    const [film, setFilm] = useState({})
    const [ids, setIds] = useState([])
    const [buyer, setBuyer] = useState([])
    const [validate, setValidate] = useState(false)

    useEffect(() => {
        getSeats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getSeats() {
        const seatsData = await axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)
        setSeats(seatsData.data.seats)
        setDay(seatsData.data.day)
        setFilm(seatsData.data.movie)
        setPreviousPath(`/sessoes/${seatsData.data.movie.id}`)
    }

    function sendOrder() {
        let counter = 0
        setValidate(true)
        if (ids.length > 0 && ids.length === buyer.length) {
            ids.sort((a, b) => a - b)
            const getSeatsName = (seat) => {
                if (seat.id === ids[counter]) {
                    counter++
                    return seat.name
                }
            }
            const idsName = seats.map(getSeatsName).filter(name => name !== undefined).map((user, i) => {
                return { idAssento: user, nome: buyer[i].name, cpf: buyer[i].cpf }
            })
            let orderData = { ids, compradores: idsName }
            setOrder({
                ...order,
                title: film.title,
                weekday: day.weekday,
                date: day.date,
                ids: idsName,
            })

            const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', orderData)
            promise.catch(() => alert('Solicitação não enviada!'))
        }
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
                            buyer={buyer}
                            setBuyer={setBuyer}
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
                {ids.sort((a, b) => a - b).map((id, i) => {
                    return (
                        <UserFields key={i}
                            id={id}
                            seats={seats}
                            buyer={buyer}
                            setBuyer={setBuyer}
                            validate={validate}
                        />
                    )
                })}
            </div>
            <Link to="/sucesso" onClick={() => setPreviousPath(`/assentos/${id}`)}>
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