import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./containers/pages/Login";
import Register from "./containers/pages/Register";
import { RequireAuth, Layout } from "./hocs/layouts/Layout";
import UpdateProfile from "./containers/pages/UpdateProfile";
import Services from "./containers/pages/Services";
const Home = lazy(() => import("./containers/pages/Home"));
const About = lazy(() => import("./containers/pages/About"));
const Plans = lazy(() => import("./containers/pages/Plans"));
const Contact = lazy(() => import("./containers/pages/Contact"));
const PropertyDetails = lazy(() => import("./containers/pages/PropertyDetails"));
const Profile = lazy(() => import("./containers/pages/Profile"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Plans />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
        </Route>
        <Route path="/" element={<RequireAuth />}>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/update" element={<UpdateProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default AnimatedRoutes;
