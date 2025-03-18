import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: RegisterForm) => {
    try {
      const { email, password } = data;

      const storedUsers = await AsyncStorage.getItem("registeredUsers");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some((user: { email: string }) => user.email === email)) {
        Alert.alert("Error", "Este correo ya está registrado");
        return;
      }

      const newUser = { email, password };
      users.push(newUser);
      await AsyncStorage.setItem("registeredUsers", JSON.stringify(users));

      Alert.alert("Éxito", "Usuario registrado correctamente");
      router.replace('/login');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <View>
      <Text>Registro</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput placeholderTextColor={"white"} style={styles.input} placeholder="Email" onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.email && <Text style={styles.errorInputMsg}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor={"white"} secureTextEntry onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.password && <Text style={styles.errorInputMsg}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Confirmar Password"  placeholderTextColor={"white"} secureTextEntry onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.confirmPassword && <Text style={styles.errorInputMsg}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}><Text style={styles.buttonText}>Registrar</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}><Text style={styles.buttonText}>Volver</Text></TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "90%", 
    height: 50,
    borderColor: "white",
    borderRadius: 2, 
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop:20,
    color: "white",
    padding:10
  },
  errorInputMsg: {
    color:"red",
    marginHorizontal:20
  },
  button: {
    backgroundColor: "#4CAF50",  // Color verde
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "90%",
    height: 50,
    alignSelf: "center",
    color: "white"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center"
  },
});
