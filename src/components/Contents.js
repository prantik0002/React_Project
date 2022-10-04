import { Component,React} from 'react';
import {db} from './FirebaseConfig';
import { ref,onValue} from 'firebase/database';
import { Navbar } from './Navbar';
export class Contents extends Component{
    state={
        catagories:[], 
        products:[]
    };
    componentDidMount(){
        this.getProducts();
        this.getCatagories();
    }
    getProducts(){
        const reference=ref(db,'products');
        onValue(reference,(snapshot)=>{
            let products=snapshot.val();
            this.setState({products:products});
            console.log(this.state.products);
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
                            <li key={1} className='list-group-item active'>All Catgories</li>
                            {this.state.catagories.map(catagory=>(<li key={catagory['catagoryname']} className='list-group-item'>{catagory['catagoryname']}</li> ))}

                        </ul>

                    </div>
                    <div className='col-9'>
                        <div className='row'>
                            {this.state.products.map(product=>(<div className='col-4'><div key={product['title']} className="card" style={{width:'18rem'}}>
                                <img src={product['imageUrl']}  className="card-img-top"/>
                                <div className="card-body">
                                   <h5 className="card-title">{product['title']}</h5>
                                   <h5 className="card-title">{product['price']}</h5>
                                   <button className='btn btn-primary'>Add To Cart</button>

                                

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