import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import appStyles from '../styles';
import {Ingredient} from '../database/ingredient';
import {Unit} from '../types';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import {AppDataSource} from '../database';

const pickerItems: {label: string; value: string}[] = Object.keys(Unit)
  .filter(key => !Number.isInteger(key))
  .map(k => ({
    label: Unit[k],
    value: k,
  }));

const IngredientsScreen = () => {
  const navigator = useNavigation();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [search, setSearch] = useState<string>('');

  const [itemSelected, setItemSelected] = useState<Ingredient | undefined>();
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const [newIngredientModalVisible, setNewIngredientModalVisible] =
    useState(false);

  const [amount, setAmount] = useState<number>(0);

  const [newIngredient, setNewIngredient] = useState<
    {name: string; unit: Unit} | undefined
  >();

  useEffect(() => {
    const repository = AppDataSource.getRepository(Ingredient);
    repository.find().then(r => {
      setIngredients(r);
    });
  }, []);

  const addIngredient = ({
    name,
    unit,
    amount,
  }: {
    name: string;
    unit: string;
    amount: number;
  }) => {
    const repository = AppDataSource.getRepository(Ingredient);
    repository.save({name, unit, amount}).then(r => {
      setIngredients([...ingredients, r]);
      setItemSelected(undefined);
      setAmount(0);
      navigator.navigate(
        'Nueva Receta',
        {ingredient: r, amount: amount},
        {merge: true},
      );
    });
  };

  return (
    <View style={appStyles.container}>
      {newIngredientModalVisible ? (
        <View>
          <TextInput
            onChangeText={v => {
              setNewIngredient({...newIngredient, name: v});
            }}
            style={appStyles.input}
            placeholder={'Nombre del nuevo ingrediente...'}
            keyboardType="default"
          />
          <View style={styles.row}>
            <Text style={appStyles.label}>Cantidad: </Text>
            <TextInput
              onChangeText={v => setAmount(parseInt(v, 10))}
              style={[appStyles.input, {flex: 1}]}
              placeholder={'0'}
              keyboardType="numeric"
            />
            <View style={[appStyles.label, {flex: 7, marginLeft: 4}]}>
              <RNPickerSelect
                placeholder={{
                  label: 'Selecciona una opción',
                  value: null,
                }}
                onValueChange={value => {
                  setNewIngredient({...newIngredient, unit: value});
                }}
                items={pickerItems}
                style={{
                  inputIOS: {
                    fontSize: 16,
                  },
                }}
                value={newIngredient?.unit}
              />
            </View>
          </View>
          <View style={[styles.row, {justifyContent: 'space-around'}]}>
            <Button
              danger
              title="Cancelar"
              onPress={() => {
                setNewIngredientModalVisible(false);
              }}
            />
            <Button
              title="Agregar"
              onPress={() => {
                if (newIngredient?.name && newIngredient?.unit && amount > 0) {
                  addIngredient({
                    name: newIngredient.name,
                    unit: newIngredient.unit,
                    amount,
                  });
                  setNewIngredientModalVisible(false);
                }
              }}
            />
          </View>
        </View>
      ) : (
        <>
          <TextInput
            onChangeText={v => {}}
            style={appStyles.input}
            placeholder="Buscar ingrediente"
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.addIngredient}
            onPress={() => {
              setNewIngredientModalVisible(true);
            }}>
            <Text style={styles.addIngredientText}>
              + Agregar nuevo ingrediente
            </Text>
          </TouchableOpacity>
          <ScrollView>
            {ingredients.map(ingredient => (
              <View style={styles.itemContainer} key={ingredient.id}>
                <Text style={appStyles.itemText}>{ingredient.name}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    setItemSelected(ingredient);
                    setAmountModalVisible(true);
                  }}>
                  <Text style={styles.addButtonText}>agregar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      )}
      <Modal visible={amountModalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              <Text style={appStyles.label}>{itemSelected?.name}</Text>
              <TextInput
                onChangeText={v => setAmount(parseInt(v, 10))}
                style={[appStyles.input, {width: 100}]}
                placeholder={`Cantidad en ${Unit[itemSelected?.unit]}`}
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Agregar"
              onPress={() => {
                const item = {...itemSelected};
                setAmountModalVisible(false);
                setTimeout(() => {
                  setItemSelected(undefined);
                  navigator.navigate(
                    'Nueva Receta',
                    {ingredient: item, amount: amount},
                    {merge: true},
                  );
                }, 200);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    padding: 8,
  },
  addButtonText: {
    color: 'blue',
    fontSize: 12,
  },
  addIngredient: {
    marginVertical: 8,
    alignSelf: 'flex-end',
  },
  addIngredientText: {
    color: 'gray',
  },
});

export default IngredientsScreen;
