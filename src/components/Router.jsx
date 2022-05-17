import { Route, Routes } from "react-router-dom";
import Film from "./film/Film";
import Movies from "./movies/Movies";
import Session from "./session/Session";
import Success from './success/Success';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/filme/:id" element={<Film />} />
            <Route path="/sessao/:id" element={<Session />} />
            <Route path="/sucesso" element={<Success />} />
        </Routes>
    )
}