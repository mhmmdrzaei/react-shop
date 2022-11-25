import {useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import {CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
	const { category } = useParams();
	const {categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(()=> {
		setProducts(categoriesMap[category]);
	}, [category,categoriesMap])
	return (
		<>
		<h2>{category.toUpperCase()}</h2>
		<div className="single-category-container">
		
			{products &&
				products.map((product) => {
					return (
						<ProductCard key={product.id} product={product} />
						)
				}



			)
			}
		</div>
		</>
		)
}
export default Category;