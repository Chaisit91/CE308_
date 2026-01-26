import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';

const DATA =[
  { id: '1', title: 'เล่นเกม' },
  { id: '2', title: 'ฟังเพลง' },
  { id: '3', title: 'เล่นฟุตบอล' },
  { id: '4', title: 'ดูหนัง' },
  { id: '5', title: 'ไปเที่ยวทะเล' },
  { id: '6', title: 'ศึกษาเกี่ยวกับการเขียนโปรแกรม' },
  { id: '7', title: 'เรียนรู้สิ่งใหม่ๆ' }
];
const DATA1 =[
  { id: '1', title: 'โดนดูถูก ' },
  { id: '2', title: 'ไม่ชอบเจอ bug code ' },
  { id: '3', title: 'ไม่ชอบอยู่คนเดียว' },
  { id: '4', title: 'ไม่ชอบอาหารรสจัด' },
];

const App = () => {
  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dot} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>
      <View style={styles.row}>
  <View style={[styles.box, { backgroundColor: '#FF6F61' }]}>
    <Text style={styles.title}> รหัส </Text>
    <Text style={styles.title}
    >
      66111534
    </Text>
  </View>

  <View style={[styles.box, { backgroundColor: '#6B5B95' }]}>
    <Text style={styles.title}>คณะ</Text>
    <Text  style={styles.title}
    >
      CITE
    </Text>
  </View>

  <View style={[styles.box, { backgroundColor: '#6B5B95' }]}>
    <Text style={styles.title}>สาขา</Text>
    <Text style={styles.title}
    >
      CE
    </Text>
  </View>
</View>

      <View style={styles.contentSection}>
        <Text style={styles.title}> ข้อมูลส่วนตัว :</Text>
          <View style={styles.listItem}>
            <Text> ชื่อ : ชัยสิทธิ์ หมัดอาเด็น</Text>
          </View>
          <View style={styles.listItem}>
            <Text> ชื่อเล่น : บาส</Text>
          </View>
          <View style={styles.listItem}>
            <Text> อีเมล : 66111534@dpu.ac.th</Text>
          </View>
        
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.title}> การศึกษา :</Text>
          <View style={styles.listItem}>
            <Text> ระดับอุดมศึกษา : มหาวิทยาลัยธุรกิจบัณฑิตย์</Text>
          </View>
          <View style={styles.listItem}>
            <Text> สาขา : วิศวกรรมคอมพิวเตอร์ (ชั้นปีที่3)</Text>
          </View>
          <View style={styles.listItem}>
            <Text> อีเมล : 66111534@dpu.ac.th</Text>
          </View>
      </View>
      <View style={styles.contentSection}>
        <Text style={styles.title}> ที่อยู่ :</Text>
          <View style={styles.listItem}>
            <Text> 114/31 หมู่2 ต.พิมลราช อ.บางบัวทอง จ.นนทบุรี 11110</Text>
          </View>
      </View>
      <View style={styles.contentSection}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>}
        />
      </View>
      <View style={styles.contentSection}>
        <FlatList
          data={DATA1}
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
    backgroundColor: '#141117',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 20,
    
   
  },
  box: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  boxText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },  
  contentSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6B5B95',
  },
  contentSectionFlatList: {
    marginTop: 20,
  },
  headerFlatList: {
    fontSize: 24,
    fontWeight: 'bold',
    padding:20,
    backgroundColor: '#2616d6',
    color: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6B5B95',
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
  value: {
  fontSize: 18,
  fontWeight: '700',
  color: '#FFFFFF',
  textAlign: 'center',
},
});

export default App;
