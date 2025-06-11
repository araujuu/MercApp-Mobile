// src/navigation/StackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from '../screens/index';
import Login from '../screens/login';
import Estoque from '../screens/estoque';
import Criar from '../screens/criar';
import JanelaStatus from '../screens/janelastatus';
import Editar from '../screens/editar';
import ProductListScreen from '../screens/visualizar';
import CadastroAdmin from '../screens/CadastroAdmin';
import ListarAdmins from '../screens/ListarAdmins';


export type RootStackParamList = {
  Index: undefined;
  Login: undefined;
  Estoque: undefined;
  Criar: undefined;
  JanelaStatus: undefined;
  Editar: {
    id: string;
    nome: string;
    quantidade: number;
    preco: number;
    imagem?: string;
  };
  Visualizar: undefined;
  CadastroAdmin: undefined;
  ListarAdmins: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Index">
      <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Estoque" component={Estoque} options={{ headerShown: false }} />
      <Stack.Screen name="Criar" component={Criar} options={{ headerShown: false }} />
      <Stack.Screen name="JanelaStatus" component={JanelaStatus} options={{ headerShown: false }} />
      <Stack.Screen name="Editar" component={Editar} options={{ headerShown: false }} />
      <Stack.Screen name="Visualizar" component={ProductListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroAdmin" component={CadastroAdmin} options={{ headerShown: true, title: 'Cadastro de Administrador' }} />
      <Stack.Screen name="ListarAdmins" component={ListarAdmins} options={{ headerShown: true, title: 'Lista De Admins' }} />
    </Stack.Navigator>
  );
}
