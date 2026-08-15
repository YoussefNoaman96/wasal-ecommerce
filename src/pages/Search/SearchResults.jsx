import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageTransition from '../../components/PageTransition';
import SlideProductLoading from '../../components/slideProducts/SlideProductLoading';
import Product from '../../components/slideProducts/Product';
import { FaSearch } from 'react-icons/fa'

function SearchResults() {
    const [results, setResults] = useState([]);
    const query = new URLSearchParams(useLocation().search).get('query');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
                const data = await res.json();
                setResults(data.products || []);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        }
        if (query) {
            fetchSearchResults();
        }
    }, [query])

    return (
        <PageTransition key={query}>
            <div className='category_page'>
                {loading ? (
                    <SlideProductLoading key={query} />
                ) : (
                    <div className="container">
                        <div className="top_slide">
                            <h2>Results for "{query}"</h2>
                        </div>

                        {results.length > 0 ? (
                            <div className="products">
                                {results.map((item) => (
                                    <Product item={item} key={item.id} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty_search">
                                <div className="icon"><FaSearch /></div>
                                <h2>Oops! We couldn't find what you're looking for.</h2>
                                <p>
                                    We couldn't find any products matching
                                    <span> "{query}"</span>
                                </p>
                                <ul>
                                    <li>Check your spelling.</li>
                                    <li>Try different keywords.</li>
                                    <li>Use more general terms.</li>
                                </ul>

                                <Link to="/" className="btn">
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </PageTransition>
    )
}

export default SearchResults
