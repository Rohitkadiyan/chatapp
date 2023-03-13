import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chatsbox from './Chatsbox';

export default function Sidebar() {
  return (
    <div className='sidebar '>
     <Navbar/>
     <Search/>
     <Chatsbox/>
    </div>
  )
}
