export function sendOrder(id, buyers, seats, validateAllFields, order, film, day, axios, setValidate, setPreviousPath, setOrder, navigate) {
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
            buyers[i].cpf = buyers[i].cpf.replace('.', '').replace('.', '').replace('-', '')
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
        setValidate(false)

        const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', orderData)
        promise.then(() => navigate('/sucesso'))
        promise.catch(() => alert('Solicitação não enviada!'))
    }
}