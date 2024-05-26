import { useContext, useState } from "react";

import "./App.css";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import { AppContext } from "./context";

function App() {
  const [count, setCount] = useState(0);

  const appContext = useContext(AppContext);
  const { user } = appContext;

  const authRoutes = [
    { path: "/", element: <Login /> },
    { path: "/*", element: <Navigate to="/" replace /> },
  ];
  const userRoutes = [
    { path: "/", element: <Home /> },
    { path: "/user-profile", element: <UserProfile /> },
    { path: "/*", element: <Navigate to="/" replace /> },
  ];

  const AuthLayout = () => (
    <Routes>
      {authRoutes.map((r, idx) => (
        <Route key={idx} path={r.path} element={r.element} />
      ))}
    </Routes>
  );

  const UserLayout = () => (
    <Routes>
      {userRoutes.map((r, idx) => (
        <Route key={idx} path={r.path} element={r.element} />
      ))}
    </Routes>
  );

  return (
    <BrowserRouter>{user ? <UserLayout /> : <AuthLayout />}</BrowserRouter>
  );
}

export default App;
