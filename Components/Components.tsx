import { useQuery, DocumentNode , gql} from '@apollo/client';
import { Text, View, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import {useState} from 'react'


type ComponentProps = {
  dataQuery : DocumentNode
}

const Components : React.FC<ComponentProps> = ({dataQuery}) => {
  const { loading, error, data } = useQuery(dataQuery)
  const [selectedRocket, setselectedRocket] = useState<any>(null)
  const [showModal, setshowModal] = useState(false)

  const handlePress = (rocket : any) => {
    setselectedRocket(rocket)
    setshowModal(true)
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const renderItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => handlePress(item)} style={styles.card}>
      <Text style={styles.cardText}>Name: {item.name}</Text>
      <Text style={styles.cardText}>Active: {item.active.toString()}</Text>
      <Text style={styles.cardText}>Country: {item.country}</Text>
      <Text style={styles.cardText}>Company: {item.company}</Text>
      <Text style={styles.cardText}>Mass (kg): {item.mass.kg}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* {data.rockets.map((rocket : any, index : number ) => (
        <View key={index}>
          <Pressable onPress={() => handlePress(rocket)}>
            <Text>Name: {rocket.name}</Text>
            <Text>Active: {rocket.active.toString()}</Text>
            <Text>Country: {rocket.country}</Text>
            <Text>Company: {rocket.company}</Text>
            <Text style={styles.container}>Mass (kg): {rocket.mass.kg}</Text>
          </Pressable>
        </View>
      ))} */}
      <View style={styles.flatListContainer}>
        <FlatList 
          data={data.rockets}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          // contentContainerStyle={styles.firstCardContainer}
        />
      </View>
    

    <Modal visible={showModal} animationType='slide' transparent>
     <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        {selectedRocket && (
          <>
            <Text>Name: {selectedRocket.name}</Text>
            <Text>Active: {selectedRocket.active.toString()}</Text>
            <Text>Country: {selectedRocket.country}</Text>
            <Text>Company: {selectedRocket.company}</Text>
            <Text>Mass (kg): {selectedRocket.mass.kg}</Text>
            <Text>Info : {selectedRocket.description}</Text>
        </>
        )}
            <Pressable onPress={() => setshowModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </View>
     </View>
    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical : 50
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 10,
    marginVertical : 5,
    borderRadius: 8,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    textAlign : 'justify',
  },
  modalWrapper :{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    marginTop: 20,
  },
  flatListContainer : {
    flexGrow : 1,
  },
});

export default Components
