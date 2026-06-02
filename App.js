import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_700Bold,
  EBGaramond_400Regular_Italic,
  EBGaramond_700Bold_Italic,
} from '@expo-google-fonts/eb-garamond';

import ContentsScreen from './src/screens/ContentsScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import SearchScreen from './src/screens/SearchScreen';
import { COLORS, FONTS } from './src/theme';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ContentsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contents" component={ContentsScreen} />
      <Stack.Screen name="Reader" component={ReaderScreen} />
    </Stack.Navigator>
  );
}

function TabIcon({ label, focused }) {
  const icons = {
    Gospel: focused ? '✦' : '◇',
    Search: focused ? '⊕' : '⊙',
    Bookmarks: focused ? '✦' : '◆',
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{
        fontSize: label === 'Gospel' ? 16 : 14,
        color: focused ? COLORS.gold : COLORS.textMuted,
        marginBottom: 2,
      }}>
        {icons[label] || '◇'}
      </Text>
      <Text style={{
        fontFamily: focused ? FONTS.serifBold : FONTS.serif,
        fontSize: 10,
        color: focused ? COLORS.gold : COLORS.textMuted,
        letterSpacing: 1,
      }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_700Bold,
    EBGaramond_400Regular_Italic,
    EBGaramond_700Bold_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={COLORS.gold} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: COLORS.gold,
              background: COLORS.bg,
              card: COLORS.headerBg,
              text: COLORS.textPrimary,
              border: COLORS.goldBorder,
              notification: COLORS.gold,
            },
          }}
        >
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: COLORS.tabBar,
                borderTopColor: COLORS.tabBarBorder,
                borderTopWidth: 1,
                height: 70,
                paddingBottom: 10,
                paddingTop: 10,
              },
            }}
          >
            <Tab.Screen
              name="GospelTab"
              component={ContentsStack}
              options={{
                tabBarIcon: ({ focused }) => <TabIcon label="Gospel" focused={focused} />,
              }}
            />
            <Tab.Screen
              name="SearchTab"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ focused }) => <TabIcon label="Search" focused={focused} />,
              }}
            />
            <Tab.Screen
              name="BookmarksTab"
              component={BookmarksScreen}
              options={{
                tabBarIcon: ({ focused }) => <TabIcon label="Bookmarks" focused={focused} />,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
