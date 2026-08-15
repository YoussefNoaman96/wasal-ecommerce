import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom';

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
        setSuggestions([])
    }

    useEffect(() => {
        const fetchSuggestions = async () => {

            const trimmedSearch = searchTerm.trim()

            if (trimmedSearch.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(trimmedSearch)}&limit=5&select=id,title,images`);
                const data = await res.json();
                setSuggestions(data.products || []);
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
            }
        }

        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    useEffect(() => {
        setSuggestions([])
        setSearchTerm('');
    }, [location])

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target)
            ) {
                setSuggestions([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="SearchBox_Container" ref={searchRef}>
            <form onSubmit={handleSubmit} className="search_box">
                <input type="text" name='search' id='search' placeholder='Search For Products' 
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoComplete="off" />
                <button type='submit'><FaSearch /></button>
            </form>

            {suggestions.length > 0 && (
                <ul className="search_suggestions">
                    {suggestions.map((item) => (
                        <li key={item.id}>
                            <Link to={`/products/${item.id}`}>
                                <img src={item.images?.[0]} alt={item.title} width="50" height="50"
                                    decoding="async" loading="lazy" />
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBox
