import React, { Component } from 'react'
import request from 'superagent'

export default class Signup extends Component {
    state = {
        email: '',
        password: '',
        loading: false
    }

    handleSubmit = async (e) => {
        e.prevent.default();

        this.setState({ loading: true })
        const user = await request
            .post('')
            .send(this.state)

        this.setState({ loading: false })

        localStorage.setItem('TOKEN', user.body.token)
        localStorage.setItem('USERNAME', user.body.email)
        this.props.history.push('/todos')
    }

    render() {
        return (
            <div>
                <div>
                    Welcome to the Signup page.
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input 
                        onChange={(e) => this.setState({
                            email: e.target.value
                        })}
                        value={this.state.email}
                        />
                    </label>
                    <label>
                        Password:
                        <input />
                    </label>
                </form>
            </div>
        )
    }
}
