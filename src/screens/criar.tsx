import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, BackHandler, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './stylescriar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Criar'>;

const CreateProductScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [nome, setNome] = useState('');
  const [qtd, setQtd] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        navigation.navigate('Estoque');
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [navigation])
  );

  const cadastrarProduto = async () => {
    if (!nome || !qtd || !preco) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);

    try {
      
      await addDoc(collection(db, "produtos"), {
        nome: nome,
        quantidade: parseInt(qtd, 10),
        preco: parseFloat(preco.replace(',', '.')),
      });

      console.log("Produto cadastrado com sucesso.");
      
      setLoading(false);
      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      setNome('');
      setQtd('');
      setPreco('');
      navigation.navigate('Estoque');

    } catch (error) {
      setLoading(false);
      console.error("Erro ao cadastrar produto: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o produto.");
    }
  };
  
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#134E3A" />
        </View>
      )}
      <Text style={styles.titleEstoque}>Estoque</Text>
      <Text style={styles.title}>Criar novo produto</Text>

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={qtd} onChangeText={setQtd} keyboardType="numeric" />

      <Text style={styles.label}>Valor</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="decimal-pad" placeholder="R$" />

      <TouchableOpacity style={styles.submitButton} onPress={cadastrarProduto} disabled={loading}>
        <Text style={styles.submitText}>Cadastrar novo produto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProductScreen;