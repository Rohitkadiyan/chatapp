import React from 'react'
import Chatbox from '../components/Chatbox';
import Sidebar from '../components/Sidebar';

export default function Home() {
  
  return (
    <div className='mainContainer'>
      <div className='container col-sm-11 col-md-8  col-11  p-0'>
        <Sidebar/>
        <Chatbox/>
      </div>
    </div>
  )
  

}
