import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/AuthSlice';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  /*
  Login basico
  const onSubmit = (data: LoginForm) => {
    const user = { email: data.email, token: 'fake-jwt-token' };


    dispatch(loginSuccess(user));
    router.replace('/(tabs)');
  };*/

  const onLogin = async (data: LoginForm) => {
    try {
      const { email, password } = data;

      const storedUsers = await AsyncStorage.getItem("registeredUsers");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find((user: { email: string, password: string }) => user.email === email && user.password === password);

      if (!user) {
        Alert.alert("Error", "Correo o contraseña incorrectos");
        return;
      }

      Alert.alert("Éxito", "Inicio de sesión exitoso");
      dispatch(loginSuccess(user));
      router.replace('/(tabs)');

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={"white"} onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.email && <Text style={styles.errorInputMsg}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Password"  placeholderTextColor={"white"} secureTextEntry onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.password && <Text style={styles.errorInputMsg}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onLogin)}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
        <Link href={"/register"} style={styles.linkBtn}>Registrarse</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    marginBottom: 40,
    marginTop: 40,
    color: "white",
    alignSelf: "center"
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "white",
    borderRadius: 2,
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop: 20,
    color: "white",
    padding: 10
  },
  errorInputMsg: {
    color: "red",
    marginHorizontal: 20
  },
  button: {
    backgroundColor: "#4CAF50", 
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "90%",
    height: 50,
    alignSelf: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center"
  },
  linkBtn: {
    color: "gray",
    fontSize: 18,
    marginTop:25,
    fontWeight: "bold",
    alignSelf: "center"
  },
});

