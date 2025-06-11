import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import styles from './stylesjanelastatus'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'JanelaStatus'>;

const StatusScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estoque</Text>

      <Image
        source={require('../images/carrinho.png')} 
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.successText}>O novo produto foi criado com sucesso!</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Estoque')}>
        <Text style={styles.primaryButtonText}>Voltar ao estoque</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Criar')}>
        <Text style={styles.secondaryLink}>Criar um novo produto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StatusScreen;
