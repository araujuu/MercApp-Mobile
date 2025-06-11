import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import styles from './stylesindex';

type Props = NativeStackScreenProps<RootStackParamList, 'Index'>;

export default function Index({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />

      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Seu mercadinho, sua{'\n'}comodidade, seu app.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ marginBottom: 16 }}>

                    <TouchableOpacity
            style={styles.userButton}
            onPress={() => navigation.navigate('Visualizar')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        
        </View>

        <View>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Entrar como administrador</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
