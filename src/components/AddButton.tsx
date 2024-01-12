import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const AddButton = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigator.navigate('Nueva Receta')}>
      <Text style={styles.add}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  add: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AddButton;
