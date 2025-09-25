import { useState } from 'react'
import Navbar from './component/Navbar'
import './App.css'
import Manager from './component/Manager'
import Footer from './component/Footer'

function App() {


  return (
    <>
    <Navbar/>
    <div className='min-h-[90vh]'>
      <Manager/>
    </div>
     
     <Footer/>
     
    </>
  )
}

export default App
