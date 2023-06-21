import { Component,React} from 'react';
import {db} from './FirebaseConfig';
import { ref,onValue, set} from 'firebase/database';


export class Contents extends Component{
    allProducts=[];
    state={
        catagories:[], 
        products:[],
        quantity:0,
    };
    componentDidMount(){
        this.getProducts();
        this.getCatagories();
    }
    handleChange=(quantity)=>
    {
        this.setState({quantity:quantity})
    }
    handleClick=(catagory)=>{
        if(catagory==="All Catagories")
        {
            this.setState({products:this.allProducts})
        }
        else
        {
            this.state.products=this.allProducts;
            const products=this.state.products.filter((product)=>
                product['catagory']===catagory
            )
            this.setState({products:products});
            console.log(products);
        }
    }
    addtocart(product)
    {
        let productid=(Math.random()*99999000).toFixed();
        let cartid=localStorage.getItem('cartid')
        if(cartid==null)
        {
            let cartid=(Math.random()*99999000).toFixed();
            const refrence=ref(db,'shopping-cart/'+cartid+"/items/"+productid);
            set(refrence,{
                    'product':product,
                    'quantity':Number(this.state.quantity)
            });
            localStorage.setItem('cartid',cartid);
        }
        else{
            const refrence=ref(db,'shopping-cart/'+cartid+"/items/"+productid);
            set(refrence,{
                'product':product,
                'quantity':Number(this.state.quantity)
        });
        }
    }
    getProducts(){
        const reference=ref(db,'products');
        onValue(reference,(snapshot)=>{
            let products=snapshot.val();
            this.setState({products:products});
            this.allProducts=products;
            console.log(this.state.products);
            console.log(this.allProducts);
        })
    }
    getCatagories(){
        const reference=ref(db,'catagory');
        onValue(reference,(snapshot)=>{
            let catagories=snapshot.val();
            this.setState({catagories:catagories});
            console.log(catagories);
        })
    }
    render(){
        return(
            <div className='m-3'>
                <div className='row'>
                    <div className='col-3'>
                        <ul className='list-group'>
                            <li key={1} className='list-group-item active' onClick={()=>{this.handleClick("All Catagories")}}>All Catgories</li>
                            {this.state.catagories.map(catagory=>(<li onClick={()=>{this.handleClick(catagory['catagoryname'])}} key={catagory['catagoryname']} className='list-group-item'>{catagory['catagoryname']}</li> ))}

                        </ul>

                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            {this.state.products.map(product=>(<div className='col-4'><div key={product['title']} className="card" style={{width:'18rem'}}>
                                <img src={product['imageUrl']}  className="card-img-top"  alt='image'/>
                                <div className="card-body">
                                    
                                   <h5 className="card-title">{product['title']}</h5>
                                   <h5 className="card-title">{product['price']}</h5>
                                   <div className='row'>
                                       <div className='col-6'>
                                           <select key={product['title']} className="form-select" onClick={(e)=>this.handleChange(e.target.value)}>
                                                <option value="0">Quantity</option>
                                                <option value="1">1</option>
                                               <option value="2">2</option>
                                               <option value="3">3</option>
                                               <option value="4">4</option>
                                               <option value="5">5</option>
                                               
                                           </select>
                                           </div>
                                           <div className='col-6'>
                                   <button className='btn btn-primary' onClick={(e)=>{this.addtocart(product)}}>Add To Cart</button>
                                    </div>
                                

                        </div>

                    </div> 
                </div>
                </div>
                            ))}
            </div>
            </div>
            </div>
            </div>
        );
    }
}