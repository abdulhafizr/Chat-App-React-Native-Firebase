import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '../../components';
import { colors } from '../../utils';

export function BottomTabNavigatorTheme({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Icon 
            key={label}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            style={styles.btn}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        height: 55,
        backgroundColor: colors.background.primary,
        borderTopColor: colors.border.primary,
        borderTopWidth: 1,
    },
    btn: {
      padding: 10
    },
})
