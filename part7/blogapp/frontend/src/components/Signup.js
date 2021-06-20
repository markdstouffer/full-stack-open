import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Signup = ({ handleSignup, name, username, password, setUsername, setPassword, setName }) => {

  return (
    <div className="Login">
      <h2>Log in to application</h2>
      <Form onSubmit={handleSignup}>
        <Form.Group>
          <Form.Label>name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit">login</Button>
        <Link style={{ float: 'right' }} to="/">go to login</Link>
      </Form>
    </div>
  )
}

export default Signup