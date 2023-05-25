import { Routes, Route } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"
import AppLayout from "../layouts/AppLayout"

import Home from "../pages/Home"
import Error from "../pages/Error"
import DashBoard from "../pages/DashBoard"

const routePaths = {
    login: '/SportSee/',
    dashboard: '/SportSee/user/:id',
    error: '*'
}
  
/**
 * Component that handles routing in the application using React Router.
 * @function Router
 * @returns {JSX.Element} Returns the Router component.
 * @see {@link https://reactrouter.com/|React Router}
 */

const Router = () => {
    return (
        <Routes>
            <Route path={routePaths.login} element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={routePaths.error} element={<Error layout="main" />} />
            </Route>
            <Route path={routePaths.dashboard} element={<AppLayout />}>
                <Route index element={<DashBoard />} />
                <Route path={routePaths.error} element={<Error layout="app" />} />
            </Route>
        </Routes>
    );
};

export default Router;