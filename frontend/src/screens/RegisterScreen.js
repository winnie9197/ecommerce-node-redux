import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { register, createadmin } from '../actions/userActions';


function RegisterScreen(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const userRegister = useSelector(state => state.userRegister);
 	const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const location = useLocation();

	useEffect(() => {	
		if (userInfo) {
			props.history.push("/");
		}
		return () => {
			//
		}
	}, [userInfo]);

	const submitHandler = (e) => {
		e.preventDefault(); 
		console.log(location.pathname);
		if (location.pathname == "/createadmin") {
			dispatch(createadmin(name, email, password));
		} else {
			dispatch(register(name, email, password));
		}
	}

	return <div className="form">
		    <form onSubmit={submitHandler} >
		      <ul className="form-container">
		        <li>
		          <h2>Create Account</h2>
		        </li>
		        <li>
		          {loading && <div>Loading...</div>}
		          {error && <div>{error}</div>}
		        </li>
		        <li>
		          <label htmlFor="name">
		            Name
		          </label>
		          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
		          </input>
		        </li>
		        <li>
		          <label htmlFor="email">
		            Email
		          </label>
		          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
		          </input>
		        </li>
		        <li>
		          <label htmlFor="password">Password</label>
		          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
		          </input>
		        </li>
		        <li>
		          <label htmlFor="rePassword">Re-Enter Password</label>
		          <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}>
		          </input>
		        </li>
		        <li>
		          <button type="submit" className="button primary">Register</button>
		        </li>
		        <li>
		          Already have an account?
		          <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Login to your account</Link>

		        </li>

		      </ul>
		    </form>
		  </div>
}

export default RegisterScreen;