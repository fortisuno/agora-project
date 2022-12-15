import { ScrollView, View } from "react-native";
import React from "react";
import { Button, Image, Input } from "@rneui/themed";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";
import styles from "../styles";
import { useAuthContext } from "../components/AuthContext";

const IniciarSesion = ({ navigation }) => {
	const { signIn } = useAuthContext();

	const handleAuthcorreo = async (values) => {
		try {
			const { email, password } = values;
			await signIn(email, password);
		} catch (e) {
			alert(JSON.stringify(e));
		}
	};

	const handleRecuperarContra = () => {
		navigation.navigate("RecuperarContra");
	};

	const handleNuevoUsuario = () => {
		navigation.navigate("UsuarioFormulario", {
			mode: "crear",
			data: {
				nombre: "",
				apellidoPaterno: "",
				apellidoMaterno: "",
				tipo: "",
				ubicacion: "",
				email: "",
				phoneNumber: "",
				password: "",
				confirmPassword: ""
			}
		});
	};

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		onSubmit: handleAuthcorreo
	});

	return (
		<ScrollView contentContainerStyle={[styles.screenProps]}>
			<View style={styles.centeredProps}>
				<Image source={logo} style={{ height: 123.36, width: 150, marginVertical: 50 }} />
				<Input
					placeholder="ejemplo@correo.com"
					label="Correo electrónico"
					onChangeText={formik.handleChange("email")}
					onBlur={formik.handleBlur("email")}
					value={formik.values.email}
				/>
				<Input
					label="Contraseña"
					placeholder="Abc123"
					secureTextEntry={true}
					onChangeText={formik.handleChange("password")}
					onBlur={formik.handleBlur("password")}
					value={formik.values.password}
				/>
				<Button
					title="Iniciar sesión"
					containerStyle={{ width: "100%", marginTop: 32 }}
					onPress={formik.handleSubmit}
				/>
				<Button
					title="¿Olvidaste la contraseña?"
					containerStyle={{ width: "100%" }}
					type="clear"
					onPress={handleRecuperarContra}
				/>
				<Button title="Crear cuenta" containerStyle={{ width: "100%" }} type="clear" onPress={handleNuevoUsuario} />
			</View>
		</ScrollView>
	);
};

export default IniciarSesion;
