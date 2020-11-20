import React from "react";
import Product from "../components/Product";

export default class HomeScreen extends React.Component {
    
    
    render() {
        const {datas, match: {params}} = this.props;
        console.log(JSON.stringify(datas[0].price) + " ueue12")
            return(
                <div>
                    <div className="row center">
                        {
                            datas.map(product => (
                                <Product key={product._id} product={product}></Product>
                            ))
                        }
                    </div>
                </div>  
        );
    }}
   
   /*
    const {cc}=props
console.log( JSON.stringify(cc) + " homescreen")
    return(
        <div>
            <div className="row center">
                {
                    data.products.map(product => (
                        <Product key={product._id} product={product}></Product>
                    ))
                }
            </div>
        </div>
    )
    


    <React.Fragment>
            <h1>Greeting page</h1>
            <p>
              {datas[0].name} 
            </p>
          </React.Fragment>
}*/