import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from 'react-native-elements'

const EditModal = (props) => {
    const [data, setData] = React.useState(props.expense ? props.expense : props.revenue)
    const [newName, setNewName] = React.useState('')
    const [newPrice, setNewPrice] = React.useState(0)

    useEffect(() => {
        setData(props.expense ? props.expense : props.revenue) 
    }, [props])

    if (!props.modalVisible) {
        return null
    }

    return (
        <Modal
            statusBarTranslucent={true}
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false);
            }}
        >
            <Pressable
                style={{
                    backgroundColor: "#232f34",
                    opacity: 0.4,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                onPress={() => props.setModalVisible(false)}
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        maxWidth: 350,
                        width: '100%',
                        margin: 48,
                        borderRadius: 20,
                        backgroundColor: 'white',
                    }}
                >
                    <Text
                        style={{
                            margin: 15,
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                            fontSize: 18,
                            flexDirection: 'row',
                            alignSelf: 'center',
                            paddingVertical: 10
                        }}
                    >
                        {props.expense ? 'Chỉnh sửa khoản chi' : 'Chỉnh sửa khoản thu'}
                    </Text>
                    <Text
                        style={{
                            marginLeft: 35,
                            fontSize: 10,
                        }}
                    >
                        {props.expense ? 'Tên khoản chi' : 'Tên khoản thu'}
                    </Text>
                    <TextInput
                        style={{
                            marginLeft: 24,
                            marginRight: 24,
                            marginBottom: 24,
                            flexDirection: 'row',
                            alignSelf: 'center',
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: 'grey',
                            paddingBottom: 5,
                            width: '80%',
                        }}
                        defaultValue={data.name}
                        maxLength={25}
                    >
                    </TextInput>
                    <Text
                        style={{
                            marginLeft: 35,
                            fontSize: 10,
                        }}
                    >
                        Số tiền:
                    </Text>
                    <TextInput
                        style={{
                            marginLeft: 24,
                            marginRight: 24,
                            marginBottom: 24,
                            flexDirection: 'row',
                            alignSelf: 'center',
                            fontSize: 16,
                            borderBottomWidth: 1,
                            borderColor: 'grey',
                            paddingBottom: 5,
                            width: '80%',
                        }}
                        defaultValue={data.price ? data.price.toString() : data.amount.toString()}
                        maxLength={12}
                        keyboardType='numeric'
                    >
                    </TextInput>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-evenly",
                            alignItems: 'center',
                            width: '100%',
                            alignSelf: 'center',
                            marginBottom: 24,
                        }}
                    >
                        <Button
                            title="Hủy"
                            type="outline"
                            onPress={() => props.setModalVisible(false)}
                            buttonStyle={{
                                width: '60%',
                                alignSelf: 'center',
                            }}
                        >
                        </Button>
                        <Button
                            title="Lưu"
                            type='solid'
                            onPress={() => props.setModalVisible(false)}
                            buttonStyle={{
                                width: '60%',
                            }}
                        >
                        </Button>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default EditModal
