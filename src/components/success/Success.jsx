import './Success.css'
import PageTitle from './../page-title/PageTitle';
import { Link } from 'react-router-dom';

export default function Success({ order, setPreviousPath }) {
    const cpf = order.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

    return (
        <div className="success">
            <PageTitle title="Pedido feito com sucesso!" color="#247A6B" />
            <div>
                <div className="info">
                    <strong>Filme e sessão</strong>
                    <p>{order.title}</p>
                    <p>{order.date} {order.weekday}</p>
                </div>
                <div className="info">
                    <strong>Ingressos</strong>
                    {order.ids.map(id => <p>Assento {id}</p>)}
                </div>
                <div className="info">
                    <strong>Comprador</strong>
                    <p>Nome: {order.name}</p>
                    <p>CPF: {cpf}</p>
                </div>
            </div>
            <Link to="/" onClick={() => setPreviousPath("/")}>
                <button className="home">Voltar pra Home</button>
            </Link>
        </div>
    )
}