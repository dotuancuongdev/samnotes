import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { AppContext } from "./context";
import { Box } from "@mui/material";
import { UserPanel } from "./components/UserPanel";

const publicRoutes = [{ path: "/", element: <Home /> }];

const authRoutes = [{ path: "/login", element: <Login /> }];

const userRoutes = [{ path: "/user-profile", element: <UserProfile /> }];

function App() {
  const [count, setCount] = useState(0);

  const appContext = useContext(AppContext);
  const { user } = appContext;

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((r) => (
          <Route path={r.path} element={r.element} key={r.path} />
        ))}
        {authRoutes.map((r) => (
          <Route
            path={r.path}
            element={
              !user ? r.element : <Navigate replace to="/user-profile" />
            }
            key={r.path}
          />
        ))}
        <Route path="/" element={<UserPanel />}>
          {userRoutes.map((r) => (
            <Route
              path={r.path}
              element={user ? r.element : <Navigate replace to="/login" />}
              key={r.path}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
