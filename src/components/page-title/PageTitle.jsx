import './PageTitle.css'

export default function PageTitle({ title, color }) {
    return (
        <div className="page-title" style={{ color }}>
            <h1>{title}</h1>
        </div>
    )
}