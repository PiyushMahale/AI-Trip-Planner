import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Trips from "./components/Trips";
import Reviews from "./components/Reviews";
import TripResults from "./components/TripResults";
import PlaceDetails from "./components/PlaceDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MyTrips from "./components/MyTrips";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="trips" element={<Trips/> } />
        <Route path="results" element={<TripResults />} />
        <Route path="place/:id" element={<PlaceDetails />} />
        <Route path="my-trips" element={<MyTrips />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
