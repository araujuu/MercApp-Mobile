import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import styles from './stylesvisualizar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ADIÇÃO: Imports do Firebase
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

// ALTERADO: ID do produto agora é string para compatibilidade com o Firebase
interface Product {
  id: string; 
  nome: string;
  preco: number;
  imagem?: string;
  quantidade: number;
}

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true); // ADIÇÃO: Estado para controlar o carregamento

  const navigation = useNavigation();

  // REMOVIDO: Toda a lógica do SQLite (dbRef, getDatabase, loadProducts) foi removida.

  // ALTERADO: Efeito para buscar dados do Firebase em tempo real
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const produtosCollection = collection(db, 'produtos');
      const q = query(produtosCollection, orderBy("nome")); // Ordena os produtos por nome

      // onSnapshot "escuta" as mudanças no banco de dados e atualiza a tela automaticamente
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsList);
        setLoading(false);
      }, (error) => {
        console.error("Erro ao buscar produtos do Firebase: ", error);
        setLoading(false);
      });

      // Função de limpeza para parar de "escutar" quando o usuário sair da tela
      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      // Navegue para a tela correta ao pressionar "voltar"
      navigation.navigate('Index' as never); 
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchText(''); // Limpa a busca ao fechar a barra
    }
  };

  // MANTIDO: A lógica de filtro funciona da mesma forma com os dados do Firebase
  // Ela simplesmente filtra o array 'products' que está no estado do componente.
  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.nome}</Text>
        <Text style={styles.price}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
        <Text style={[styles.stock, { color: item.quantidade > 0 ? '#93bf83' : '#bf3f3f' }]}>
          {item.quantidade > 0 ? 'Estoque disponível' : 'Estoque indisponível'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          {searchVisible ? (
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar produto..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          ) : (
            <>
              <TouchableOpacity onPress={() => console.log('Conta pressionada')}>
                <Image source={require('../images/user.png')} style={styles.user} resizeMode="contain" />
              </TouchableOpacity>
              <View style={styles.centerArea}>
                <Image source={require('../images/carrolupa.png')} style={styles.carrolupa} resizeMode="contain" />
              </View>
            </>
          )}
          <TouchableOpacity onPress={toggleSearch}>
            <Image source={require('../images/search.png')} style={styles.lupa} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id} 
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductListScreen;