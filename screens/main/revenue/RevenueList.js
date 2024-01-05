import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import InforBox from '../../../components/InforBox'
import InforModal from '../../../components/InforModal'
import EditModal from '../../../components/EditModal'
import DeleteModal from '../../../components/DeleteModal'
import AddNewModal from '../../../components/AddNewModal'
import { ScrollView } from 'react-native-gesture-handler'

import { getAllRevenues } from '../../../api/main'
import { useEffect } from 'react'
import { Icon } from 'react-native-elements'

function processTime(time) {
  const [year, month, day] = String(time).split('-')
  return `${day}/${month}/${year}`
}
const RevenueList = () => {
  const [revenues, setRevenues] = React.useState([])
  const [modalVisible, setModalVisible] = React.useState(false)
  const [editModalVisible, setEditModalVisible] = React.useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [addNewModalVisible, setAddNewModalVisible] = React.useState(false)
  const [currentRevenue, setCurrentRevenue] = React.useState(null)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjksIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiIxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFpZS0xIS3RIeFFrM3pNcGhrc2dBUmVpdXdMa3dyci4zNEhUTFpyenlScDdua1o5V212UHVxIiwicGFzc3dvcmRDaGFuZ2VkQXQiOm51bGwsInBhc3N3b3JkQ29kZSI6bnVsbCwiY29kZVJlc2V0RXhwaXJlcyI6bnVsbCwic3RhdHVzIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDI0LTAxLTA1VDEyOjMxOjMxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAxLTA1VDEyOjMxOjMxLjAwMFoifX0sImlhdCI6MTcwNDQ1NzkxNCwiZXhwIjoxNzA1MDYyNzE0LCJqdGkiOiI2In0.RC7YScC7fiUxuWd8V9CfPyXdn-kZEOu9O1h6dbLxqy4'

  const handleOpenModal = (revenue) => {
    setCurrentRevenue(revenue)
    setModalVisible(true)
  }

  const handleOpenEditModal = (revenue) => {
    setCurrentRevenue(revenue)
    setEditModalVisible(true)
  }

  const handleOpenDeleteModal = (revenue) => {
    setCurrentRevenue(revenue)
    setDeleteModalVisible(true)
  }

  const updateRevenuesData = async () => {
    try {
      const response = await getAllRevenues(token)
      setRevenues(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  const resetModalData = () => {
    setCurrentRevenue(null)
    setModalVisible(false)
    setEditModalVisible(false)
    setDeleteModalVisible(false)
  }

  useEffect(() => {
      updateRevenuesData()
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
            revenues ?
              revenues.map((revenue) => {
                return (
                  <InforBox
                    key={revenue.id}
                    name={revenue.name}
                    price={revenue.price}
                    time={processTime(revenue.time)}
                    func={() => {
                      handleOpenModal(revenue)
                    }}
                    editFunc={() => {
                      handleOpenEditModal(revenue)
                    }}
                    deleteFunc={() => {
                      handleOpenDeleteModal(revenue)
                    }}
                  />
                )
              })
              : null
          }
        </View>
      </ScrollView>
      {
        currentRevenue ?
          <InforModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            revenue={currentRevenue}
          />
          : null
      }
      {
        currentRevenue ?
          <EditModal
            modalVisible={editModalVisible}
            setModalVisible={setEditModalVisible}
            revenue={currentRevenue}
            type="revenue"
            token={token}
            updateData={updateRevenuesData}
            reset={resetModalData}
          />
          : null
      }
      {
        currentRevenue ?
          <DeleteModal
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            revenue={currentRevenue}
            type="reve  nue"
            token={token}
            updateData={updateRevenuesData}
          />
          : null
      }
      <AddNewModal
        modalVisible={addNewModalVisible}
        setModalVisible={setAddNewModalVisible}
        type="revenue"
        token={token}
        updateData={updateRevenuesData}
      />
    </View>
  )
}

export default RevenueList
