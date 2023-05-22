import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
}) => {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        onPress={goToPreviousPage}
        style={[
          styles.buttonContainer,
          currentPage === 1 ? { backgroundColor: 'gray' } : { backgroundColor: 'blue' },
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
          currentPage === totalPages ? { backgroundColor: 'gray' } : { backgroundColor: 'blue' },
        ]}
        disabled={currentPage === totalPages}
      >
        <View style={styles.buttonInnerContainer}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
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
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Pagination;
