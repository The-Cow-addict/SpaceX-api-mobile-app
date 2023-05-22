import React from 'react';
import { Text, ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';

type ModalContentProps = {
  selectedRocket: any;
  handleWikipediaPress: () => void;
  closeModal: () => void;
};

const ModalContent: React.FC<ModalContentProps> = ({
  selectedRocket,
  handleWikipediaPress,
  closeModal,
}) => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.modalContent}>
        <Text style={styles.modalText}>Name: {selectedRocket.name}</Text>
        <Text style={styles.modalText}>Active: {selectedRocket.active.toString()}</Text>
        <Text style={styles.modalText}>Country: {selectedRocket.country}</Text>
        <Text style={styles.modalText}>Company: {selectedRocket.company}</Text>
        <Text style={styles.modalText}>Mass (kg): {selectedRocket.mass.kg}</Text>
        <Text style={styles.modalText}>Info: {selectedRocket.description}</Text>
        <Text style={styles.modalText}>Cost per launch: ${selectedRocket.cost_per_launch.toString()}</Text>
        <Text style={styles.modalText}>Engine loss max: {selectedRocket.engines.engine_loss_max}</Text>
        <Text style={styles.modalText}>Engine Layout: {selectedRocket.engines.layout}</Text>
        <Text style={styles.modalText}>Engine thrust: {selectedRocket.engines.thrust_to_weight}</Text>
        <Text style={styles.modalText}>Number of thrusters: {selectedRocket.engines.number}</Text>
        <Text style={styles.modalText}>Propellant 1: {selectedRocket.engines.propellant_1}</Text>
        <Text style={styles.modalText}>Propellant 2: {selectedRocket.engines.propellant_2}</Text>
        <Text style={styles.modalText}>
          Wikipedia:{' '}
          <TouchableOpacity onPress={handleWikipediaPress}>
            <Text style={styles.linkText}>{selectedRocket.wikipedia}</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
      <TouchableOpacity onPress={closeModal}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  modalText : {
    color : 'white',
    fontWeight : 'bold',
    textAlign : 'justify',
    fontSize : 16,
  },
  modalContent: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  closeButton: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
    paddingVertical : 10,
    paddingHorizontal : 20,
    backgroundColor : 'blue',
    borderRadius : 10,
  },
});

export default ModalContent;
