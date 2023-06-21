import {React} from 'react';
import { Component } from 'react';
import { auth,db } from './FirebaseConfig';
import { ref,onValue, remove } from 'firebase/database';
import { onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';

export class ShoppingCart extends Component{

state={
    products:{},
    sum:0,
}
componentDidMount(){

    let cartid=localStorage.getItem('cartid');
    let refrence=ref(db,'shopping-cart/'+cartid+'/items');
    onValue(refrence,(snapshot)=>{
        let items=snapshot.val();
        this.setState({products:items});
        console.log(this.state.products);
        this.calculatetotal();
    });
}
handleDelete=(product)=>{
    //console.log(product);
    let products={...this.state.products};
    //console.log(products);
    delete products[product];
    this.setState({products:products});
    let cartid=localStorage.getItem('cartid');
    remove(ref(db,'shopping-cart/'+cartid+'/items/'+product));
}
handleClick=()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user)
        {
            //logic of payment gateway
        }
        else
        {
            signInWithRedirect(auth,new GoogleAuthProvider())
        }
    })
}
render(){
    return(<div className='container'>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(this.state.products).map((product,i)=>(<tr>
                    <th scope="row">{i+1}</th>
                    <td>{this.state.products[product].product.title}</td>
                    <td>{this.state.products[product].product.price}</td>
                    <td>{this.state.products[product].quantity}</td>
                    <td>{this.state.products[product].quantity*this.state.products[product].product.price}</td>
                    <td><button className='btn btn-danger ps-4 pe-4' onClick={()=>{this.handleDelete(product)}}>delete</button></td>
                </tr>))}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><button className='btn btn-success pe-3 active' onClick={this.handleClick}>checkout</button></td>
                </tr>
            </tfoot>
        </table>
    </div>
    
    );
}
}