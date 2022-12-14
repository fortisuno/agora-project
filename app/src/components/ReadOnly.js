import { View, Text } from "react-native";
import React from "react";

const ReadOnly = ({ label = "Label", value = "Valor", width = "100%" }) => {
	return (
		<View style={{ marginBottom: 20, width }}>
			<Text style={{ color: "black", fontWeight: "bold", marginBottom: 8 }}>{label}</Text>
			<Text>{value}</Text>
		</View>
	);
};

export default ReadOnly;
