import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productSaveReducer, productDetailsReducer, productDeleteReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';


const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null; 

const initialState = {cart: {cartItems, shipping: {}, payment: {} }, userSignin: {userInfo}};
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : f => f));

export default store;