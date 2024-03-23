import React from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Departments from "../components/Departments"
import MessageFrom from "../components/MessageFrom"

const Home = () => {
  return (
    <>
    <Hero title={"Welcome to SandyCare medical institute"} imageUrl={"/hero.png"}/>
    <Biography imgaeUrl={"/about.png"}/>
    <Departments/>
    <MessageFrom/>
    </>

  )
}

export default Home