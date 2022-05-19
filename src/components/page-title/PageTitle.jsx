import { PageTitleContainer } from './PageTitleStyle'

export default function PageTitle({ title, color }) {
    return (
        <PageTitleContainer color={color}>
            <h1>{title}</h1>
        </PageTitleContainer>
    )
}