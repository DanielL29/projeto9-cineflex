import { useState } from "react";
import Header from "./header/Header";
import Router from "./Router";

function App() {
    const [previousPath, setPreviousPath] = useState("/")

    return (
        <>
            <Header previousPath={previousPath} />
            <Router previousPath={previousPath} setPreviousPath={setPreviousPath} />
        </>
    );
}

export default App;
