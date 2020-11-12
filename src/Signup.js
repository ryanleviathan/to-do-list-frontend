import React, { Component } from 'react'
import request from 'superagent'

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = await request
            .post('https://serene-sea-74397.herokuapp.com/auth/signup')
            .send(this.state)

        this.setState({ loading: false })

        this.props.handleTokenAndUsernameChange(user.body.token, this.body.email)

        this.props.history.push('/todos')
    }

    render() {
        return (
            <div>
                <div>
                    Signup
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input 
                        onChange={(e) => this.setState({email: e.target.value})}
                        value={this.state.email}
                        />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({password: e.target.value})}
                        value={this.state.password}
                        type='password'
                        />
                    </label>
                    {
                        this.state.loading
                        ? <img src='https://media.tenor.com/images/fbb7116384610093c02447c7b0d65df1/tenor.gif' alt='Loading' />
                        : <button>
                            Sign up!
                        </button>
                    }
                </form>
            </div>
        )
    }
}
