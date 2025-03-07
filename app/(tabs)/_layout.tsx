import { Tabs } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function tabsLayout(){
    return(
        <Tabs screenOptions={{headerShown:false}}>
            <Tabs.Screen name="login"/>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="perfil" options={{
                title: 'Profile',
                tabBarIcon: ({color})=><FontAwesome6 name="person-breastfeeding" size={24} color={color} />
            }}  />
            <Tabs.Screen name="setings" />

        </Tabs>
    )
}