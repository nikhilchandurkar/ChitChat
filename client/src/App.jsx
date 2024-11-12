import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Groups"))
const NotFound = lazy(()=> import ("./pages/NotFound"))
let user = false;
// let user = true;

const App = () => {
  return (

    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        {/* protected routes if log in then access it else other /login  */}
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/chat/:chatid" element={<Chat />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
        </Route>
        {/* route to login  */}
        <Route path="/login" element={<ProtectRoute user={!user}>
          <Login />
        </ProtectRoute>} />
        {/* route to 404 page */}

        <Route path="*" element={<NotFound />} />

      </Routes>


      </Suspense>
    </BrowserRouter>
  )
}

export default App
