import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import DisplayAll from './components/DisplayAll';
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct';
import { Switch, Route, Link } from 'react-router-dom';

function App() {

  const [allProduct, setAllProduct] = useState([])

  useEffect( () => {//triggers when the components finishes
    axios.get("http://localhost:8000/api/products")
      .then(response => {
        console.log(response.data.products)
        setAllProduct(response.data.products)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <h1>Products Manager</h1>
      <br/>
      {/* {
        JSON.stringify(allProduct)
      } */}
      <Switch>

      <Route path= "/products/update/:id">
        <EditProduct/>
      </Route>

      <Route path = "/products/:id">
        <OneProduct/>
      </Route>

      <Route path = "/">
        <Form allProduct = {allProduct} setAllProduct = {setAllProduct}/>
        <DisplayAll allProduct = {allProduct} setAllProduct = {setAllProduct}/>
      </Route>

      </Switch>
    </div>
  );
}

export default App;
