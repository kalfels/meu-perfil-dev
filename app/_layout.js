import { Stack } from "expo-router/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function Layout() {
    return (
        <SafeAreaProvider>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: "#407C2A",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ title: "Sobre o App" }} />
            </Stack>
        </SafeAreaProvider>
    );
}