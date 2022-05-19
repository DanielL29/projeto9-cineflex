export default function UserFields({ id, seats, buyers, setBuyers, validate, name, cpf }) {
    const seatNumber = seats.find(seat => seat.id === id)

    function setCPF(e, id) {
        for (let i = 0; i < buyers.length; i++) {
            if (id === buyers[i].id) {
                buyers[i] = { id: buyers[i].id, name, cpf: e.target.value }
            }
        }
        setBuyers([...buyers])
    }

    function setName(e, id) {
        for (let i = 0; i < buyers.length; i++) {
            if (id === buyers[i].id) {
                buyers[i] = { id: buyers[i].id, name: e.target.value, cpf }
            }
        }
        setBuyers([...buyers])
    }

    return (
        <div>
            <h1>Comprador do assento: {seatNumber.name}</h1>
            <div>
                <label>Nome do comprador:</label>
                <input type="text" placeholder="Digite seu nome..." value={name} onChange={(e) => setName(e, id)} />
                {name === '' && validate ? <p>Nome não informado</p> : ''}
            </div>
            <div>
                <label>CPF do comprador:</label>
                <input type="text" placeholder="Digite seu CPF..." maxLength={11} value={cpf} onChange={(e) => setCPF(e, id)} />
                {cpf.length < 11 && validate ? <p>O campo de CPF precisa ter 11 caracteres</p> : ''}
            </div>
        </div>
    )
}