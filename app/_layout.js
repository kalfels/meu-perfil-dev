import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: "#147db3",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ title: "Sobre o App" }} />
            <Stack.Screen name="recados" options={{ title: "Recados" }} />
            <Stack.Screen name="habilidades" options={{ title: "Habilidades" }} />
            <Stack.Screen name="habilidades/[id]" />
            </Stack>
        </SafeAreaProvider>
    );
}