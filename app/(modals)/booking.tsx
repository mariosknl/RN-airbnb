import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ScrollView,
	Image,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";
import DatePicker from "react-native-modern-datepicker";

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

const guestsGroups = [
	{
		name: "Adults",
		text: "Ages 13 or above",
		count: 0,
	},
	{
		name: "Children",
		text: "Ages 2-12",
		count: 0,
	},
	{
		name: "Infants",
		text: "Under 2",
		count: 0,
	},
	{
		name: "Pets",
		text: "Pets allowed",
		count: 0,
	},
];

const Booking = () => {
	const router = useRouter();
	const [openCard, setOpenCard] = useState(0);
	const [selectedPlace, setSelectedPlace] = useState(0);
	const [groups, setGroups] = useState(guestsGroups);
	const today = new Date().toISOString().substring(0, 10);

	const onClearAll = () => {
		setSelectedPlace(0);
		setOpenCard(0);
		setGroups(guestsGroups);
	};

	return (
		<BlurView intensity={70} style={styles.container} tint="light">
			{/* where */}
			<View style={styles.card}>
				{openCard !== 0 && (
					<AnimatedTouchableOpacity
						onPress={() => setOpenCard(0)}
						style={styles.cardPreview}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>Where?</Text>
						<Text style={styles.previewDate}>I'm flexible</Text>
					</AnimatedTouchableOpacity>
				)}

				{openCard === 0 && (
					<>
						<Animated.Text entering={FadeIn} style={styles.cardHeader}>
							Where to?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							<View style={styles.searchSection}>
								<Ionicons
									style={styles.searchIcon}
									name="search-outline"
									size={20}
									color="#000"
								/>
								<TextInput
									style={styles.inputField}
									placeholder="Search destination"
									placeholderTextColor={Colors.grey}
								/>
							</View>
						</Animated.View>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{
								gap: 25,
								paddingLeft: 20,
								marginBottom: 30,
							}}
						>
							{places.map((item, index) => (
								<TouchableOpacity
									onPress={() => setSelectedPlace(index)}
									key={index}
								>
									<Image
										source={item.img}
										style={
											selectedPlace === index
												? styles.placeSelected
												: styles.place
										}
									/>
									<Text
										style={[
											{ fontFamily: "mon", paddingTop: 6 },
											selectedPlace === index ? { fontFamily: "mon-sb" } : null,
										]}
									>
										{item.title}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</>
				)}
			</View>

			{/* when */}
			<View style={styles.card}>
				{openCard !== 1 && (
					<AnimatedTouchableOpacity
						onPress={() => setOpenCard(1)}
						style={styles.cardPreview}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>When?</Text>
						<Text style={styles.previewDate}>Any week</Text>
					</AnimatedTouchableOpacity>
				)}

				{openCard === 1 && (
					<>
						<Animated.Text entering={FadeIn} style={styles.cardHeader}>
							Who's coming?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							<DatePicker
								current={today}
								selected={today}
								mode={"calendar"}
								options={{
									defaultFont: "mon",
									headerFont: "mon-sb",
									borderColor: "transparent",
									mainColor: Colors.primary,
								}}
							/>
						</Animated.View>
					</>
				)}
			</View>

			{/* who */}
			<View style={styles.card}>
				{openCard !== 2 && (
					<AnimatedTouchableOpacity
						onPress={() => setOpenCard(2)}
						style={styles.cardPreview}
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
					>
						<Text style={styles.previewText}>Who?</Text>
						<Text style={styles.previewDate}>Add guests</Text>
					</AnimatedTouchableOpacity>
				)}
				{openCard === 2 && (
					<>
						<Animated.Text entering={FadeIn} style={styles.cardHeader}>
							Who?
						</Animated.Text>
						<Animated.View style={styles.cardBody}>
							{groups.map((item, index) => (
								<View
									key={index}
									style={[
										styles.guestItem,
										index + 1 < guestsGroups.length ? styles.itemBorder : null,
									]}
								>
									<View>
										<Text style={{ fontFamily: "mon-sb", fontSize: 14 }}>
											{item.name}
										</Text>
										<Text
											style={{
												fontFamily: "mon",
												fontSize: 14,
												color: Colors.grey,
											}}
										>
											{item.text}
										</Text>
									</View>

									<View
										style={{
											flexDirection: "row",
											gap: 10,
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<TouchableOpacity
											onPress={() => {
												const newGroups = [...groups];
												newGroups[index].count =
													newGroups[index].count > 0
														? newGroups[index].count - 1
														: 0;
												setGroups(newGroups);
											}}
										>
											<Ionicons
												name="remove-circle-outline"
												size={26}
												color={
													groups[index].count > 0 ? Colors.grey : "#cdcdcd"
												}
											/>
										</TouchableOpacity>
										<Text
											style={{
												fontFamily: "mon",
												fontSize: 16,
												minWidth: 18,
												textAlign: "center",
											}}
										>
											{item.count}
										</Text>
										<TouchableOpacity
											onPress={() => {
												const newGroups = [...groups];
												newGroups[index].count++;
												setGroups(newGroups);
											}}
										>
											<Ionicons
												name="add-circle-outline"
												size={26}
												color={Colors.grey}
											/>
										</TouchableOpacity>
									</View>
								</View>
							))}
						</Animated.View>
					</>
				)}
			</View>

			{/* Footer */}
			<Animated.View
				style={defaultStyles.footer}
				entering={SlideInDown.delay(200)}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<TouchableOpacity
						onPress={onClearAll}
						style={{ justifyContent: "center" }}
					>
						<Text
							style={{
								fontSize: 18,
								fontFamily: "mon-sb",
								textDecorationLine: "underline",
							}}
						>
							Clear all
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => router.back()}
						style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
					>
						<Ionicons
							name="search-outline"
							size={24}
							color={"#fff"}
							style={defaultStyles.btnIcon}
						/>
						<Text style={defaultStyles.btnText}>Search</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</BlurView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 14,
		margin: 10,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		gap: 20,
	},
	cardHeader: {
		fontFamily: "mon-b",
		fontSize: 24,
		padding: 20,
	},
	cardBody: {
		paddingHorizontal: 20,
	},
	cardPreview: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
	},

	searchSection: {
		height: 50,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ABABAB",
		borderRadius: 8,
		marginBottom: 4,
	},
	searchIcon: {
		padding: 10,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	placesContainer: {
		flexDirection: "row",
		gap: 25,
	},
	place: {
		width: 120,
		height: 120,
		borderRadius: 10,
	},
	placeSelected: {
		borderColor: Colors.grey,
		borderWidth: 2,
		borderRadius: 10,
		width: 120,
		height: 120,
	},
	previewText: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.grey,
	},
	previewDate: {
		fontFamily: "mon-sb",
		fontSize: 14,
		color: Colors.dark,
	},

	guestItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
	},
	itemBorder: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey,
	},
});
export default Booking;
