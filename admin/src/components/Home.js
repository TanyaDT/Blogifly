import logo from './images/logo.jpg'
import {CgProfile} from 'react-icons/cg'
// import {Dropdown, DropdownButton} from 'react-bootstrap'
import '../stylesAdmin/admin.css'
// import DropDown from './DropDown'
import {AiOutlineHome} from 'react-icons/ai'
import {FiEdit, FiMusic} from 'react-icons/fi' 
import {FaRegHandshake} from 'react-icons/fa'
import {GiAirplaneDeparture, GiEyelashes} from 'react-icons/gi'
import {BiMoviePlay, BiBook} from 'react-icons/bi'
import {BsPeople} from 'react-icons/bs'

import {MdOutlineFastfood} from 'react-icons/md'
import HomeContent from './HomeContent'

import { useContext} from "react";
import { AdminContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Home() {
  const { setAdminData } = useContext(AdminContext);
  console.log('Hello Kareem', setAdminData); 
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await axios.get("/admin/logout");

    if (response.data.success) {
      // clear the context
      setAdminData(null); 
    }
    // redirect user to home
    navigate("/");
  };
  return (
    <div className='adminHomeContainer'>
          <div className='sidecat'>
             <h1>Blog Dashboard</h1>
            <ul className='category'>
                <li> <span><AiOutlineHome/></span> Blog posts</li>
                <li> <span><FiEdit/></span>  <Link className='sideLink' to="/editor"> New post</Link></li> 
                <li> <span><CgProfile/></span> <Link className='sideLink' to="/profile">Profile</Link></li>
            </ul> 
            <br/>
              <ul className='category'>
                <li className='topCate'>#TAGS</li>
                <li> <span><GiAirplaneDeparture/></span> Travel</li>
                <li> <span><FiMusic/></span> Music</li>
                <li> <span><FaRegHandshake/></span> Politics</li>
                <li> <span><BiMoviePlay/></span> Movies</li>
                <li> <span><BiBook/></span> Books</li>
                <li> <span><MdOutlineFastfood/></span> Food</li>
                <li> <span><BsPeople/></span> Lifestyle</li>
                <li> <span><GiEyelashes/></span> Makeup</li>
              </ul>

              {/* <DropDown/> */}
              <button className='logoutBt' onClick={handleLogout}>Logout</button>
            </div>
     <div className='adminBody'> 
        <div className='adminTop'>
         <img className='logoImg' src={logo} alt='pic'/> 
            <div className='adminName' >
            {/* <h5> {adminData.username} </h5> */}
            <h5> Welcome Admin </h5>
             
            <span><Link className='topLink' to="/profile"><CgProfile/></Link></span>
             </div>
        </div>
          <div className='homeContent'><HomeContent/> </div>
      </div>  
        
    </div>
  )
}

export default Home


