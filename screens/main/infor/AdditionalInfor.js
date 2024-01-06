import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

const AdditionalInfo = () => {
  const [currentData, setCurrentData] = React.useState(
    [
      { name: 'Category 1', population: 5, color: '#297AB1', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Category 2', population: 2, color: '#FFD700', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      // Thêm dữ liệu cho các danh mục khác nếu cần
    ]
  );
  const data = [
    { name: 'Category 1', population: 5, color: '#297AB1', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Category 2', population: 2, color: '#FFD700', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    // Thêm dữ liệu cho các danh mục khác nếu cần
  ];
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View>
      <Picker
        selectedValue={currentData}
        onValueChange={(itemValue, itemIndex) => setCurrentData(itemValue)}
        style={styles.picker}
      >
        {data.map((item, index) => (
          <Picker.Item key={index} label={item.name} value={item.name} />
        ))}
      </Picker>
      <Text>{currentData}</Text>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default AdditionalInfo;

const styles = StyleSheet.create({});
