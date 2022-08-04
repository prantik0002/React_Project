import {Link} from 'react-router-dom';
import {Component} from 'react';
import React from 'react';
import { GoogleAuthProvider, signInWithRedirect,signOut,onAuthStateChanged } from 'firebase/auth';
import {auth} from './FirebaseConfig';
export class Navbar extends Component{
    state={
        loginstatus:'',
    }
    componentDidMount(){
        onAuthStateChanged(auth,(user)=>{
            if(user)
            this.setState({loginstatus:true})
            else
            this.setState({loginstatus:false})
        })
    }
    login(){
        signInWithRedirect(auth,new GoogleAuthProvider());  
    }
    logout(){
        signOut(auth);
    }



render(){
    return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">YourMart</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shopping-cart">Cart</Link>
          </li>
          <li className="nav-item">
              {!(this.state.loginstatus) &&<a className="nav-link" onClick={this.login}>Login</a>}
          </li>
          <li className="nav-item">
              {this.state.loginstatus &&<a className="nav-link" onClick={this.logout}>Logout</a>}
          </li>
          
        </ul>
        
      </div>
    </div>
  </nav>);
}
}
