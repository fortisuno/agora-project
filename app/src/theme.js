import { createTheme, lightColors as baseLightColors } from "@rneui/themed";

const colors = {
	light: "#f5f5f5"
};

export const app = {
	borderRadius: 10,
	baseSize: 10
};

const lightColors = {
	...baseLightColors,
	primary: "#24AAE3",
	secondary: "#187297"
};

const theme = createTheme({
	lightColors,
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
		Avatar: {
			containerStyle: { backgroundColor: lightColors.grey5 },
			titleStyle: { color: lightColors.primary, fontWeight: "500" }
		},
		Chip: {
			color: lightColors.primary
		},
		FAB: {
			color: lightColors.primary
		}
	}
});

export default theme;
