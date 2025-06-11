import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import styles from './styleslogin';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroAdmin'>;

export default function CadastroAdmin({ navigation }: Props) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [codigoSecreto, setCodigoSecreto] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const cadastrar = async () => {
    if (!login.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    
  const CODIGO_CORRETO = 'alunosmobile'; 
  if (codigoSecreto !== CODIGO_CORRETO) {
    Alert.alert('Erro', 'Código secreto inválido.');
    return;
  }

    try {
      const dados = await AsyncStorage.getItem('admins');
      const admins = dados ? JSON.parse(dados) : [];

      const existe = admins.find((adm: any) => adm.login === login.trim());
      if (existe) {
        Alert.alert('Erro', 'Login já cadastrado.');
        return;
      }

      admins.push({ login: login.trim(), senha: senha.trim() });
      await AsyncStorage.setItem('admins', JSON.stringify(admins));

      Alert.alert('Sucesso', 'Administrador cadastrado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o administrador.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Cadastrar novo administrador</Text>

      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu login"
        placeholderTextColor="#999"
        value={login}
        onChangeText={setLogin}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Código Secreto</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Digite o código secreto"
        placeholderTextColor="#999"
        value={codigoSecreto}
        onChangeText={setCodigoSecreto}
      />

      <Text style={styles.label}>Confirmar senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={cadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
