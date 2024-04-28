import { useEffect } from "react";
import { View, Text } from "react-native";

interface Props {
	listings: any[];
	category: string;
}

const Listings = ({ listings, category }: Props) => {
	useEffect(() => {
		console.log("reload listings", listings.length);
	}, [category]);
	return (
		<View>
			<Text>Listings</Text>
		</View>
	);
};
export default Listings;
