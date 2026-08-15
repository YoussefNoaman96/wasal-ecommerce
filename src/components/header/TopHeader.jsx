import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/wasal_logo.webp'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoHeartOutline, IoMenuOutline} from "react-icons/io5";
import './header.css'
import { CartContext } from '../context/CartContext';
import SearchBox from './SearchBox';

function TopHeader({ setIsSidebarOpen }) {

    const { cartItems, favorites } = useContext(CartContext)

    return (
        <div className='top_header'>
            <div className="container">
                {/* Mobile Menu Button */}
                <button className="mobile_menu_btn" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
                    <IoMenuOutline />
                </button>

                <Link className='logo' to='/'><img src={Logo} alt='Wasal' fetchPriority="high" loading="eager" decoding="async"/></Link>
                <SearchBox />
                
                <div className="header_icons">
                    <div className="icon">
                        <Link to='/favorites'>
                            <IoHeartOutline />
                            <span className="count">{favorites.length}</span>
                        </Link>
                    </div>

                    <div className="icon">
                        <Link to="/cart">
                            <HiOutlineShoppingBag />
                            <span className="count">{cartItems.length}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopHeader

