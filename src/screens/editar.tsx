// src/screens/editar.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, BackHandler } from 'react-native';
import styles from './styleseditar';
import * as SQLite from 'expo-sqlite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Editar'>;

const EditProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, nome: initialNome, quantidade: initialQtd, preco: initialPreco} = route.params;

  const [nome, setnome] = useState(initialNome);
  const [qtd, setqtd] = useState(initialQtd.toString());
  const [preco, setPrice] = useState(initialPreco.toString());

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Estoque');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);


  const atualizarProduto = async () => {
    if (!nome || !qtd || !preco) {
      Alert.alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const db = await SQLite.openDatabaseAsync('produtos.db');
    await db.runAsync(
      "UPDATE produtos SET nome = ?, quantidade = ?, preco = ?, imagem = ? WHERE id = ?",
      [nome, parseInt(qtd), parseFloat(preco) || '', id]
    );

    Alert.alert("Produto atualizado com sucesso!");
    navigation.navigate('Estoque');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleEstoque}>Estoque</Text>
      <Text style={styles.title}>Editar produto</Text>

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setnome} />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={qtd} onChangeText={setqtd} keyboardType="numeric" />

      <Text style={styles.label}>Valor</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="R$" />

      <TouchableOpacity style={styles.submitButton} onPress={atualizarProduto}>
        <Text style={styles.submitText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProductScreen;
