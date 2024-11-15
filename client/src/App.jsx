import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

let user = true; // Simulating user authentication status

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          {/* Protected routes - accessible only for logged-in users */}
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/chat/:chatid" element={<Chat />} />
          </Route>

          {/* Login route, but if user is already logged in, redirect them to home */}
          <Route
            path="/login"
            element={
              user ? (
                <ProtectRoute user={user}>
                  <Home /> {/* Redirect to Home if already logged in */}
                </ProtectRoute>
              ) : (
                <Login />
              )
            }
          />

          {/* Route to 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
