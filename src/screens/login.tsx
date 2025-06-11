import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import styles from './styleslogin';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  useFocusEffect(
    useCallback(() => {
      setLogin('');
      setSenha('');
    }, [])
  );

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Index');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const verificarSenha = async () => {
    const loginTrim = login.trim();
    const senhaTrim = senha.trim();

    if (!loginTrim || !senhaTrim) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const dados = await AsyncStorage.getItem('admins');
      const admins = dados ? JSON.parse(dados) : [];

      const adminValido = admins.find(
        (adm: any) => adm.login === loginTrim && adm.senha === senhaTrim
      );

      if (adminValido) {
        navigation.navigate('Estoque');
      } else {
        Alert.alert('Erro', 'Login ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao verificar login.');
    }
  };

  const irParaCadastro = () => {
    navigation.navigate('CadastroAdmin');
  };

  const recuperarSenha = async () => {
    const dados = await AsyncStorage.getItem('admins');
    const admins = dados ? JSON.parse(dados) : [];

    const adminEncontrado = admins.find((admin: any) => admin.login === login.trim());

    if (adminEncontrado) {
      Alert.alert(
        'Recuperação de Senha',
        'Enviamos um e-mail com instruções para redefinir sua senha.'
      );
    } else {
      Alert.alert('Erro', 'Login não encontrado.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.subtitle}>Acesse sua conta</Text>

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
        placeholder="Digite sua senha"
        secureTextEntry
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity onPress={recuperarSenha}>
        <Text style={styles.forgot}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={verificarSenha}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={irParaCadastro}>
        <Text style={styles.register}>Cadastrar administrador</Text>
      </TouchableOpacity>
    </View>
  );
}
