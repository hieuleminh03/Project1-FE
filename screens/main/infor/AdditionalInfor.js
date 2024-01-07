import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

import { useAuth } from '../../../context/authContext'
import { getAllExpenses } from '../../../api/main'
import { getAllRevenues } from '../../../api/main'

import ToggleButton from '../../../components/ToggleButton';

async function getAllData(token) {
  // get revenue data
  const revenueData = await getAllRevenues(token)
    .then((response) => {
      return response.data
    })
  const expenseData = await getAllExpenses(token)
    .then((response) => {
      return response.data
    })
  // merge two list
  const data = [...revenueData, ...expenseData]
  return data
}

function getTimeFromData(data, format) {
  const time = []
  data.map((item) => {
    const [year, month, day] = String(item.time).split('-')

    switch (format) {
      case 'day':
        time.push(`${day}/${month}/${year}`)
        break
      case 'month':
        time.push(`${month}/${year}`)
        break
      case 'year':
        time.push(`${year}`)
        break
      default:
        time.push(`Something wrong happened!`)
        break
    }
  })
  return [...new Set(time)]
}


const AdditionalInfo = () => {
  const [currentData, setCurrentData] = React.useState([]);
  const [displayTime, setDisplayTime] = React.useState([])
  // first we need to get the data of expense and revenue (all data)
  const auth = useAuth()
  useEffect(() => {
    const getData = async () => {
      const data = await getAllData(auth.user.token)
      setCurrentData(data)
      setDisplayTime(getTimeFromData(data, 'day'))
    }
    getData()
  }, [])
  useEffect(() => {
    console.log(displayTime)
  }, [displayTime])

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: '#000000',
          paddingVertical: 20,
          paddingLeft: 10,
          fontWeight: 'bold',
        }}
      >Lựa chọn thời gian</Text>
      <ToggleButton/>
      <Picker
        style={styles.picker}
        onValueChange={(val) => console.log(val)}>
        {
          displayTime.map((item) => {
            return (
              <Picker.Item
                style={styles.pickerItem}
                label={item}
                value={item}
                key={item}
              />
            )
          })
        }
      </Picker>
      {/* <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      /> */}
    </View>
  );
};

export default AdditionalInfo;

const styles = StyleSheet.create({
  picker: {
    height: 30,
    width: "95%",
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1
  },
  pickerItem: {
    height: 30,
    width: "95%",
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
