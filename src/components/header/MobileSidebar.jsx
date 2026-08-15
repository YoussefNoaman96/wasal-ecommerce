import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io"
import { IoCloseOutline } from "react-icons/io5"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaRegHeart, FaSignOutAlt } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa6"
import { useAuth } from "../context/AuthContext"
import { useCategory } from "../context/CategoryContext"
import Logo from '../../images/wasal_logo-2.webp'

const NavLinks = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Categories', link: '/categories' },
    { title: 'Blog', link: '/', unavailable: true },
    { title: 'Contact', link: '/', unavailable: true }
]

function MobileSidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const location = useLocation()
    const navigate = useNavigate()

    const { categories } = useCategory()
    const { user, logout } = useAuth()

    const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    useEffect(() => {
        setIsMobileCategoriesOpen(false)
    }, [location])

    const handleLogout = () => {
        logout()
        setIsSidebarOpen(false)
        navigate("/")
    }

    return (
        <>
            <div className={`mobile_overlay ${isSidebarOpen ? 'active' : ''}`}
                onClick={closeSidebar}
            ></div>

            <aside className={`mobile_sidebar ${isSidebarOpen ? 'active' : ''}`}>

                <div className="sidebar_header">
                    <Link to="/" onClick={closeSidebar}><img src={Logo} alt="Wasal" /></Link>

                    <button onClick={closeSidebar} aria-label="Close menu"><IoCloseOutline /></button>
                </div>

                <div className="sidebar_links">

                    {NavLinks.map((item) => (
                        <Link key={item.title} to={item.link}
                            className={!item.unavailable &&  location.pathname === item.link ? 'active' : ''}
                            onClick={closeSidebar}>

                            <span>{item.title}</span>
                        </Link>
                    ))}
                </div>

                <div className="sidebar_categories">

                    <button className="sidebar_category_btn" onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}>
                        <span>Browse Categories</span>
                        <IoIosArrowDown className={isMobileCategoriesOpen ? 'active' : ''}/>
                    </button>

                    <div className={`sidebar_category_list ${isMobileCategoriesOpen ? 'active' : ''}`}>
                        {categories.map((category) => (
                            <Link key={category.slug} to={`/category/${category.slug}`} onClick={closeSidebar}>{category.name}</Link>
                        ))}
                    </div>
                </div>

                <div className="sidebar_user">
                    {!user ? (
                        <>
                            <Link to="/login" onClick={closeSidebar}><FaSignInAlt /> Login</Link>
                            <Link to="/register" onClick={closeSidebar}><FaUserPlus />Register</Link>
                        </>
                    ) : (
                        <>
                            <div className="sidebar_user_info">
                                <div className="user_avatar">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span>{user.name}</span>
                            </div>

                            <Link to="/favorites" onClick={closeSidebar}><FaRegHeart />Favorite</Link>

                            <button onClick={handleLogout}><FaSignOutAlt />Logout</button>
                        </>

                    )}

                </div>
            </aside>
        </>
    )
}

export default MobileSidebar