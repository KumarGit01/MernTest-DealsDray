import React from 'react'
import Dashbord from '../Dashbord/Dashbord'
import Login from '../Login/Login'

const Home = () => {
   

  return (
  <>
  {localStorage.getItem('userName') ? 
  <Dashbord /> :
  <Login />
}
  </>
  )
}

export default Home
