'use client'
import React,{useReducer} from 'react'

  const reducer = (state, action) => {
  switch (action.type) {
    case "USERNAME":
      return {
        ...state, username: action.usernameValue,
      }
      break;
    case "PASSWORD":
      return {
        ...state, password: action.passwordValue,
      }
      break;
    case "LOGIN":
      return {
        ...state, isLoggedIn: true,
      }
      break;
    case "ERROR":
      return {
        ...state, error: true,
      }
      break;
    case "LOGOUT":
      return {
        ...state, isLoggedIn: false, error: false, username: "", password: "",
      }
      break;
    default:
      break;
  }
}

function Home() {
 
    const [updatedState, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    isLoggedIn: false,
    error: false
  });

  const handleUsernameChange = (event) => {
    dispatch({ type: "USERNAME", usernameValue: event.target.value });
  }

  const handlePasswordChange = (event) => {
    dispatch({ type: "PASSWORD", passwordValue: event.target.value });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (updatedState.username.length !== 0 && updatedState.password.length !== 0) {
      dispatch({ type: "LOGIN" });
    } else {
      dispatch({ type: "ERROR" });
    }
  }

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  return (
    <div id="main">
      { updatedState.isLoggedIn 
      ? 
      <section className='logout-section'>
        <h2>Logged in successfully!</h2>
        <p>Welcome {updatedState.username}!</p>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </section> 
      : 
      <form className='login-form'>
        {updatedState.error ? <p className='invalid-error'>Invalid username or password!</p> : null}
        <section className='username-input'>
          <label>Username: </label>
          <input type="text" placeholder='Username' className='username' onChange={handleUsernameChange} value={updatedState.username} />
        </section>
        <section className='password-input'>
          <label>Password: </label>
          <input type="password" placeholder='Password' className='password' onChange={handlePasswordChange} value={updatedState.password} />
        </section>
        <button className='login-btn' onClick={handleFormSubmit}>Login</button>
      </form> }
    </div>
  )
}

export default Home