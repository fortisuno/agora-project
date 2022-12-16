import { ScrollView, View, Text } from "react-native";
import React, { useEffect } from "react";
import { Button, Divider, Input, lightColors, useTheme } from "@rneui/themed";
import RadioButtonRN from "radio-buttons-react-native";

import styles from "../styles";
import { Categorias } from "../models/Categorias";
import { Unidades } from "../models/Unidades";
import { useFormik } from "formik";
import { useDataContext } from "../components/DataContext";
import { addOne, deleteById, updateById } from "../api";

const PedidoFormulario = ({ navigation, route }) => {
	const { theme } = useTheme();
	const { data } = useDataContext();

	const { id, ...payload } = route.params.data;

	const handleSave = async (values) => {
		try {
			if (route.params.mode === "crear") {
				const pedido = {
					...values,
					usuario: { id: data.uid, displayName: data.displayName },
					ubicacion: data.ubicacion
				};
				const { message } = await addOne("pedidos", pedido);
				alert(message);
				navigation.reset({
					index: 0,
					routes: [{ name: "Inicio" }]
				});
			} else {
				const { message } = await updateById("pedidos", id, values);
				alert(message);
				navigation.reset({
					index: 0,
					routes: [{ name: "Inicio" }]
				});
			}
		} catch (e) {
			alert(JSON.stringify(e));
		}
	};

	const handleCancel = async () => {
		if (route.params.mode === "crear") {
			navigation.goBack();
		} else {
			try {
				const { message } = await deleteById("pedidos", id);
				alert(message);
				navigation.popToTop();
			} catch (e) {
				alert(JSON.stringify(e));
			}
		}
	};

	const formik = useFormik({
		initialValues: payload,
		onSubmit: handleSave
	});

	const unidades = Object.entries(Unidades).map((opt) => ({ id: opt[0], label: opt[1] }));
	const categorias = Object.entries(Categorias).map((opt) => ({ id: opt[0], label: opt[1] }));

	const retrieveIndex = (arr, target) => {
		const index = arr.findIndex((obj) => obj.id === target);

		if (index < 1) return 1;

		return index + 1;
	};

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
						keyboardType="numeric"
						leftIcon={{ name: "attach-money", color: lightColors.grey3, size: 20 }}
						leftIconContainerStyle={{ height: 20 }}
						containerStyle={{ width: "50%" }}
					/>
					<Input
						onChangeText={formik.handleChange("cantidad")}
						onBlur={formik.handleBlur("cantidad")}
						value={formik.values.cantidad}
						placeholder="Cantidad"
						label="Cantidad"
						keyboardType="numeric"
						containerStyle={{ width: "50%" }}
					/>
				</View>
				<View style={{ paddingHorizontal: 10, marginBottom: 25 }}>
					<Text style={{ fontWeight: "600", fontSize: 16, color: theme.colors.grey3 }}>Unidad</Text>
					<RadioButtonRN
						data={unidades}
						selectedBtn={({ id }) => formik.setFieldValue("unidad", id)}
						initial={retrieveIndex(unidades, route.params.data.unidad)}
						box={false}
						textStyle={{ fontWeight: "500" }}
						circleSize={16}
					/>
				</View>
				<View style={{ paddingHorizontal: 10, marginBottom: 50 }}>
					<Text style={{ fontWeight: "600", fontSize: 16, color: theme.colors.grey3 }}>Categoría</Text>
					<RadioButtonRN
						data={categorias}
						selectedBtn={({ id }) => formik.setFieldValue("categoria", id)}
						initial={retrieveIndex(categorias, route.params.data.categoria)}
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
