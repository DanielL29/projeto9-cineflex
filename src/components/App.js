import { useState } from "react";
import Header from "./header/Header";
import Router from "./Router";

function App() {
    const [previousPath, setPreviousPath] = useState("/")

    return (
        <div className="App">
            <Header previousPath={previousPath} />
            <Router previousPath={previousPath} setPreviousPath={setPreviousPath} />
        </div>
    );
}

export default App;
