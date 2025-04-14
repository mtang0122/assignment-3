import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {
	constructor () {  // Create and initialize state
		super();
		this.state = {
			user: {
			userName: '',
			password: ''
		},
		redirect: false  // Redirect property used to trigger Redirect
	};
}

// When the user name input changes, capture the input and update the state (user.userName)
handleChange = (e) => {
	// Create an object for state's user properties
	const updatedUser = {...this.state.user};  
	// Set object's userName to the new input value
	updatedUser.userName = e.target.value; 
	// Update state with object values 
	this.setState({user: updatedUser})  
}

// When user clicks on "Log In" button, store user data and then redirect to "User Profile" page
handleSubmit = (e) => {
	e.preventDefault()
	this.props.mockLogIn(this.state.user)
	this.setState({redirect: true})  // Update state to trigger Redirect
}

render () {
	if (this.state.redirect) {  // Redirect to "User Profile" page 
		return (<Redirect to="/userProfile"/>);
	}
	// Render the login form
	return (
		<div>
		<h1>Login</h1>
		<form onSubmit={this.handleSubmit}>
			<div>
			<label>User Name: </label>
			<input type="text" name="userName" onChange={this.handleChange} />
			</div>
			<div>
			<label>Password: </label>
            <input type="password" name="password" />
			</div>
		<button>Log In</button>
        </form>
		</div>
		);
	}
}

export default LogIn;
