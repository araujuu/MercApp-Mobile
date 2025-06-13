import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, BackHandler } from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import styles from './styleseditar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Editar'>;

const EditProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;

  const [nome, setNome] = useState('');
  const [qtd, setQtd] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState<string | undefined>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'produtos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNome(data.nome);
          setQtd(data.quantidade.toString());
          setPreco(data.preco.toString());
          setImagem(data.imagem || undefined);
        } else {
          Alert.alert('Produto não encontrado.');
          navigation.goBack();
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        Alert.alert("Erro ao buscar produto.");
      }
    };

    fetchProduct();
  }, [id]);

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

    try {
      const docRef = doc(db, 'produtos', id);
      await updateDoc(docRef, {
        nome,
        quantidade: parseInt(qtd),
        preco: parseFloat(preco),
        imagem: imagem || null,
      });

      Alert.alert("Produto atualizado com sucesso!");
      navigation.navigate('Estoque');
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      Alert.alert("Erro ao atualizar produto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleEstoque}>Estoque</Text>
      <Text style={styles.title}>Editar produto</Text>

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput style={styles.input} value={qtd} onChangeText={setQtd} keyboardType="numeric" />

      <Text style={styles.label}>Valor</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="decimal-pad" placeholder="R$" />

      {imagem && (
        <Image source={{ uri: imagem }} style={{ width: 100, height: 100, borderRadius: 10, marginBottom: 10 }} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={atualizarProduto}>
        <Text style={styles.submitText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProductScreen;

