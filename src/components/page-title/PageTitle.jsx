import './PageTitle.css'

export default function PageTitle({ title, color }) {
    return (
        <div className="page-title" style={{ color, fontWeight: color ? 'bold' : 'normal' }}>
            <h1>{title}</h1>
        </div>
    )
}