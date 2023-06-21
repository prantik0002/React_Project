import {Link} from 'react-router-dom';
import {Component} from 'react';
import React from 'react';
import { GoogleAuthProvider, signInWithRedirect,signOut,onAuthStateChanged } from 'firebase/auth';
import {auth,db} from './FirebaseConfig';
import { ref,onValue,remove } from 'firebase/database';
export class Navbar extends Component{
    state={
        loginstatus:'',
        productsInCart:0,
    }
    componentDidMount(){
        onAuthStateChanged(auth,(user)=>{
            if(user)
            this.setState({loginstatus:true})
            else
            this.setState({loginstatus:false})
        })
        let cartid=localStorage.getItem('cartid');
        console.log(cartid);
        if(cartid!=null)
        {
          try{

          
          const refernce=ref(db,'shopping-cart/'+cartid+'/items');
          onValue(refernce,(snapshot)=>{
            let productsInCart=snapshot.val();
            console.log(productsInCart);
            if(productsInCart!=null)
            this.setState({productsInCart:(Object.keys(productsInCart).length)});
            else
            {
              this.state.productsInCart=0;
              this.setState({productsInCart:this.state.productsInCart});
            }

          })
        }
        catch(error)
        {
          console.log(error);
        }
    }
  }
    login(){
        signInWithRedirect(auth,new GoogleAuthProvider());  
    }
    logout(){
      let cartid=localStorage.getItem('cartid');
      remove(ref(db,'shopping-cart/'+cartid));
        signOut(auth);
    }



render(){
    return(<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="#">YourMart</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="btn btn-warning" to="/shopping-cart">Shopping Cart
            <span className="badge bg-danger ms-1" >{this.state.productsInCart}</span>
            </Link>
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
