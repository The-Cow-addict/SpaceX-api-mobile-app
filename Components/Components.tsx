import { useQuery, DocumentNode , ApolloClient, InMemoryCache, gql} from '@apollo/client';
import { Text, View, StyleSheet, Pressable, Modal, FlatList , Image, ImageBackground, SafeAreaView, ScrollView, Linking, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react'
import {Data} from './data';
import FilterDropdown from './FilterDropdown';
import ModalContent from './ModalContent';
 

type ComponentProps = {
  dataQuery : DocumentNode,
}

type Rocket = {
  id : string,
  name : string
}

const client = new ApolloClient({
    uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
    cache: new InMemoryCache(),
  });

const Components : React.FC<ComponentProps> = ({dataQuery}) => {
  const { loading, error, data } = useQuery(dataQuery);
  const [selectedRocket, setselectedRocket] = useState<any>(null);
  const [showModal, setshowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState<Rocket[]>([]);

  const itemsPerPage = 2;

  const fetchData = async (page: number, limit: number) => {
    const { data } = await client.query({
      query: dataQuery,
      variables: {
        offset: (page - 1) * limit,
        limit,
      },
    });
  
    return data;
  };

  const fetchPageData = async (page: number) => {
    const data = await fetchData(page, itemsPerPage);
  
    const filteredRockets = data?.rockets?.filter((rocket: any) => {
      const rocketName = rocket.name.toLowerCase();
  
      if (selectedFilter === 'Active: true') {
        return rocket.active === true;
      }
  
      if (selectedFilter === 'Active: false') {
        return rocket.active === false;
      }
  
      return (
        rocketName.includes(searchQuery.toLowerCase()) ||
        selectedFilter === 'All'
      );
    });
  
    const totalItems = filteredRockets?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(totalPages);
  
    if (filteredRockets && filteredRockets.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const subset = filteredRockets?.slice(startIndex, endIndex) || [];
      setPageData(subset);
    } else if (searchQuery.trim().length === 0) {
      setPageData(data?.rockets || []);
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [searchQuery, selectedFilter, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchPageData(nextPage);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      fetchPageData(previousPage);
    }
  };

  const handlePress = (rocket : any) => {
    setselectedRocket(rocket)
    setshowModal(true)
  };

  const handleWikipediaPress = () => {
    Linking.openURL(selectedRocket.wikipedia);
  };

  if (loading) {
    return <Text style={{fontWeight : 'bold', color : 'white'}}>Loading...</Text>
  };

  if (error) {
    return <Text>Error: {error.message}</Text>
  };

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
        <View style={styles.filterDropdown}>
        <FilterDropdown 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        </View>
        

      <View style={styles.flatListContainer}>
      <FlatList 
        data={pageData}
        renderItem={({ item }) => renderItem({ item })}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.flatListContent}
      />      
    </View>

    <View style={styles.pagination}>
    <TouchableOpacity
      onPress={goToPreviousPage}
      style={[
        styles.buttonContainer,
        currentPage === 1 ? { backgroundColor: 'gray' } : { backgroundColor: 'blue' }
      ]}
      disabled={currentPage === 1}
    >
      <View style={styles.buttonInnerContainer}>
        <Text style={styles.buttonText}>Previous</Text>
      </View> 
    </TouchableOpacity>

    <View style={{ justifyContent: 'center' }}>
      <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
        {currentPage}
      </Text>
    </View>

    <TouchableOpacity
      onPress={goToNextPage}
      style={[
        styles.buttonContainer,
        currentPage === totalPages ? { backgroundColor: 'gray' } : { backgroundColor: 'blue' }
      ]}
      disabled={currentPage === totalPages}
    >
      <View style={styles.buttonInnerContainer}>
        <Text style={styles.buttonText}>Next</Text>
      </View>
    </TouchableOpacity>
  </View>


  <Modal visible={showModal} animationType="slide">
        <ImageBackground source={require('../pictures/Pin-on-Animated-Images.gif')} style={styles.imageBackground}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              {selectedRocket && (
                <ModalContent
                  selectedRocket={selectedRocket}
                  handleWikipediaPress={handleWikipediaPress}
                  closeModal={() => setshowModal(false)}
                />
              )}
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
    borderColor : 'blue',
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
  flatListContainer : {
    flex : 1,
  },
  flatListContent  : {
    width: '100%'
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
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  filterDropdown : {
    paddingBottom : 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  buttonContainer: {
    flex: 1,
    height: 40,
    marginHorizontal: '5%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  pageContainer: {
    justifyContent: 'center',
  },
  pageText: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Components
