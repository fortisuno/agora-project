import { View, Text } from "react-native";
import React from "react";
import { Button, Divider } from "@rneui/themed";
import styles from "../styles";

const Inicio = ({ navigation }) => {
	return (
		<View style={styles.centeredContainer}>
			<Text style={{ marginBottom: 10 }}>Vistas de la app:</Text>
			<Button title="Mostrar Iniciar sesión" onPress={() => navigation.navigate("IniciarSesion")} />
			<Button title="Mostrar Filtro" onPress={() => navigation.navigate("Filtro")} />
			<Button title="Mostrar Pedido Detalle" onPress={() => navigation.navigate("PedidoDetalle")} />
			<Button title="Mostrar Usuario Detalle" onPress={() => navigation.navigate("UsuarioDetalle")} />
			<Button title="Mostrar Pedido Formulario" onPress={() => navigation.navigate("PedidoFormulario")} />
			<Button title="Mostrar Usuario Formulario" onPress={() => navigation.navigate("UsuarioFormulario")} />
		</View>
	);
};

export default Inicio;
