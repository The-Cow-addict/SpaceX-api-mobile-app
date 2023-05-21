import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';



type FilterDropdownProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedFilter: string;
    setSelectedFilter: (filter: string) => void;
  };
  
  const FilterDropdown: React.FC<FilterDropdownProps> = ({
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
  }) => {
    const filterOptions = [
      { label: 'Name', value: 'Name' },
      { label: 'Active: true', value: 'Active: true' },
      { label: 'Active: false', value: 'Active: false' },
    ];
  
    const handleFilterSelect = (filter: string) => {
      setSelectedFilter(filter);
      setSearchQuery('');
    };
  
    return (
      <View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search rockets..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
  
        <Picker
          selectedValue={selectedFilter}
          style={styles.dropdown}
          onValueChange={handleFilterSelect}
        >
          {filterOptions.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    searchBar: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor : 'gray'
    },
    dropdown: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      backgroundColor : 'gray',
      borderRadius: 4,
    },
  });
  
  export default FilterDropdown;
  