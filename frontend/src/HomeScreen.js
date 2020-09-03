import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listProducts } from './actions/productActions';
import { useSelector, useDispatch } from 'react-redux';

function HomeScreen(props) {
	const productList = useSelector(state => state.productList);
	const { products, loading, error } = productList;
	const dispatch = useDispatch();


	useEffect(() => {

		dispatch(listProducts());
		return () => {
		};
	},[]);

	return (
		loading? <div>Loading...</div> : 
		error? <div>{error}</div>:
		<div>
			<ul className="products">
		      {
		        products.map(product => 
		           <li key={product._id}>
		            <div className="product">
		              <Link to={"product/"+product._id}>
		              	<img className="product-image" src={product.image} alt="product"/>
		              </Link>
		              <div className="product-name">
		                <Link to={"product/"+product._id}>{product.name}</Link>
		              </div>
		              <div className="product-brand">{product.brand}</div>
		              <div className="product-price">{product.price}</div>
		              <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
		            </div>
		          </li>
		        )
		      }
		    </ul>
		</div>
	)
}

export default HomeScreen;