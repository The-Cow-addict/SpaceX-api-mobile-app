import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider,useQuery, gql } from '@apollo/client';
import Components from './Components/Components'
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql', 
  cache: new InMemoryCache(),
})

const RocketQuery = gql`
query RocketQuery {
  rockets {
    id
    wikipedia
    active
    company
    country
    description
    mass {
      kg
    }
    name
    type
    cost_per_launch
    engines {
      engine_loss_max
      layout
      thrust_to_weight
      number
      propellant_1
      propellant_2
      thrust_sea_level {
        kN
      }
      thrust_vacuum {
        kN
      }
      version
    }
  }
  histories {
    details
  }
}
`


export default function App() {
  const [dataQuery, setdataQuery] = useState(RocketQuery)

  return (
      <View style={styles.container}>
      <ImageBackground source={require('./pictures/Pin-on-Animated-Images.gif')} style={styles.imageBackground}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.content}>
        <ApolloProvider client={client}>
        <Components dataQuery={dataQuery}/>
        </ApolloProvider>
      </View>
      </ImageBackground>
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
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width : '100%',
    height : '100%'
  },
});
