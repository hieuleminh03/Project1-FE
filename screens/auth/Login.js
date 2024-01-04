import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../context/authContext';

import { useWindowDimensions } from 'react-native';

export const Login = ({ navigation }) => {

    const window = useWindowDimensions();

    const auth = useAuth();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EDEDED',
            }}
        >
            <View
                style={{
                    // full width but padding on left and right
                    height: window.height * 0.51,
                    width: window.width * 0.95,
                    backgroundColor: '#1D5461',
                    borderRadius: 20,
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 50,
                    }}
                >
                    <Ionicons name="wallet-outline" size={60} color="#EDEDED" />
                </View>
                <View
                    style={{
                        marginTop: 20,
                        paddingTop: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            marginHorizontal: 20,
                            color: '#EDEDED',
                        }}
                    >
                        Email
                    </Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#EDEDED',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            // above line on text input
                            fontSize: 15,
                            paddingBottom: 10,

                        }}
                    >
                    </TextInput>
                </View>
                <View
                    style={{
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            marginHorizontal: 20,
                            color: 'white',
                        }}
                    >
                        Password
                    </Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#EDEDED',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            // above line on text input
                            fontSize: 15,
                            paddingBottom: 10,

                        }}
                    >
                    </TextInput>
                    <View
                        style={{
                            marginTop: 30,
                            height: 40,
                            width: window.width * 0.5,
                            alignSelf: 'center',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: 40,
                                backgroundColor: '#EDEDED',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{
                                color: "#1D5461",
                                fontSize: 15,
                            }}>Đăng nhập</Text>
                        </TouchableOpacity>

                        <Text
                            style={{
                                paddingTop: 20,
                                color: '#EDEDED',
                                alignSelf: 'center',
                                fontSize: 13,
                            }}
                            onPress={() => navigation.navigate('Signup')}
                        >
                            Tạo tài khoản mới
                        </Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Login;