import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	console.log("🚀 ------------------🚀");
	console.log("🚀 ~ Page ~ id:", id);
	console.log("🚀 ------------------🚀");

	return (
		<View>
			<Text>Page</Text>
		</View>
	);
};
export default Page;
