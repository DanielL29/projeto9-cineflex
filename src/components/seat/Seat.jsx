import { useState } from 'react'
import './Seat.css'

export default function Seat({ number, status, id, buyers, setBuyers }) {
    const [color, setColor] = useState(false)
    const selectSeat = color ? 'green' : ''

    function getSeatId(id) {
        if (color) {
            if (window.confirm('Deseja remover o assento e apagar os dados?')) {
                for (let i = 0; i < buyers.length; i++) {
                    if (id === buyers[i].id) {
                        buyers.splice(i, 1)
                    }
                }
                
                setColor(!color)
                setBuyers([...buyers])
            }
        } else {
            setColor(!color)
            setBuyers([...buyers, { id, name: '', cpf: '' }])
        }
    }

    return (
        <div className={`seat ${!status ? 'yellow' : selectSeat}`}
            onClick={status ? () => getSeatId(id) : () => alert('Esse assento não está disponível')}>{number}</div>
    )
}