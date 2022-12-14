import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	screenProps: {
		flexGrow: 1,
		backgroundColor: "white",
		padding: 20
	},
	centeredProps: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	topLeftProps: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start"
	},
	topCenterProps: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start"
	}
});

export default styles;
