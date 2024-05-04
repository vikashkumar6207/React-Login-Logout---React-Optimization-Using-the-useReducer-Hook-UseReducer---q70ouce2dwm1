'use client'
import React, {useReducer}  from 'react';

const reducer = (state, action) => {
  switch (action.type){
    case "USERNAME" :
      return {
        ...state, username : action.usernameValue,
      }
      break;
      case "PASSWORD" :
        return {
          ...state, password: action.passwordValue,
        }
        break;
        case "LOGIN" :
          return {
            ...state, isLoggedIn: true,
          }
          break;
          case "ERROR":
            return{
              ...state, error: true,
            }
            break;
            case "LOGOUT" :
              return {
                ...state, isLoggedIn: false, error: false, username: "", password: "",
              }
              break;
              default:
                break;
  } 

}

function Home() {
  const [updateState, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    isLoggedIn: false,
    error: false
  });

  const handleUsernameChange = (event) => {
    dispatch({type: "USERNAME", usernameValue: event.target.value});
  }

  const handlePasswordChange = (event) => {
    dispatch({type: "PASSWORD", passwordValue: event.target.value});
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(updateState.username.length !== 0 && updateState.password.length !== 0){
      dispatch({type: "LOGIN"});
    }else {
      dispatch({type: "ERROR"});
    }
  }
  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }
  return (
    <div id="main">
      {updateState.isLoggedIn ? 
      <section className='logout-section'>
        <h2>Logged in successfully!</h2>
        <p>Welcome username!</p>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      </section> : 
      <form className='login-form'>
        {/* <p className='invalid-error'>Invalid username or password!</p> */}
        <section className='username-input'>
          <label>Username: </label>
          <input type="text" placeholder='Username' className='username' value={updateState.username} onChange={(handleUsernameChange)} />
        </section>
        <section className='password-input'>
          <label>Password: </label>
          <input type="password" placeholder='Password' className='password' onChange={handlePasswordChange} value={updateState.password} />
        </section>
        <button className='login-btn' onClick={handleFormSubmit}>Login</button>
      </form>
  }
    </div>
  )
}

export default Home
