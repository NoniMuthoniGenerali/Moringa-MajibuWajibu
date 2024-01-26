import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Signup from './components/SignUp/SignUp'
import Signin from './components/SignIn/SignIn'




function App() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} exact/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signin' element={<Signin />} />


           
        </Routes>
    </div>
  )
}

export default App 