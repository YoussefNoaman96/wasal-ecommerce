import React, { useEffect, useState } from 'react'
import { IoIosMenu } from "react-icons/io"
import { IoMdArrowDropdown } from "react-icons/io"
import { Link, useLocation } from 'react-router-dom'
import { useCategory } from "../context/CategoryContext"

const NavLinks = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Categories', link: '/categories' },
    { title: 'Blog', link: '/', unavailable: true },
    { title: 'Contact', link: '/', unavailable: true }
]

function DesktopNav() {
    const location = useLocation()
    const { categories } = useCategory()

    const [isCtageroyOpen, setIsCtageroyOpen] = useState(false)

    useEffect(() => {
        setIsCtageroyOpen(false)
    }, [location])

    return (
        <nav className="nav">
            <div className="category_nav">

                <div className="category_btn" onClick={() => setIsCtageroyOpen(!isCtageroyOpen)} >
                    <IoIosMenu />
                    <p>Browse Category</p>
                    <IoMdArrowDropdown />
                </div>

                <div className={`category_nav_list ${isCtageroyOpen ? 'active' : ''}`}>
                    {categories.map((category) => (
                        <Link to={`/category/${category.slug}`} key={category.slug}>{category.name}</Link>
                    ))}
                </div>
            </div>

            <div className="nav_links">

                {NavLinks.map((item) => (
                    <li key={item.title}
                        className={!item.unavailable && location.pathname === item.link ? 'activ' : ''}>
                        <Link to={item.link}>{item.title}</Link>
                    </li>
                ))}

            </div>
        </nav>
    )
}

export default DesktopNav