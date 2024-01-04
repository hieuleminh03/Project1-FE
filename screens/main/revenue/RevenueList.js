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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiaWQiOjEsIm5hbWUiOiJMZSBNaW5oIEhpZXUiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkUDliWVFPZFNuMDloZXR6OXdZVGM3LlhuOXZnTFdyUjZ5aDVVODc2U2ZVenlUd3NURUlLV3UiLCJwYXNzd29yZENoYW5nZWRBdCI6bnVsbCwicGFzc3dvcmRDb2RlIjpudWxsLCJjb2RlUmVzZXRFeHBpcmVzIjpudWxsLCJzdGF0dXMiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjQtMDEtMDRUMDg6MTA6MTkuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDEtMDRUMDg6MTA6MTkuMDAwWiJ9fSwiaWF0IjoxNzA0MzU1ODM0LCJleHAiOjE3MDQ5NjA2MzQsImp0aSI6IjEifQ.BZFVVRegXrGbtYdKeCNbIqTre7moKKpmpl2pLlc96yc'

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllRevenues(token)
      console.log(response.data)
      setRevenues(response.data)
    }
    fetchData()
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
          />
          : null
      }
      {
        currentRevenue ?
          <DeleteModal
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            revenue={currentRevenue}
          />
          : null
      }
      <AddNewModal
        modalVisible={addNewModalVisible}
        setModalVisible={setAddNewModalVisible}
        type="revenue"
        token={token}
      />
    </View>
  )
}

export default RevenueList
