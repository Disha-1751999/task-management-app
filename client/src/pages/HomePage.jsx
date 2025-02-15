import React from 'react'
import SideBar from '../components/home/SideBar'
import { Outlet } from 'react-router-dom'
import ToggleStore from '../store/ToggleStore'

function HomePage() {
  const {isOpen}=ToggleStore()
  return (
    <div className='flex flex-col h-auto min-h-[98vh] gap-4 w-full md:flex-row bg-gray-900'>
       <div className={`w-full border bg-gray-900 border-gray-500 rounded-xl p-4 x md:w-2/6 lg:w-1/6 ${isOpen ? '' : 'hidden'} transition-all duration-300 max-h-[98vh] sticky top-2`}><SideBar/></div>
       <div className='w-full md:w-4/6 lg:w-5/6  border border-gray-500 rounded-xl p-4 '>
       <Outlet/>
       </div>
    </div>
  )
}

export default HomePage