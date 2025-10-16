import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'

const TabIcon = ({ name, iconName, focused }: any) => {
    if (focused) {
        return (
            <>
                <ImageBackground className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden' source={images.highlight}>
                    <Image source={iconName} tintColor="#151312" className='size-5' />
                    <Text className='text-secondary text-base font-semibold ml-2'>{name}</Text>
                </ImageBackground>
            </>
        )
    }
    return (
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={iconName} tintColor="#A8B5DB" className='size-5' />
        </View>
    )
}

export default function _layout() {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            },
            tabBarStyle: {
                backgroundColor: "#0f0D23",
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                // borderWidth: 1,
                borderColor: "#0f0D23",
            }
        }}>
            <Tabs.Screen name='index' options={{
                headerShown: false, title: "Home", tabBarIcon: ({ focused }) => (
                    <TabIcon name="Home" iconName={icons.home} focused={focused} />
                )
            }} />
            <Tabs.Screen name='search' options={{
                headerShown: false, title: "Search", tabBarIcon: ({ focused }) => (
                    <TabIcon name="Search" iconName={icons.search} focused={focused} />
                )
            }} />
            <Tabs.Screen name='saved' options={{
                headerShown: false, title: "Saved", tabBarIcon: ({ focused }) => (
                    <TabIcon name="Save" iconName={icons.save} focused={focused} />
                )
            }} />
            <Tabs.Screen name='profile' options={{
                headerShown: false, title: "Profile", tabBarIcon: ({ focused }) => (
                    <TabIcon name="Profile" iconName={icons.person} focused={focused} />
                )
            }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({})