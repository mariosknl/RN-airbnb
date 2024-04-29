import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	Image,
	TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
	const { signOut, isSignedIn } = useAuth();
	const { user } = useUser();
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
	const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		if (!user) return;

		setFirstName(user.firstName);
		setLastName(user.lastName);
		setEmail(user.emailAddresses[0].emailAddress);
	}, [user]);

	const onSaveUser = async () => {
		try {
			if (!firstName && !lastName) return;

			await user?.update({
				firstName,
				lastName,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setEdit(false);
		}
	};

	const onCaptureImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 0.75,
			base64: true,
		});

		if (!result.canceled) {
			const base64 = `data:image/png;base64,${result.assets[0].base64}`;
			user?.setProfileImage({
				file: base64,
			});
		}
	};

	return (
		<SafeAreaView style={defaultStyles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.header}>Profile</Text>
				<Ionicons name="notifications-outline" size={26} />
			</View>

			{user && (
				<View style={styles.card}>
					<TouchableOpacity onPress={onCaptureImage}>
						<Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
					</TouchableOpacity>
					<View style={{ flexDirection: "row", gap: 6 }}>
						{!edit && (
							<View style={styles.editRow}>
								<Text style={{ fontFamily: "mon-b", fontSize: 22 }}>
									{firstName} {lastName}
								</Text>
								<TouchableOpacity onPress={() => setEdit(true)}>
									<Ionicons
										name="create-outline"
										size={24}
										color={Colors.dark}
									/>
								</TouchableOpacity>
							</View>
						)}
						{edit && (
							<View style={styles.editRow}>
								<TextInput
									placeholder="First Name"
									value={firstName || ""}
									onChangeText={setFirstName}
									style={[defaultStyles.inputField, { width: 100 }]}
								/>
								<TextInput
									placeholder="Last Name"
									value={lastName || ""}
									onChangeText={setLastName}
									style={[defaultStyles.inputField, { width: 100 }]}
								/>
								<TouchableOpacity onPress={onSaveUser}>
									<Ionicons
										name="checkmark-outline"
										size={24}
										color={Colors.dark}
									/>
								</TouchableOpacity>
							</View>
						)}
					</View>
					<Text>{email}</Text>
					<Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
				</View>
			)}

			{isSignedIn && (
				<Button title="Logout" onPress={() => signOut()} color={Colors.dark} />
			)}

			{!isSignedIn && (
				<Link href={"/(modals)/login"} asChild>
					<Button title="Log in" color={Colors.dark} />
				</Link>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 24,
	},
	header: {
		fontFamily: "mon-b",
		fontSize: 24,
	},
	card: {
		backgroundColor: "#fff",
		padding: 24,
		borderRadius: 16,
		marginHorizontal: 24,
		marginTop: 24,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		alignItems: "center",
		gap: 14,
		marginBottom: 24,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Colors.grey,
	},
	editRow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
});

export default Profile;
