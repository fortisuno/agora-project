import { ScrollView, View, Text } from "react-native";
import React from "react";
import { Button, Divider, Input, lightColors, useTheme } from "@rneui/themed";
import RadioButtonRN from "radio-buttons-react-native";

import styles from "../styles";
import { Categorias } from "../models/Categorias";
import { Unidades } from "../models/Unidades";
import { useFormik } from "formik";
import { useDataContext } from "../components/DataContext";
import { addOne } from "../api";

const PedidoFormulario = ({ navigation, route }) => {
	const { theme } = useTheme();
	const { data } = useDataContext();

	const handleSave = async (values) => {
		try {
			const payload = {
				...values,
				usuario: { id: data.uid, displayName: data.displayName },
				ubicacion: data.ubicacion
			};
			const { message } = await addOne("pedidos", payload);
			alert(message);
			navigation.reset({
				index: 0,
				routes: [{ name: "Inicio" }]
			});
		} catch (e) {
			alert(JSON.stringify(e));
		}
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	const formik = useFormik({
		initialValues:
			route.params.mode === "editar"
				? route.params.pedido
				: {
						titulo: "",
						presupuesto: "",
						cantidad: "",
						unidad: "",
						categoria: ""
				  },
		onSubmit: handleSave
	});

	return (
		<ScrollView contentContainerStyle={[styles.screenProps]}>
			<View style={styles.defaultContainer}>
				<Input
					onChangeText={formik.handleChange("titulo")}
					onBlur={formik.handleBlur("titulo")}
					value={formik.values.titulo}
					placeholder="Título"
					label="Título"
				/>
				<View style={{ flexDirection: "row" }}>
					<Input
						onChangeText={formik.handleChange("presupuesto")}
						onBlur={formik.handleBlur("presupuesto")}
						value={formik.values.presupuesto}
						placeholder="Presupuesto"
						label="Presupuesto"
						containerStyle={{ width: "50%" }}
					/>
					<Input
						onChangeText={formik.handleChange("cantidad")}
						onBlur={formik.handleBlur("cantidad")}
						value={formik.values.cantidad}
						placeholder="Cantidad"
						label="Cantidad"
						containerStyle={{ width: "50%" }}
					/>
				</View>
				<View style={{ paddingHorizontal: 10, marginBottom: 25 }}>
					<Text style={{ fontWeight: "600", fontSize: 16, color: theme.colors.grey3 }}>Unidad</Text>
					<RadioButtonRN
						data={Object.entries(Unidades).map((opt) => ({ id: opt[0], label: opt[1] }))}
						selectedBtn={({ id }) => formik.setFieldValue("unidad", id)}
						initial={1}
						box={false}
						textStyle={{ fontWeight: "500" }}
						circleSize={16}
					/>
				</View>
				<View style={{ paddingHorizontal: 10, marginBottom: 50 }}>
					<Text style={{ fontWeight: "600", fontSize: 16, color: theme.colors.grey3 }}>Categoría</Text>
					<RadioButtonRN
						data={Object.entries(Categorias).map((opt) => ({ id: opt[0], label: opt[1] }))}
						selectedBtn={({ id }) => formik.setFieldValue("categoria", id)}
						initial={1}
						box={false}
						textStyle={{ fontWeight: "500" }}
						circleSize={16}
					/>
				</View>
				<Button title="Guardar" containerStyle={{ width: "100%" }} on onPress={formik.handleSubmit} />
				<Button
					title={route.params.mode === "editar" ? "Eliminar" : "Cancelar"}
					titleStyle={{ color: lightColors.error }}
					containerStyle={{ width: "100%" }}
					type="clear"
					onPress={handleCancel}
				/>
			</View>
		</ScrollView>
	);
};

export default PedidoFormulario;
