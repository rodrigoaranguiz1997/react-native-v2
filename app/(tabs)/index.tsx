import { StyleSheet, Text, View } from 'react-native';



export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <View>
      <Text style={{color: "white"}} >Bienvenido a compumundohipermegared</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    alignItems: 'center',
    gap: 8,
    color: "white",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%"
  }
});
