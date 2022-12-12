import { ScrollView, Text, View } from "react-native";
import React, { Component } from "react";
import { Button, Divider, Image, Input, SocialIcon } from "@rneui/themed";

import logo from "../../assets/logo.png";
import { app } from "../theme";
import styles from "../styles";

const IniciarSesion = ({ navigation }) => {
	const handleAuth = () => {
		navigation.navigate("Inicio");
	};
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.centeredContainer}>
				<Image source={logo} style={{ height: 123.36, width: 150, marginVertical: 50 }} />
				<Input placeholder="ejemplo@correo.com" label="Correo electrónico" />
				<Input
					label="Contraseña"
					placeholder="Abc123"
					secureTextEntry={true}
					inputStyle={{ margin: 0 }}
					inputContainerStyle={{ padding: 0 }}
				/>
				<Button title="¿Olvidaste la contraseña?" type="clear" />
				<Button title="Iniciar sesión" containerStyle={{ width: "100%" }} onPress={handleAuth} />
				<Button title="Crear cuenta" type="clear" />
				<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
					<Divider style={{ width: 100, margin: app.baseSize }} />
					<Text style={{ color: "#999" }}>Ingresar con</Text>
					<Divider style={{ width: 100, margin: app.baseSize }} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<SocialIcon type="facebook" button={true} />
					<SocialIcon type="google" button={true} />
				</View>
			</View>
		</ScrollView>
	);
};

export default IniciarSesion;
