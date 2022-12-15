import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import { Input, Button, lightColors } from "@rneui/themed";
import { useFormik } from "formik";
import { useAuthContext } from "../components/AuthContext";
const UsuarioFormulario = ({ navigation, route }) => {
	const { signUp } = useAuthContext();
	const handleCrearUsuario = async (values) => {
		try {
			const { confirmPassword, ...user } = values;
			await signUp(user);
			// alert(JSON.stringify(user));
		} catch (e) {
			alert(JSON.stringify(e));
		}
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const formik = useFormik({
		initialValues: {
			nombre: "",
			apellidoPaterno: "",
			apellidoMaterno: "",
			tipo: "",
			ubicacion: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: ""
		},
		onSubmit: handleCrearUsuario
	});

	return (
		<ScrollView contentContainerStyle={styles.screenProps}>
			<Input
				onChangeText={formik.handleChange("nombre")}
				onBlur={formik.handleBlur("nombre")}
				value={formik.values.nombre}
				label="Nombres"
				placeholder="ej. Pablo"
			/>
			<Input
				onChangeText={formik.handleChange("apellidoPaterno")}
				onBlur={formik.handleBlur("apellidoPaterno")}
				value={formik.values.apellidoPaterno}
				label="Apellido Paterno"
				placeholder="ej. Gomez"
			/>
			<Input
				onChangeText={formik.handleChange("apellidoMaterno")}
				onBlur={formik.handleBlur("apellidoMaterno")}
				value={formik.values.apellidoMaterno}
				label="Apellido Materno"
				placeholder="ej. Morales"
			/>
			{route.params.mode === "crear" && (
				<Input
					onChangeText={formik.handleChange("tipo")}
					onBlur={formik.handleBlur("tipo")}
					value={formik.values.tipo}
					label="Tipo de usuario"
					placeholder="Cliente | Proveedor"
				/>
			)}
			<Input
				onChangeText={formik.handleChange("ubicacion")}
				onBlur={formik.handleBlur("ubicacion")}
				value={formik.values.ubicacion}
				label="Ubicación"
				placeholder="ej. Ciudad de México"
			/>
			<Input
				onChangeText={formik.handleChange("email")}
				onBlur={formik.handleBlur("email")}
				value={formik.values.email}
				label="Correo electrónico"
				placeholder="ejemplo@correo.com"
			/>
			<Input
				onChangeText={formik.handleChange("phoneNumber")}
				onBlur={formik.handleBlur("phoneNumber")}
				value={formik.values.phoneNumber}
				label="Teléfono"
				placeholder="5511223344"
			/>
			{route.params.mode === "crear" && (
				<>
					<Input
						onChangeText={formik.handleChange("password")}
						onBlur={formik.handleBlur("password")}
						value={formik.values.password}
						label="Contraseña"
						placeholder="Abc123"
						secureTextEntry={true}
					/>
					<Input
						onChangeText={formik.handleChange("confirmPassword")}
						onBlur={formik.handleBlur("confirmPassword")}
						value={formik.values.confirmPassword}
						label="Confirmar contraseña"
						placeholder="Abc123"
						secureTextEntry={true}
					/>
				</>
			)}
			<Button title="Crear usuario" containerStyle={{ width: "100%" }} onPress={formik.handleSubmit} />
			<Button
				title={route.params.mode === "editar" ? "Eliminar" : "Cancelar"}
				titleStyle={{ color: lightColors.error }}
				containerStyle={{ width: "100%" }}
				type="clear"
				onPress={handleBack}
			/>
		</ScrollView>
	);
};

export default UsuarioFormulario;
