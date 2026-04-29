import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, Pressable } from "react-native";

interface PokemonRaw {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[]
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  }
}

const colorsByType: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
}

export default function Index() {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);

  useEffect(() => {
    // fetch pokemons
    fetchPokemons();
  },[])

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );
      const data = await response.json();

      const detailedPokemons: Pokemon[] = await Promise.all(
        data.results.map(async (p: PokemonRaw) => {
          const res = await fetch(p.url);
          const details = await res.json();
          return {
            name: p.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types
          }
        })
      )

      setPokeData(detailedPokemons);
    } catch (e) {
      console.error(e);
    }
  }  

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokeData.map((p) => (
        <Link 
          key={p.name}
          href={{
            pathname: "/details",
            params: {name: p.name}}
          }
        >
          <View style={{
            backgroundColor: colorsByType[p.types[0].type.name] + 95,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.type}>{p.types[0].type.name}</Text>
            <View 
              style={{
                flexDirection: "row"
              }}
            >
              <Image
                source={{uri: p.image}}
                style={{width: 150, height: 150}}
              />
              <Image
                source={{uri: p.imageBack}}
                style={{width: 150, height: 150}}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: "center",
  }
})