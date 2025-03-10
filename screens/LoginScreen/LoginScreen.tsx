import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/AuthSlice';
import { useRouter } from 'expo-router';

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

  const onSubmit = (data: LoginForm) => {
    const user = { email: data.email, token: 'fake-jwt-token' };
    dispatch(loginSuccess(user));
    router.replace('/(tabs)');
  };

  return (
    <View>
      <Text>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Email" onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.email && <Text style={{color: "red", marginHorizontal:20}}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.password && <Text style={{color:"red", marginHorizontal:20}}>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
      <Button title="Register" onPress={() => router.replace('/register')} />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "90%", 
    height: 50,
    borderColor: "white",
    borderRadius: "2%", 
    borderWidth: 1,
    marginHorizontal: 20,
    marginTop:20,
    color: "white",
    padding:10
  }
});

