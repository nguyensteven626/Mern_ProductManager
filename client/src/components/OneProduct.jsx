import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';

const OneProduct = (props) => {

    const {id} = useParams();
    const [oneProduct, setOneProduct] = useState("");
    const history = useHistory();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(response=>{
            console.log(response)
            setOneProduct(response.data.product);
        })
        .catch(error => console.log(error))
      }, [id])


    const deleteProduct = (deleteId) =>{
        axios.delete(`http://localhost:8000/api/products/delete/${deleteId}`)
        .then(response => {
            console.log("Deleted");
            history.push("/") //after deleting return home
        })
        .catch(error => console.log(error))
    }


    return (
        <div>
            <h1>{oneProduct.title}</h1>
            {/* {
                JSON.stringify(product)
            } */}
            <p>Price: ${oneProduct.price}</p>
            <p>Description: {oneProduct.description}</p>

            <button onClick={() => deleteProduct(oneProduct._id)}>Delete</button>
            <button><Link to="/">Home</Link></button>
            <button><Link to={`/products/update/${id}`}>Edit</Link></button>
        </div>
        );
};

export default OneProduct;