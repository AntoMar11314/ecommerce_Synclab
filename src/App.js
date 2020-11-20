import React from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

import Product from './components/Product';



class App extends React.Component {
  
    constructor(props){
        super(props)

        this.state = {
            data: []
        }
    }
  async componentDidMount(){
     const url='http://localhost:3000/products'
      const response= await fetch(url);
      const ciao=await response.json();
     this.setState({persons: ciao})
     const data1=this.state.persons;
     // console.log(data1);
  }


    render(){
                //{...props} data1={dd}
        
       if(this.state.persons!=null){ console.log(JSON.stringify(this.state.persons) + " render")
    return (
        <BrowserRouter>
        <div className="grid-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">ecommerce</a>
                </div>
                <div>
                    <a href="/Login">Accedi</a>
                    <a href="/signin">Registrati</a>
                </div>
            </header>
            <main>
                <Route path="/product/:id" render={(props) => <ProductScreen  datas={this.state.persons} {...props} />}></Route>
                <Route path="/" render={(props) => <HomeScreen  datas={this.state.persons} {...props} />}  exact></Route> 
            </main>
            <footer className="row center">
                Tutti i diritti riservati
            </footer>
        </div>
        </BrowserRouter>
    )
    }else{return null}
}
}

export default App;
