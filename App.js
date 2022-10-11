import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import * as Contacts from'expo-contacts';


export default function App() {

  const [lista, setLista] = useState([]);


  const getContacts = async () => {
    setLista([]);
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      for (var i = 0; i < data.length; i++) {
        setLista(lista => [...lista, {key: data[i].name + " " + data[i].phoneNumbers[0].number}]);
      }
    }
  }

  console.log(lista);

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        renderItem={({item}) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Get Contact" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
