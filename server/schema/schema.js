const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLList, 
        GraphQLInt, 
        GraphQLNonNull, } = require('graphql');

//Mongoose models
const Customer = require('../models/Customer')
const Ticket = require('../models/Ticket')

//Tickets
const TicketType = new GraphQLObjectType({
  name: 'Ticket',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString},
    ticketNum: { type: GraphQLString},
    customer: { type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      },
    },
    material: { type: GraphQLString},
    tareWeight: { type: GraphQLInt},
    grossWeight: { type: GraphQLString},
    netWeight: { type: GraphQLString},
    notes: { type: GraphQLString},
  })
});


//Customers
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString}, 
    email: { type: GraphQLString},
    phone: { type: GraphQLString}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tickets: {
      type: GraphQLList(TicketType),
      resolve(parent, args) {
        return Tickets.find();
      }
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Ticket.findById(args.id);
      }
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve(parent, args) {
        Customer.find();
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Customer.findById(args.id);
      }
    },
  }
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type:  GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const Customer = new Customer({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return customer.save();
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});