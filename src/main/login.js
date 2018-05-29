import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const Cookies = require('js-cookie')

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:'',
			login: false,
			user: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();
    axios(`http://api.ems.test/login`, {
			method: "post",
			data: {username: this.state.username, password: this.state.password},
			withCredentials: 'include'
		})
      .then(res => {
				console.log('Res: ', res)
				//this.setState({user:res.data})
				//Cookies.get()
      })
			.catch(function (error) {
		    alert(error);
		  })
	}

  render() {
		if (this.state.user) {
			return <Redirect to={{pathname: '/',state: this.state.user}}/>
		}
    return (
			<div>
				{this.state.login}
				Fill this out:

				<form onSubmit={this.handleSubmit}>
	        <label>
	          Username:
	          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
	        </label>
	        <label>
	          Password:
	          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
	        </label>
	        <input type="submit" value="Submit" />
	      </form>
			</div>
    );
  }
}

export default Login
