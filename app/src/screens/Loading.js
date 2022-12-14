import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import styles from "../styles";
import { useTheme } from "@rneui/themed";

const Loading = () => {
	const { theme } = useTheme();
	return (
		<View style={[styles.screenProps, styles.centeredProps]}>
			<ActivityIndicator size={64} color={theme.colors.primary} />
		</View>
	);
};

export default Loading;
