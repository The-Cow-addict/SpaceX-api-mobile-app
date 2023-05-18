import { useQuery, DocumentNode , gql} from '@apollo/client';
import { Text, View, StyleSheet, Pressable, Modal, FlatList , Image, ImageBackground, SafeAreaView, ScrollView, Linking, TouchableOpacity, TextInput} from 'react-native';
import {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import {Data} from './data'

type ComponentProps = {
  dataQuery : DocumentNode
}

const Components : React.FC<ComponentProps> = ({dataQuery}) => {
  const { loading, error, data } = useQuery(dataQuery)
  const [selectedRocket, setselectedRocket] = useState<any>(null)
  const [showModal, setshowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress = (rocket : any) => {
    setselectedRocket(rocket)
    setshowModal(true)
  }

  const filteredRockets = searchQuery
  ? data?.rockets?.filter((rocket: any) =>
      rocket.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data?.rockets;
  

  const handleWikipediaPress = () => {
    Linking.openURL(selectedRocket.wikipedia);
  };

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const renderItem = ({ item }: { item: any }) => {
    const dataItem = Data.find((dataItem) => dataItem.id === item.id);
    return (
      <Pressable onPress={() => handlePress(item)} style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: dataItem?.imageUrl }} style={styles.image} resizeMode='contain'/>
        </View>
        <View style={styles.line} />
          <View style={styles.bottomContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.cardText}>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <View style={styles.flatListContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search rockets..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {data && data.rockets ? (
          <FlatList 
            data={filteredRockets}
            renderItem={({ item }) => renderItem({ item })}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    

    <Modal visible={showModal} animationType='slide'>
    <ImageBackground source={require('../pictures/Pin-on-Animated-Images.gif')} style={styles.imageBackground}>
     <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        {selectedRocket && (
          <>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalText}>Name: {selectedRocket.name}</Text>
            <Text style={styles.modalText}>Active: {selectedRocket.active.toString()}</Text>
            <Text style={styles.modalText}>Country: {selectedRocket.country}</Text>
            <Text style={styles.modalText}>Company: {selectedRocket.company}</Text>
            <Text style={styles.modalText}>Mass (kg): {selectedRocket.mass.kg}</Text>
            <Text style={styles.modalText}>Info : {selectedRocket.description}</Text>
            <Text style={styles.modalText}>Cost per lauch : ${selectedRocket.cost_per_launch.toString()}</Text>
            <Text style={styles.modalText}>Engine loss max : {selectedRocket.engines.engine_loss_max}</Text>
            <Text style={styles.modalText}>Engine Layout : {selectedRocket.engines.layout}</Text>
            <Text style={styles.modalText}>Engine thrust : {selectedRocket.engines.thrust_to_weight}</Text>
            <Text style={styles.modalText}>Number of thrusters : {selectedRocket.engines.number}</Text>
            <Text style={styles.modalText}>Propellant 1 : {selectedRocket.engines.propellant_1}</Text>
            <Text style={styles.modalText}>Propellant 2 : {selectedRocket.engines.propellant_2}</Text>
            <Text style={styles.modalText}>
              Wikipedia :{' '}
              <TouchableOpacity onPress={handleWikipediaPress}>
                <Text style={styles.linkText}>{selectedRocket.wikipedia}</Text>
              </TouchableOpacity>
            </Text>
          </ScrollView>
        </>
        )}
            <Pressable onPress={() => setshowModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
     </View>
     </ImageBackground>
    </Modal>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    width : '100%',
    height : '100%'
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    borderWidth : 1,
    borderColor : 'blue'
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight : 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  modalWrapper :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color : 'white'
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
  flatListContainer : {
    flexGrow : 1,
    flex : 1,
  },
  flatListContent  : {
    paddingTop : 15
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  imageContainer: {
    aspectRatio: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  activeContainer: {
    justifyContent: 'flex-end',
  },
  line : {
    borderBottomColor : 'gray',
    borderBottomWidth : 1,
    marginBottom : 5,
    marginTop : 5,
  },
  modalText : {
    color : 'white',
    fontWeight : 'bold',
    textAlign : 'justify',
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  searchBar: {
    height: 40,
    backgroundColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color : 'white'
   }
});

export default Components
