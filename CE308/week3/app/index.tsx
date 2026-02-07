import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

// const DATA = [
//   { id: '1', title: 'การใช้ View' },
//   { id: '2', title: 'การใช้ Text' },
//   { id: '3', title: 'การใช้ ScrollView' },
//   { id: '4', title: 'การใช้ FlatList' },
// ];

const likeData = [
  { id: '1', title: '  dev' },
  { id: '2', title: 'ดูหนัง' },
  { id: '3', title: 'ฟังเพลง' },
  { id: '4', title: 'ฟุตบอล' },
];

const dontLikeData = [
  { id: '1', title: 'เล่นเกม' },
  { id: '2', title: 'นอนหลับ' },
];

const profileData = [
  { id: 'ชื่อ', title: 'ชัยสิทธิ์' },
  { id: 'ชื่อเล่น', title: 'บาส' },
  { id: 'อีเมล', title: 'หมัดอาเด็น' },
  { id: 'เบอร์โทร', title: '082-971-7612' },
];

const educationData = [
  { id: 'ระดับอุดมศึกษา', title: 'DPU'},
  { id: 'สาขา', title: 'วิศวกรรมคอมพิวเตอร์ (CE)'}
]

const App = () => {

  const renderItem = ({ item }: { item: { id: string; title: string } }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.dot} />
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#FF6B6B'}]}>
          <Text style={styles.boxText}>รหัส</Text>
          <Text style={styles.boxText}>66111534</Text>
        </View>
        <View style={[styles.box, {backgroundColor: '#4ECDC4'}]}>
          <Text style={styles.boxText}>คณะ</Text>
          <Text style={styles.boxText}>CITE</Text>
        </View>
        <View style={[styles.box, {backgroundColor: '#55a81b'}]}>
          <Text style={styles.boxText}>สาขา</Text>
          <Text style={styles.boxText}>CE</Text>
        </View>
      </View>

      {/* <View style={styles.contentSection}>
        <Text style={styles.title}>บทเรียนวันนี้:</Text>
        {Array.from({length : 10}).map((_, index) => (
          <View key={index} style={styles.listItem}>
            <Text>รายการที่ {index + 1}:เรียนรู้เรื่อง React Native Layout</Text>
          </View>
        ))}
      </View> */}

      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว:</Text>
        {profileData.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{item.id} : {item.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา:</Text>
        {educationData.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{item.id} : {item.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ที่อยู่:</Text>
        <View style={styles.listItem}>
            <Text>114/31 หมู่2 ต.พิมลราช อ.บางบัวทอง จ.นนทบุรี 11110</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <FlatList
          data={likeData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>}
        />
      </View>

      <View style={styles.contentSection}>
        <FlatList
          data={dontLikeData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ไม่ชอบ</Text>}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    height: 100,
    backgroundColor: '#3cc2d6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  box: {
    flex: 1,
    height: 100,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: '600',
  },
  contentSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#90cdeb',
  },
  contentSectionFlatList: {
    marginTop: 20,
  },
  headerFlatList: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: 'rgb(220, 228, 108)'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
    marginRight: 10,
  },
  itemText:  {
    fontSize: 18,
  }
});

export default App;