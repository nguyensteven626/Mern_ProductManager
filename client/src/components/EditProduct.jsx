import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useHistory, Link} from 'react-router-dom';

const EditProduct = (props) => {
    
    const {id} = useParams();
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory();

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(response=> {
            console.log(response.data.product);
            setTitle(response.data.product.title)
            setPrice(response.data.product.price)
            setDescription(response.data.product.description)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

    const updateOneProduct = (e) => {
        e.preventDefault();
        const updateOneProduct = {
            title: title,
            price: price,
            description: description
        }
        axios.put(`http://localhost:8000/api/products/update/${id}`, updateOneProduct)
        .then(response => {
            console.log(response.data);
            history.push(`/products/${id}`)
        })
        .catch(error =>{
            console.log(error)
        })
    }
        
    return( 
        <div>
            <form onSubmit = { updateOneProduct }>
                <div>
                    <label>Title: </label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                </div>
                <div>
                    <label>Price: $</label>
                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price}></input>
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description}></input>
                </div>
                <input type = "submit" value="Update Product"/>
                <button><Link to="/">Home</Link></button>
            </form>
        </div>
    )
};

export default EditProduct;