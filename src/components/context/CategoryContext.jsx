import React, { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    fetch("https://dummyjson.com/products/categories"),
                    fetch("https://dummyjson.com/products?limit=0&select=category")
                ]);

                const categoriesData = await categoriesRes.json();
                const productsData = await productsRes.json();

                const productCounts = productsData.products.reduce((counts, product) => {
                    counts[product.category] = (counts[product.category] || 0) + 1;
                    return counts;
                }, {});

                const categoriesWithCount = categoriesData.map((category) => ({
                    ...category,
                    count: productCounts[category.slug] || 0
                }));

                setCategories(categoriesWithCount);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading }}>
            {children}
        </CategoryContext.Provider>
    );
}

export function useCategory() {
    return useContext(CategoryContext);
}

export default CategoryProvider;