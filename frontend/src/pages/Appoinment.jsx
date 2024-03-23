import React from "react";
import Hero from "../components/Hero";
import AppoinmentForm from "../components/AppoinmentForm";

const Appoinment = () => {
  return (
    <>
      <Hero
        title={"Schedule your appoint at SandyCare Hospital"}
        imageUrl={"/signin.png"}
      />
      <AppoinmentForm />
    </>
  );
};

export default Appoinment;
