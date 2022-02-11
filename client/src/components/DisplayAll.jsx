import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';


const DisplayAll = (props) => {

    const {allProduct, setAllProduct} = props;
    const history = useHistory();

    
    useEffect( () => {//triggers when the components finishes
        axios.get("http://localhost:8000/api/products")
          .then(response => {
            console.log(response.data.products)
            setAllProduct(response.data.products)
          })
          .catch(err=>{ console.log(err); }) },[]);

    


    const deleteProduct = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/products/delete/${deleteId}`)
        .then(response => {

            console.log("Deleted");
            const resultArray = props.allProduct.filter(p => p._id != deleteId);
            console.log(resultArray);
            props.setAllProduct(resultArray);
        })
        .catch(error => console.log(error))
    }



    return (
        <div>
            <h1>Products</h1>
            <br/>
            {/* {
                JSON.stringify(allProduct)
            } */}
            <div>
            {
                props.allProduct.map((p,idx) => {
                    return(
                        <div key={idx}>
                            <Link to={`/products/${p._id}`}>Title: {p.title}</Link>
                            <p>Price: ${p.price}</p>
                            <p>Description: {p.description}</p>
                            <button onClick={() => deleteProduct(p._id)}>Delete</button>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
};

export default DisplayAll;