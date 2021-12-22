import './App.css';

import { Router, Link, navigate } from "@reach/router";

import Posts from './components/posts'

let Home = () => {
  return(
  <div class="card text-center w-50 mx-auto">
    <div class="card-header">
      Login
    </div>
    <div class="card-body">
    <form 
      onSubmit={event => {
        event.preventDefault()
        const user = event.target.elements[0].value
        event.target.reset()

        navigate(`/posts/${user}`)
      }}
    >
      <div class="mb-3">
        <label for="user" class="form-label">username</label>
        <input type="text" class="form-control" id="user" placeholder='Enter UserName' required/>
      </div>
      <button type="submit" class="btn btn-primary">Continue</button>
    </form>
    </div>
  </div>
  )
}

function App() {
  return (
    <div class="container-fluid">
    <Router>
      <Home path="/" />
      <Posts path="/posts/:user" />
    </Router>
    </div>
  );
}


export default App;
