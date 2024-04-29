import { defaultStyles } from "@/constants/Styles";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import {
	BottomSheetFlatList,
	BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	FlatList,
	ListRenderItem,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
	listings: any[];
	category: string;
	refresh: number;
}

const Listings = ({ listings: items, category, refresh }: Props) => {
	const [loading, setLoading] = useState(false);
	const listRef = useRef<BottomSheetFlatListMethods>(null);

	useEffect(() => {
		if (refresh) {
			listRef.current?.scrollToOffset({ offset: 0, animated: true });
		}
	}, [refresh]);

	useEffect(() => {
		console.log("Reload listring", items.length);
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
		}, 200);
	}, [category]);

	const renderRow: ListRenderItem<Listing> = ({ item }) => (
		<Link href={`/listing/${item.id}`} asChild>
			<TouchableOpacity>
				<Animated.View
					style={styles.listing}
					entering={FadeInRight}
					exiting={FadeOutLeft}
				>
					<Image source={{ uri: item.medium_url }} style={styles.image} />
					<TouchableOpacity
						style={{ position: "absolute", right: 30, top: 30 }}
					>
						<Ionicons name="heart-outline" size={24} color="#000" />
					</TouchableOpacity>

					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
							{item.name}
						</Text>
						<View style={{ flexDirection: "row", gap: 4 }}>
							<Ionicons name="star" size={16} color="#000" />
							<Text style={{ fontFamily: "mon-sb" }}>
								{item.review_scores_rating / 20}
							</Text>
						</View>
					</View>

					<Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

					<View style={{ flexDirection: "row", gap: 4 }}>
						<Text style={{ fontFamily: "mon-sb" }}>€ {item.price}</Text>
						<Text style={{ fontFamily: "mon" }}>night</Text>
					</View>
				</Animated.View>
			</TouchableOpacity>
		</Link>
	);

	return (
		<View style={defaultStyles.container}>
			<BottomSheetFlatList
				ref={listRef}
				data={loading ? [] : items}
				renderItem={renderRow}
				ListHeaderComponent={
					<Text style={styles.info}>{items.length} homes</Text>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 10,
		marginVertical: 16,
	},
	image: {
		width: "100%",
		height: 300,
		borderRadius: 10,
	},
	info: {
		textAlign: "center",
		fontFamily: "mon-sb",
		fontSize: 16,
		marginTop: 4,
	},
});
export default Listings;
