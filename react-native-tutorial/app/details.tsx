import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { ScrollView } from "react-native"
import { StackScreen } from "react-native-screens";


const details = () => {
	const params = useLocalSearchParams();

	const [pokeDetails, setPokeDetails] = useState<any>(null);

	console.log(params);

	useEffect(() => {
		fetchPokemonDetails();
	}, [])

	const fetchPokemonDetails = async () => {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
			const details = await response.json();

			console.log(details);

			setPokeDetails(details);
		} catch (e) {
			console.error(e);
		}
	}

  return (
		<>
			<Stack.Screen options={{ title: params.name as string }} />
			<ScrollView
				contentContainerStyle={{
					gap: 16,
					padding: 16,
				}}
			>
					
			</ScrollView>
		</>
  )
} 

// const styles = StyleSheet.create({
// })

export default details