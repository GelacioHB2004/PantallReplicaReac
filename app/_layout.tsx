import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
      <Stack.Screen name="/producto" />
      <Stack.Screen name="/(navegaciontabs)" />
      <Stack.Screen name="/productos/:id" options={{ headerShown: true }} />
      <Stack.Screen name="/categorias/:categoria" options={{ headerShown: true }} />
    </Stack>
  );
};

export default Layout;
