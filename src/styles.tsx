import {StyleSheet} from 'react-native';

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    marginTop: 2,
    marginBottom: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 2,
  },
  itemText: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default appStyles;
