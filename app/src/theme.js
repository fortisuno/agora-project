import { createTheme } from "@rneui/themed";

const colors = {
	light: "#f5f5f5"
};

export const app = {
	borderRadius: 10,
	baseSize: 16
};

const theme = createTheme({
	components: {
		Button: {
			radius: app.borderRadius,
			containerStyle: { marginVertical: app.baseSize / 2 },
			buttonStyle: { padding: app.baseSize }
		},
		Input: {
			selectionColor: "#111111",
			inputContainerStyle: {
				borderBottomWidth: 0,
				backgroundColor: colors.light,
				borderRadius: app.borderRadius,
				paddingHorizontal: app.baseSize,
				paddingVertical: app.baseSize / 2
			}
		},
		Card: {
			marginVertical: 10,
			width: 345,
			height: 100,
			alignItems: "flex-start",
			backgroundColor: "white",
			paddingHorizontal: 20,
		}
	}
});

export default theme;
