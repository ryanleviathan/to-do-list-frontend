import React, { Component } from 'react'
import request from 'superagent'

export default class Todos extends Component {
    state = {
        todos: []
    }
    
    componentDidMount = async () => {
        const response = await request.get('')
        .set('Authorization', )

        this.setState({ todos: response.body })
    }

    render() {
        return (
            <div>
                Welcome to your todos!
                {
                    Boolean(this.state.todos.length) && this.state.todos.map(todo => <div>
                        name: {todo.name}
                        priority number: {todo.priority_number}
                        completed: {todo.is_completed}
                        </div>)
                }
            </div>
        )
    }
}
