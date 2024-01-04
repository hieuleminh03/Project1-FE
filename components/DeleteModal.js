import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements'


const DeleteModal = (props) => {
    const [data, setData] = React.useState(props.expense ? props.expense : props.revenue)
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
                        maxWidth: 360,
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
                        Thông tin khoản tiêu dùng
                    </Text>
                    <Text style={styles.message}>Bạn chắc chắn muốn xóa khoản tiêu dùng ?</Text>
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
                                type: 'outline',
                            }}
                        >
                        </Button>
                        <Button
                            title="Xác nhận"
                            type='solid'
                            onPress={() => props.setModalVisible(false)}
                            buttonStyle={{
                                width: '60%',
                                backgroundColor:"red"
                            }}
                        >
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({
    message: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
        flexDirection: 'row',
        alignSelf: 'center',
        fontSize: 16,
    },
})