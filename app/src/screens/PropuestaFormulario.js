import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import { Button, Input, lightColors } from "@rneui/themed";
import RadioButtonRN from "radio-buttons-react-native";
import { useFormik } from "formik";
import { Unidades } from "../models/Unidades";
import { useDataContext } from "../components/DataContext";
import { addOne, deleteById, updateById } from "../api";

const PropuestaFormulario = ({ navigation, route }) => {
	const { id, pedidoId, ...payload } = route.params.data;
	const { data } = useDataContext();

	const handleSave = async (values) => {
		try {
			if (route.params.mode === "crear") {
				const propuesta = {
					...values,
					pedidoId,
					usuario: { id: data.uid, displayName: data.displayName },
					ubicacion: data.ubicacion,
					phoneNumber: data.phoneNumber,
					email: data.email
				};
				const { message } = await addOne("propuestas", propuesta);
				alert(message);
				navigation.goBack();
			} else {
				const { message } = await updateById("propuestas", id, values);
				alert(message);
				navigation.goBack();
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
				const { message } = await deleteById("propuestas", id);
				alert(message);
				navigation.goBack();
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

	const retrieveIndex = (arr, target) => {
		const index = arr.findIndex((obj) => obj.id === target);

		if (index < 1) return 1;

		return index + 1;
	};
	return (
		<ScrollView contentContainerStyle={styles.screenProps}>
			<View style={{ flexDirection: "row" }}>
				<Input
					onChangeText={formik.handleChange("monto")}
					onBlur={formik.handleBlur("monto")}
					value={formik.values.monto}
					placeholder="Monto"
					label="Monto"
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
				<Text style={{ fontWeight: "600", fontSize: 16, color: lightColors.grey3 }}>Unidad</Text>
				<RadioButtonRN
					data={unidades}
					selectedBtn={({ id }) => formik.setFieldValue("unidad", id)}
					initial={retrieveIndex(unidades, route.params.data.unidad)}
					box={false}
					textStyle={{ fontWeight: "500" }}
					circleSize={16}
				/>
			</View>
			<Button title="Guardar cambios" containerStyle={{ width: "100%" }} onPress={formik.handleSubmit} />
			<Button
				title={route.params.mode === "editar" ? "Eliminar" : "Cancelar"}
				titleStyle={{ color: lightColors.error }}
				containerStyle={{ width: "100%" }}
				type="clear"
				onPress={handleCancel}
			/>
		</ScrollView>
	);
};

export default PropuestaFormulario;
