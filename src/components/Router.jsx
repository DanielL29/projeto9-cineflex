import { Route, Routes } from "react-router-dom";
import Session from "./session/Session";
import Movies from "./movies/Movies";
import Seats from "./seats/Seats";
import Success from './success/Success';
import { useState } from "react";

export default function Router() {
    const [order, setOrder] = useState({})

    return (
        <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/sessoes/:id" element={<Session />} />
            <Route path="/assentos/:id" element={<Seats order={order} setOrder={setOrder} />} />
            <Route path="/sucesso" element={<Success order={order} setOrder={setOrder} />} />
        </Routes>
    )
}