import React, { Component, Suspense,useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Page404 from "../pages/Page404";
import Login from "../pages/Login";
import VerifyOtp from "../pages/VerifyOtp";
import Dashboard from "../pages/Dashboard";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
// const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// // Pages
// const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
// const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
// const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
import Header from '../components/Header'
import Submissions from "../pages/Submissions";
import Footer from "../components/Footer";
function App() {
//   const { user } = useAuthContext();
useEffect(() => {
  // Check if access token is present in local storage
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    // Redirect user to login page or another route if access token is not present
    // For example:
    // window.location.href = '/login';
  }
}, []);
  return (
    <BrowserRouter>
        <Suspense fallback={loading}>
       <Routes>
      <Route
        path="/*"
        element={
          <>
            <Header />
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Verify" element={<VerifyOtp />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer/>
          </>
        }
      />

        <>
      <Route path="/Dash" element={<Dashboard />} />
      <Route path="/Submissions" element={<Submissions />} />
      </>

    </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
