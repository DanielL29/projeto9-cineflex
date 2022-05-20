import { useState } from "react";
import Header from "./header/Header";
import Router from "./Router";
import { GlobalStyle } from '../assets/global/GlobalStyle'

export default function App() {
    const [previousPath, setPreviousPath] = useState("/")

    return (
        <>
            <GlobalStyle />
            <Header previousPath={previousPath} />
            <Router previousPath={previousPath} setPreviousPath={setPreviousPath} />
        </>
    );
}
