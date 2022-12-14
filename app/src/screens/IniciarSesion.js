import { ScrollView, Text, View } from "react-native";
import React, { Component, useContext } from "react";
import { Button, Divider, Image, Input, SocialIcon } from "@rneui/themed";

import logo from "../../assets/logo.png";
import { app } from "../theme";
import styles from "../styles";
import { useAuthContext } from "../components/AuthContext";

const IniciarSesion = ({ navigation }) => {
	const { signIn } = useAuthContext();
	const handleAuthcorreo = () => {
		// Do something
		signIn();
	};

	const handleRecuperarContra = () => {
		navigation.navigate("RecuperarContra");
	};

	const handleNuevoUsuario = () => {
		navigation.navigate("UsuarioFormulario", { mode: "crear" });
	};

	const handleAuthFacebook = () => {
		navigation.push("Inicio");
	};

	const handleAuthGoogle = () => {
		navigation.navigate("Inicio");
	};

	return (
		<ScrollView contentContainerStyle={[styles.screenProps]}>
			<View style={styles.centeredProps}>
				<Image source={logo} style={{ height: 123.36, width: 150, marginVertical: 50 }} />
				<Input placeholder="ejemplo@correo.com" label="Correo electrónico" />
				<Input label="Contraseña" placeholder="Abc123" secureTextEntry={true} />
				<Button title="¿Olvidaste la contraseña?" type="clear" onPress={handleRecuperarContra} />
				<Button title="Iniciar sesión" containerStyle={{ width: "100%" }} onPress={handleAuthcorreo} />
				<Button title="Crear cuenta" type="clear" onPress={handleNuevoUsuario} />
				<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
					<Divider style={{ width: 100, margin: app.baseSize }} />
					<Text style={{ color: "#999" }}>Ingresar con</Text>
					<Divider style={{ width: 100, margin: app.baseSize }} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<SocialIcon type="facebook" button={true} onPress={handleAuthFacebook} />
					<SocialIcon type="google" button={true} onPress={handleAuthGoogle} />
				</View>
			</View>
		</ScrollView>
	);
};

export default IniciarSesion;
