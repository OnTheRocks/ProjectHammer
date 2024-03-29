import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Ticket from './pages/Ticket';
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        customers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        tickets: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5400/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Tickets/:id' element={<Ticket />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>        
        </Router>
      </ApolloProvider>
    </>    
  );
}

export default App;
