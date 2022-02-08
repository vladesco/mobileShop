import React, { FC } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerContentComponentProps,
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from './stack';
import { NavigationPages } from '../types';
import { useTheme } from '../helpers/hooks';
import { Theme } from '../theme';
import { noop } from '../helpers/functions';

const Drawer = createDrawerNavigator();

const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const styles = useTheme(styleGenerator);
    return (
        <>
            <Text style={styles.header}>Ecommerce Store</Text>
            <DrawerContentScrollView {...props}>
                <View style={styles.navigationBlock}>
                    <Text style={styles.subheader}>My account</Text>
                    <DrawerItem
                        label="My Profile"
                        icon={() => <Image source={require('../../assets/images/profile.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                    <DrawerItem
                        label="My Whish List"
                        icon={() => <Image source={require('../../assets/images/like_fill.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                    <DrawerItem
                        label="My Cart"
                        icon={() => <Image source={require('../../assets/images/shop_fill.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                    <DrawerItem
                        label="My Orders"
                        icon={() => <Image source={require('../../assets/images/approved_shop.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                </View>
                <View style={styles.navigationBlock}>
                    <Text style={styles.subheader}>Support</Text>
                    <DrawerItem
                        label="Email"
                        icon={() => <Image source={require('../../assets/images/email.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                    <DrawerItem
                        label="Call"
                        icon={() => <Image source={require('../../assets/images/call.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                </View>
                <View style={styles.lastNavigationBlock}>
                    <DrawerItem
                        label="Share"
                        icon={() => <Image source={require('../../assets/images/share.png')} />}
                        labelStyle={styles.label}
                        onPress={noop}
                    />
                </View>
            </DrawerContentScrollView>
        </>
    );
};

export const DrawerNavigator: FC = () => (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name={NavigationPages.MAIN} component={StackNavigator} />
    </Drawer.Navigator>
);

const styleGenerator = (theme: Theme) =>
    StyleSheet.create({
        header: {
            paddingLeft: 20,
            paddingBottom: 40,
            fontSize: 40,
            color: theme.secondaryColor,
            fontWeight: '700',
        },
        navigationBlock: {
            marginTop: 24,
            borderBottomWidth: 1,
            borderColor: theme.borderColor,
        },
        lastNavigationBlock: {
            marginTop: 24,
        },
        subheader: {
            color: theme.secondaryTextColor,
            fontSize: 20,
            paddingLeft: 20,
            paddingBottom: 20,
            fontWeight: '700',
        },
        label: {
            fontSize: 15,
        },
    });
