// index.tsx
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header'; // Importar el componente Header

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* Usar el componente Header y pasarle la navegación */}
        <Header navigation={this.props.navigation} />

        {/* Componente Inferior para el Mapa */}
        <View style={styles.mapContainer}>
          <Text>Mapa en Tiempo Real</Text>
          {/* Aquí se integrará el mapa en tiempo real más adelante */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
