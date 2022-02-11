//CRUD

//our controller is importing the Model
const Product = require('../models/product.models');

// module.exports.findAllJokes = (request, response) => {
//     Joke.find()
//         .then(allDaJokes => response.json({ jokes: allDaJokes }))
//         .catch(error => response.json({ message: 'Something went wrong', error: error }));
// }

module.exports = {
    //READ ALL
    findAllProducts: (request, response) => {
        Product.find() //these are promises which gets resolve either by .then or .catch
            //IMPORTANT what we return here is what we receive in REACT!
            // .then(allDaProducts => response.json(allDaProducts)) 
            .then(allDaProducts => response.json({ products: allDaProducts, message: "success" })) //putting it in an object
            .catch(error => response.json({ message: 'Something went wrong', error: error }));
    },
    //READ ONE
    findOneSingleProduct: (request, response) => {
        // Joke.findOne({ _id: request.params.id })
        //or
        Product.findById(request.params.id)
            // .then(oneSingleProduct => response.json(oneSingleProduct))
            .then(oneSingleProduct => response.json({ product: oneSingleProduct }))
            .catch(error => response.json({ message: 'Something went wrong', error: error }));
    },
    //CREATE
    createNewProduct: (request, response) => {
        console.log(request.body) //check what objects are in the body
        const { setup } = request.body;
        Product.create(request.body)//data from the form
            //or
            // Joke.create({setup: setup, punchline: request.body.punchline})
            .then(newlyCreatedProduct => response.json({ product: newlyCreatedProduct }))
            .catch(err => response.json({ message: 'Something went wrong', error: err }));
    },
    //UPDATE
    updateExistingProduct: (request, response) => {
        // /api/jokes/:id
        Product.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true, runValidators: true }
        )
            .then(updatedProduct => response.json({ user: updatedProduct }))
            .catch(err => response.json({ message: 'Something went wrong', error: err }));

        //or

        // Joke.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        //     .then(updatedJoke => response.json({ user: updatedJoke }))
        //     .catch(err => response.json({ message: 'Something went wrong', error: err }));
    },
    //DELETE
    deleteAnExistingProduct: (request, response) => {
        // /api/jokes/:id
        const {id} = request.params
        Product.deleteOne({ _id: request.params.id })
            .then(result => response.json({ result: result }))
            .catch(err => response.json({ message: 'Something went wrong', error: err }));
        //or

        // Joke.findByIdAndDelete(request.params.id)
        //     .then(result => response.json({ result: result }))
        //     .catch(err => response.json({ message: 'Something went wrong', error: err }));
    }
}