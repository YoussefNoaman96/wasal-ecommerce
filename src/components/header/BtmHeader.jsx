import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaRegHeart, FaSignOutAlt } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa6"
import { useAuth } from "../context/AuthContext"
import DesktopNav from './DesktopNav'
import MobileSidebar from './MobileSidebar'


function BtmHeader({ isSidebarOpen, setIsSidebarOpen }) {

const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
const navigate = useNavigate()
const userMenuRef = useRef(null)
const { user, logout } = useAuth()

useEffect(() => {
    function handleClickOutside(e) {
        if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
            setIsUserMenuOpen(false)
        }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
        document.removeEventListener("mousedown", handleClickOutside)
    }
}, [])


const handleLogout = () => {
    logout()
    setIsSidebarOpen(false)
    setIsUserMenuOpen(false)
    navigate("/")
}

return (
    <div className='btm_header'>
        <div className="container">
            <DesktopNav />

            <div className="sign_regs_icon">
                {!user ? (
                    <>
                        <Link to="/login"><FaSignInAlt /></Link>
                        <Link to="/register"><FaUserPlus /></Link>
                    </>
                ) : (
                    <div className="user_menu" ref={userMenuRef}>
                        <div className="user_btn" onClick={() => setIsUserMenuOpen(prev => !prev)}>
                            <div className="user_avatar">{user.name.charAt(0).toUpperCase()}</div>

                            <span className="user_name">Hello, {user.name}</span>

                            <IoIosArrowDown className={`arrow_icon ${isUserMenuOpen ? "active" : ""}`}/>
                        </div>

                        <div className={`user_dropdown ${isUserMenuOpen ? "active" : ""}`}>
                            <Link to="/favorites"><FaRegHeart />Favorites</Link>

                            <button onClick={handleLogout}><FaSignOutAlt />Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <MobileSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />
    </div>
)
}

export default BtmHeader