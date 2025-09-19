import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BookingsScreen from '../screens/BookingsScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';
import MyBookings from '../screens/MyBooking';
import { theme } from '../theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BookingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Bookings" component={BookingsScreen} />
    <Stack.Screen
      name="BookingDetail"
      component={BookingDetailScreen}
      options={{
        title: 'Booking Detail',
        presentation: 'card',
      }}
    />
  </Stack.Navigator>
);

const ProfileScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    }}
  >
    <Text style={{ color: theme.colors.text }}>Profile</Text>
  </View>
);

const MyBookingScreenWrapper = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyBookings" component={MyBookings} />
  </Stack.Navigator>
);

const TabBarIcon = ({ focused, icon }: { focused: boolean; icon: any }) => {
  return (
    <View
      style={[
        styles.circle,
        {
          backgroundColor: focused ? theme.colors.primary : 'transparent',
          borderColor: focused ? theme.colors.primary : theme.colors.muted,
        },
      ]}
    >
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? 'white' : theme.colors.muted,
        }}
        resizeMode="contain"
      />
    </View>
  );
};


export const RootNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        let iconImage: unknown;
        if (route.name === 'BookingsTab') {
          iconImage = require('../assets/icons/Groups.png');
        } else if (route.name === 'MyBooking') {
          iconImage = require('../assets/icons/vehicle.png');
        } else if (route.name === 'Profile') {
          iconImage = require('../assets/icons/user.png');
        }

        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle:
            routeName === 'BookingDetail'
              ? { display: 'none' }
              : { backgroundColor: theme.colors.card },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.muted,
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: '300',
            color: 'black',
          },
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} icon={iconImage} />,
        };
      }}
    >

      <Tab.Screen
        name="BookingsTab"
        component={BookingsStack}
        options={{ title: 'Available' }}
      />
      <Tab.Screen
        name="MyBooking"
        component={MyBookingScreenWrapper}
        options={{ title: 'My Booking' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 9,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
});
