import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import {
    StyleSheet,
    Text, TouchableWithoutFeedback,
    View
} from 'react-native';
import { COLORS, FONTS } from '../../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

interface MyTabBar {
  state: any;
  descriptors: any;
  navigation: any;
}

const BOTTOM_TAB_BAR_ICONS: any = {
  Home: 'home',
  Search: 'search1',
  Account: 'user',
  Cart: 'shoppingcart',
};

const MyTabBar: React.FC<MyTabBar> = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomBarContainer}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
              }}>
              <AntDesign
                name={BOTTOM_TAB_BAR_ICONS[label]}
                size={20}
                color={isFocused ? COLORS.primary1 : COLORS.subText}
              />
              <Text
                style={{
                  color: isFocused ? COLORS.primary1 : COLORS.subText,
                  fontFamily:  FONTS.AcronymRegular,
                  fontSize: 12,
                }}>
                {label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBarContainer: {
    flexDirection: 'row',
    paddingHorizontal:10,
    paddingVertical: 10,
    justifyContent: 'space-around',
    backgroundColor: COLORS.lightModalBkg,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    gap: 10,
  },
});

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="Cart" component={Home} />
      <Tab.Screen name="Account" component={Home} />
    </Tab.Navigator>
  );
};
export default BottomTab;
