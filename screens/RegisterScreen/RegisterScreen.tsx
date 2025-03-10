import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'expo-router';

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

  const onSubmit = (data: RegisterForm) => {
    console.log('Usuario registrado:', data);
    router.replace('/login');
  };

  return (
    <View>
      <Text>Registro</Text>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput placeholder="Email" onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextInput placeholder="Password" secureTextEntry onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <TextInput placeholder="Confirm Password" secureTextEntry onChangeText={field.onChange} value={field.value} />
        )}
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
      <Button title="Volver" onPress={() => router.push("/login")}/>

    </View>
  );
}
