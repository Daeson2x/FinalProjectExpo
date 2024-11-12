import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatura: "",
      imagenTemp: "",
      ciudad: "Guadalajara",
      humedad: "",
      viento: "",
    };
  }

  componentDidMount() {
    this.buscarClima();
  }

  buscarClima = async () => {
    const lat = 20.6597;  // Latitud de Guadalajara
    const lon = -103.3496; // Longitud de Guadalajara

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=19bd867e8eba4ac7afa192017240309&q=${lat},${lon}&aqi=no`
      );
      const datos = await response.json();
      this.setState({
        temperatura: datos.current.temp_c,
        imagenTemp: `https:${datos.current.condition.icon}`,
        ciudad: datos.location.name,
        humedad: datos.current.humidity,
        viento: datos.current.wind_kph,
      });
    } catch (error) {
      console.error("Error al buscar los datos del clima:", error);
    }
  };

  render() {
    return (
      <View style={styles.topContainer}>
        <View style={styles.row}>
          {/* Información del clima a la izquierda */}
          <View style={styles.weatherInfo}>
            <Image 
              source={{ uri: this.state.imagenTemp }} 
              style={styles.weatherIcon} 
            />
            <Text style={styles.cityText}>{this.state.ciudad}</Text>
            <Text style={styles.weatherText}>Temperatura:</Text>
            <Text style={styles.weatherText}>{this.state.temperatura}°C</Text>
          </View>

          {/* Logo de CUCEI al centro */}
          <Image 
            source={require('../assets/images/cucei-logo.png')} 
            style={styles.logo} 
          />

          {/* Imagen de inicio de sesión a la derecha */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Image 
              source={require('../assets/images/account-icon.webp')} 
              style={styles.loginImage} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 2,
    width: '100%', 
    marginTop: 20,
  },
  row: {
    flexDirection: 'row', // Los elementos se alinean horizontalmente
    justifyContent: 'center', // Centra los elementos
    alignItems: 'center',
    width: '100%', // Asegura que la fila ocupe todo el ancho
  },
  logo: {
    width: 200, // Aumento el tamaño del logo
    height: 100,
    marginHorizontal: 10, // Espacio a los lados del logo
  },
  loginImage: {
    width: 65,
    height: 65,
    marginRight: -15,
    marginLeft: 10,
  },
  weatherInfo: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginLeft: -10, 
  },
  cityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 14,
  },
  weatherIcon: {
    width: 60, // Aumento el tamaño de la imagen del clima
    height: 60,
    borderRadius: 10, // Hago la imagen redonda
  },
});
