// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a schema
const schema = buildSchema(`

enum Species {
    Dog 
    Cat
    Frog
}

type Pet {
    name: String!
    species: Species! # use an enum!
}
type Time{
    hour: String!
    minute: String!
    second: String!
}


type Query {
    allPets: [Pet!]! # returns a collection of Pet
    getPet(index: Int!): Pet
    firstPet: Pet
    getTime: Time
    getRandom(range: Int!): Int
}
  



 `)

// challenge 1
 const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
]

// Define a resolver
const root = {
    allPets: () => {
        return petList;
    },
    getPet: ({ index }) => { // index is a param from the query
        return petList[index]
    },
    firstPet: () => {
        return petList[0]
    },

    getTime: () => {
        return {
          hour: new Date().getHours().toString() - 12,
          minute: new Date().getMinutes().toString(),
          second: new Date().getSeconds().toString(),
        };
        
    },

    getRandom:  ({range})  => {
        return Math.floor(Math.random() * range);
     },
    
    
  }

// Create an express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))
  

  // Start this app
const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})
