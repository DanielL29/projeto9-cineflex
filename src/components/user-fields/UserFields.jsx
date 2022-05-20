export default function UserFields({ id, seats, buyers, setBuyers, validate, name, cpf }) {
    const seatNumber = seats.find(seat => seat.id === id)

    function setCPF(e, id) {
        if(e.target.value.length === 3) e.target.value = `${e.target.value}.`
        else if(e.target.value.length === 7) e.target.value = `${e.target.value}.`
        else if(e.target.value.length === 11) e.target.value = `${e.target.value}-`  
        else if(e.target.value.length === 4) e.target.value = e.target.value.replace(e.target.value[3], '') 
        else if(e.target.value.length === 8) e.target.value = e.target.value.replace(e.target.value[7], '') 
        else if(e.target.value.length === 12) e.target.value = e.target.value.replace('-', '') 

        for (let i = 0; i < buyers.length; i++) {
            if(id === buyers[i].id) {
                if(!/[a-z]|[A-Z]/.test(e.target.value)) {
                    buyers[i] = { id: buyers[i].id, name, cpf: e.target.value }
                }
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
                <input type="text" placeholder="Digite seu CPF..." maxLength={14} value={cpf} onChange={(e) => setCPF(e, id)} />
                {cpf.length < 14 && validate ? <p>O campo de CPF precisa ter 11 caracteres</p> : ''}
            </div>
        </div>
    )
}