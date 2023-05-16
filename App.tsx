import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider,useQuery, gql } from '@apollo/client';
import Components from './Components/Components'
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql', // Replace with your GraphQL API endpoint
  cache: new InMemoryCache(),
})

const RocketQuery = gql`
query RocketQuery {
  rockets {
    active
    company
    country
    description
    mass {
      kg
    }
    name
    type
  }
}
`


export default function App() {
  const [dataQuery, setdata] = useState(RocketQuery)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ApolloProvider client={client}>
        <Components dataQuery={dataQuery}/>
        </ApolloProvider>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content : {
    alignItems : 'center',
    justifyContent : 'center'
  }
});
