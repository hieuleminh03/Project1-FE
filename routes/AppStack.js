import * as React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerToggleButton  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ExpenseList from '../screens/main/expense/ExpenseList';
import RevenueList from '../screens/main/revenue/RevenueList';
import InforScreen from '../screens/main/infor/AdditionalInfor';



import { useAuth } from '../context/authContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const auth = useAuth();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View
                style={{
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.5,
                    marginVertical: 10,
                    width: '80%',
                    alignSelf: 'center',
                }}
            />
            <DrawerItem
                icon={() => (
                    <Icon name="logout" size={24} color="grey" />
                )}
                label="Đăng xuất"
                // exit app 
                onPress={() => { auth.setUser(null) }}
            />
        </DrawerContentScrollView>
    );
}
export const AppStack = () => {
    const auth = useAuth();
    const dimensions = useWindowDimensions();
    return (
        <NavigationContainer
            independent={true}
        >
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerType: dimensions.width >= 768 ? 'permanent' : 'back',
                    swipeEdgeWidth: 120,
                    // from left to right
                    drawerPosition: 'right',
                    // hamburger on the right
                    headerLeft: false,
                    headerRight: () => <DrawerToggleButton />,
                    // center the header text
                    headerTitleAlign: 'center',
                    drawerStyle: {
                        flex: 1,
                        height: "100%",
                        paddingTop: 15,
                    }
                }}
            >   
                <Drawer.Screen
                    name="Quản lý khoản thu"
                    component={RevenueList}
                    options={{
                        drawerIcon: () => (
                            <Icon name="money" size={24} color="grey" />
                        ),
                        style: {
                            backgroundColor: 'red',
                        }
                    }}
                />
                <Drawer.Screen
                    name="Quản lý khoản tiêu dùng"
                    component={ExpenseList}
                    options={{
                        drawerIcon: () => (
                            <Icon name="code" size={24} color="grey" />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Thống kê"
                    component={InforScreen}
                    options={{
                        drawerIcon: () => (
                            <Icon name="camera" size={24} color="grey" />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}