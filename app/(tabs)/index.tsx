import { logout } from '@/redux/slices/AuthSlice';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';



export default function HomeScreen() {
  const dispatch = useDispatch()
  return (
    <View style={styles.titleContainer}>
      <View>
      <Text style={styles.textCenter} >Bienvenido</Text>
      <Button title="Cerrar sesion" onPress={() => {dispatch(logout())}}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textCenter: {
    color: "white",
    alignSelf: "center"
  },
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
