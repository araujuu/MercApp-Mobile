import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, Modal, BackHandler } from 'react-native';
import styles from './stylesestoque';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Estoque'>;

interface Product {
  id: string;
  nome: string;
  quantidade: number;
  preco: number;
}

const InventoryScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const produtosCollection = collection(db, 'produtos');
      const unsubscribe = onSnapshot(produtosCollection, (snapshot) => {
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsList);
      });
      return () => unsubscribe();
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Login');
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const getSelectedProduct = () => products.find(p => p.id === selectedProductId);

  const handleSelect = (id: string) => {
    setSelectedProductId(id === selectedProductId ? null : id);
  };

  const handleDelete = () => {
    if (!selectedProductId) {
      Alert.alert('Atenção', 'Selecione um produto primeiro');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    try {
      await deleteDoc(doc(db, 'produtos', selectedProductId));
      Alert.alert('Sucesso', 'Produto excluído com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir produto: ", error);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    } finally {
      setShowConfirmModal(false);
      setSelectedProductId(null);
    }
  };

  const handleEdit = () => {
    if (!selectedProductId) {
      Alert.alert('Atenção', 'Selecione um produto primeiro');
      return;
    }
    const selectedProduct = getSelectedProduct();
    if (selectedProduct) {
      navigation.navigate('Editar', { ...selectedProduct });
    }
  };
  
  const renderItem = ({ item }: { item: Product }) => {
    const isSelected = item.id === selectedProductId;
    return (
        <TouchableOpacity
          style={[ styles.rowData, { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, backgroundColor: isSelected ? '#104d2f' : '#d9d9d9' } ]}
          onPress={() => handleSelect(item.id)}
        >
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={[styles.rowText, { color: isSelected ? '#fff' : '#000' }]}>{item.nome}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.rowText, { color: isSelected ? '#fff' : '#000' }]}>{item.quantidade}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.rowText, { color: isSelected ? '#fff' : '#000' }]}>
              R$ {item.preco.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </TouchableOpacity>
    );
  };

  const selectedProduct = getSelectedProduct();
  const isProductSelected = selectedProductId !== null;

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Estoque</Text>
        <View style={styles.rowButtons}>
          <TouchableOpacity style={[styles.deleteButton, isProductSelected && { backgroundColor: '#e6e6e6' }]} onPress={handleDelete}>
              <MaterialIcons name="close" size={18} color={isProductSelected ? 'red' : '#ccc'} />
              <Text style={[styles.deleteButtonText, isProductSelected && { color: 'black' }]}>Excluir produto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Criar')}>
              <Feather name="plus" size={18} color="green" />
              <Text style={styles.createButtonText}>Criar produto</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.editButton, isProductSelected && { backgroundColor: '#e6e6e6' }]} onPress={handleEdit}>
            <Feather name="edit-2" size={16} color={isProductSelected ? '#4c4c4c' : '#ccc'} />
            <Text style={[styles.editButtonText, isProductSelected && { color: 'black' }]}>Editar produto</Text>
        </TouchableOpacity>
        <View style={[styles.tableHeader, { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#ccc' }]}>
          <View style={{ flex: 2 }}><Text style={styles.headerCell}>Nome</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.headerCell}>Qtd</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.headerCell}>Valor</Text></View>
        </View>
        <FlatList data={products} keyExtractor={(item) => item.id} renderItem={renderItem} />
        <Modal transparent={true} visible={showConfirmModal} animationType="fade">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Confirmar exclusão do produto:</Text>
              {selectedProduct?.nome && ( <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green', marginBottom: 12 }}>{selectedProduct.nome}</Text> )}
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#B22222', paddingVertical: 10, paddingHorizontal: 16, marginRight: 10, borderRadius: 6 }} onPress={confirmDelete}>
                  <Text style={{ color: '#fff' }}>Confirmar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#aaa', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 }} onPress={() => setShowConfirmModal(false)}>
                  <Text style={{ color: '#fff' }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </View>
  );
};

export default InventoryScreen;
