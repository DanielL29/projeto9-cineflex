import { SuccessContainer, Info } from './SuccessStyle'
import PageTitle from './../page-title/PageTitle';
import { Link } from 'react-router-dom';

export default function Success({ order, setPreviousPath }) {
    return (
        <SuccessContainer>
            <PageTitle title="Pedido feito com sucesso!" color="#247A6B" />
            <div>
                <Info>
                    <strong>Filme e sessão</strong>
                    <p>{order.title}</p>
                    <p>{order.date} {order.weekday}</p>
                </Info>
                <Info>
                    <strong>Ingressos</strong>
                    {order.ids.map(id => <p key={id.idAssento}>Assento {id.idAssento}</p>)}
                </Info>
                <Info>
                    {order.ids.map(id => {
                        let cpf = id.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                        return (
                            <div key={id.idAssento}>
                                <strong>Comprador do Assento {id.idAssento}</strong>
                                <p>Nome: {id.nome}</p>
                                <p>CPF: {cpf}</p>
                            </div>
                        )
                    })}
                </Info>
            </div>
            <Link to="/" onClick={() => setPreviousPath("/")}>
                <button className="home">Voltar pra Home</button>
            </Link>
        </SuccessContainer>
    )
}