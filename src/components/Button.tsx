import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface IButtonProps {
  onPress: () => void;
  title: string;
  danger?: boolean;
}

const Button = (props: IButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: props.danger ? 'red' : 'blue'}]}
      onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    tintColor: 'white',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 16,
  },
});

export default Button;
