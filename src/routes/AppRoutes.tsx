// File AppRoutes.tsx to manager the routes.

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import HomeProfile from "../views/HomeProfile";
import PageNotFound from "../views/PageNotFound";
import Protected from "../componentes/Protected";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />}></Route>

                <Route
                    path="/homeProfile"
                    element={
                        <Protected>
                            <HomeProfile />
                        </Protected>
                    }>
                </Route>

                <Route path="*" element={<PageNotFound />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
