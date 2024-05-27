import { useContext, useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserPanel } from "./components/UserPanel";
import { AppContext } from "./context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import UserNotes from "./pages/UserNotes";
import User from "./pages/User";
import UserSetting from "./pages/UserSetting";

const publicRoutes = [{ path: "/", element: <Home /> }];

const authRoutes = [{ path: "/login", element: <Login /> }];

const userRoutes = [
  { path: "/user", element: <User /> },
  { path: "/user/note", element: <UserNotes /> },
  { path: "/user/profile", element: <UserProfile /> },
  { path: "/user/setting", element: <UserSetting /> },
];

function App() {
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
            element={!user ? r.element : <Navigate replace to="/user" />}
            key={r.path}
          />
        ))}
        <Route
          path="/"
          element={user ? <UserPanel /> : <Navigate replace to="/login" />}
        >
          {userRoutes.map((r) => (
            <Route path={r.path} element={r.element} key={r.path} />
          ))}
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
