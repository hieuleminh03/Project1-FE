import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import InforBox from '../../../components/InforBox'
import InforModal from '../../../components/InforModal'
import EditModal from '../../../components/EditModal'
import DeleteModal from '../../../components/DeleteModal'
import AddNewModal from '../../../components/AddNewModal'
import { ScrollView } from 'react-native-gesture-handler'

import { getAllExpenses } from '../../../api/main'
import { useEffect } from 'react'
import { Icon } from 'react-native-elements'

function processTime(time) {
  const [year, month, day] = String(time).split('-')
  return `${day}/${month}/${year}`
}
const ExpenseList = () => {
  const [expenses, setExpenses] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [addNewModalVisible, setAddNewModalVisible] = React.useState(false)
  const [currentExpense, setCurrentExpense] = React.useState(null)

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjksIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFpZS0xIS3RIeFFrM3pNcGhrc2dBUmVpdXdMa3dyci4zNEhUTFpyenlScDdua1o5V212UHVxIiwicGFzc3dvcmRDaGFuZ2VkQXQiOm51bGwsInBhc3N3b3JkQ29kZSI6bnVsbCwiY29kZVJlc2V0RXhwaXJlcyI6bnVsbCwic3RhdHVzIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTA1VDEyOjMxOjMxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAxLTA1VDEyOjMxOjMxLjAwMFoifX0sImlhdCI6MTcwNDQ1NzkxNCwiZXhwIjoxNzA1MDYyNzE0LCJqdGkiOiI2In0.RC7YScC7fiUxuWd8V9CfPyXdn-kZEOu9O1h6dbLxqy4'

  const handleOpenModal = (expense) => {
    setCurrentExpense(expense)
    setModalVisible(true)
  }

  const handleOpenEditModal = (expense) => {
    setCurrentExpense(expense)
    setEditModalVisible(true)
  }

  const handleOpenDeleteModal = (expense) => {
    setCurrentExpense(expense)
    setDeleteModalVisible(true)
  } 

  const updateExpensesData = async () => {
    try {
      const response = await getAllExpenses(token)
      setExpenses(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    updateExpensesData()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon 
        name="add-circle" 
        size={40} 
        color="black"
        onPress={() => {
          setAddNewModalVisible(true)
        }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingBottom: 15
          }}
        >
          {
            expenses &&
            expenses.map((expense) => {
              return (
                <InforBox
                  key={expense.id}
                  name={expense.name}
                  price={expense.price}
                  time={processTime(expense.time)}
                  func={() => {
                    handleOpenModal(expense)
                  }}
                  editFunc={() => {
                    handleOpenEditModal(expense)
                  }}
                  deleteFunc={() => {
                    handleOpenDeleteModal(expense)
                  }}
                  />
              )
            })
          }
        </View>
      </ScrollView>
      {
        currentExpense ?
          <InforModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            expense={currentExpense}
          />
          : null
      }
      {
        currentExpense ?
          <EditModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            expense={currentExpense}
          />
          : null
      }
      {
        currentExpense ?
          <DeleteModal
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            expense={currentExpense}
            type="expense"
            token={token}
            updateData={updateExpensesData}
          />
          : null
      }
      <AddNewModal
        modalVisible={addNewModalVisible}
        setModalVisible={setAddNewModalVisible}
        type="expense"
        token={token}
        updateData={updateExpensesData}
      />
    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({})