import React, {useState} from 'react';
import axios from 'axios';


const Form = (props) => {

    const {allProduct, setAllProduct} = props;
    
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")

    const createProduct = (e) =>{
        e.preventDefault();
        const newProduct = {title, price, description};
        console.log("created", newProduct);
        
        axios.post("http://localhost:8000/api/products/new", newProduct)
        .then(res=> {
            console.log(res.data);
            let allProductCopy = [...props.allProduct];
            allProductCopy.push(newProduct);

            console.log(allProductCopy);
            props.setAllProduct(allProductCopy)
            setTitle("")
            setPrice("")
            setDescription("")
        })
        .catch(error => console.log(error))
    }
        
    return( 
        <div>
            <form onSubmit = { createProduct }>
                <div>
                    <label>Title: </label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}></input>
                </div>
                <div>
                    <label>Price: </label>
                    <input type="number" onChange={(e) => setPrice(e.target.value)} value={price}></input>
                </div>
                <div>
                    <label>Description: </label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} value={description}></input>
                </div>
                <input type = "submit" value="Submit Product"/>
            </form>
        </div>
    )
};

export default Form;