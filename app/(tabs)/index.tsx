import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsMap from "@/components/ListingsMap";
import ListingBottomSheet from "@/components/ListingBottomSheet";

const Page = () => {
	const [category, setCategory] = useState("Tiny homes");
	const items = useMemo(() => listingsData as any, []);
	const geoItems = useMemo(() => listingsDataGeo as any, []);
	const onDataChanged = (category: string) => {
		setCategory(category);
	};

	return (
		<View style={{ flex: 1, marginTop: 80 }}>
			<Stack.Screen
				options={{
					header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
				}}
			/>
			{/* <Listings listings={items} category={category} /> */}
			<ListingsMap listings={geoItems} />
			<ListingBottomSheet listings={items} category={category} />
		</View>
	);
};
export default Page;
