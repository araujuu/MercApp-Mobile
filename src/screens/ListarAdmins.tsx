import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Admin {
  login: string;
  senha: string;
}

export default function ListarAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    const carregarAdmins = async () => {
      const dados = await AsyncStorage.getItem('admins');
      if (dados) setAdmins(JSON.parse(dados));
    };
    carregarAdmins();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administradores Cadastrados</Text>
      <FlatList
        data={admins}
        keyExtractor={(item, index) => `${item.login}-${index}`}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.login}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, paddingVertical: 5 }
});
