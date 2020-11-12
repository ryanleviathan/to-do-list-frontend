import React, { Component } from 'react'
import request from 'superagent'

export default class Todos extends Component {
    state = {
        todos: [],
        todoName: '',
        priorityNumber: '',
        loading: false
    }

    fetchTodos = async () => {
        const { token } = this.props

        this.setState({ loading: true })
        const response = await request
        .get('https://serene-sea-74397.herokuapp.com/api/todos')
        .set('Authorization', token)

        this.setState({ todos: response.body, loading: false })
    }
    
    componentDidMount = async () => {
        await this.fetchTodos()
    }

    handleSubmit = async (e) => {
        const { priorityNumber, todoName } = this.state
        const { token } = this.props

        e.preventDefault()

        const newTodo = {
            name: todoName,
            priority_number: priorityNumber
        }

        this.setState({ loading: true })

        await request
        .post('https://serene-sea-74397.herokuapp.com/api/todos')
        .send(newTodo)
        .set('Authorization', token)

        await this.fetchTodos()
    }

    handleTodoClick = async (someId) => {
        const { token } = this.props
        
        await request
        .put(`https://serene-sea-74397.herokuapp.com/api/todos/${someId}`)
        .set('Authorization', token)

        await this.fetchTodos()
    }

    render() {

        const {
            todoName,
            priorityNumber,
            loading,
            todos
        } = this.state

        return (
            <div>
                Welcome to your todos!
                <form>
                    <label onSubmit={this.handleSubmit}>
                        Add a todo:
                        <input 
                            value={todoName}
                            onChange={(e) => this.setState({ todoName: e.target.value })}
                        />
                    </label>
                    <label>
                        <input
                            type='number'
                            value={priorityNumber}
                            onChange={(e) => this.setState({ priorityNumber: e.target.value })}
                        />
                    </label>
                        <button>
                            Add todo
                        </button>
                </form>
                {
                    loading
                        ? <img src='https://media.tenor.com/images/fbb7116384610093c02447c7b0d65df1/tenor.gif' alt='Loading' />
                        : todos.map(todo => <div key={`${todo.name}${todo.id}${Math.random()}`} style={{
                            textDecoration: todo.is_completed ? 'line-through' : 'none' }
                            }>
                        name: {todo.name}
                        {
                            todo.is_completed ? '' : <button
                            onClick={() => this.handleTodoClick(todo.id)}>
                                Todo completed
                            </button>
                        }
                    </div>)
                }
            </div>
        )
    }
}
