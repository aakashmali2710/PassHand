import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white sticky top-0' >
      <div className="mycontainer flex justify-between items-center px-7 py-5 m-auto h-12">
        <div className="logo font-bold text-xl">
          <span className='text-green-700'>&lt;</span>
          PassHand
          <span className='text-green-700'>/&gt;</span>
        </div>
        
        <button className='text-slate-950  bg-slate-200 flex justify-center items-center rounded-full  '>
          <img className='invert-0  w-12 px-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png" alt="" />
        <span className='m-auto py-2 font-bold'>Github</span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar