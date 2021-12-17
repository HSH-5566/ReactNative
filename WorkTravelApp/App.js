import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { color } from './color';

export default function App() {
  const LIST_KEY = '@LIST';
  const BTN_KEY = '@BTN';
  const [work, setWork] = useState(true);
  const [lists, setLists] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    getBtn();
    getList();
  }, [])

  const getList = async () => {
    try {
      const value = await AsyncStorage.getItem(LIST_KEY);
      if(value !== null) {
        setLists(JSON.parse(value));
      }
    } catch(e) {
      console.log('List get Error')
    }
  }

  const storeList = async (value) => {
    try {
      await AsyncStorage.setItem(LIST_KEY, JSON.stringify(value))
    } catch (e) {
      console.log('List store Error');
    }
  }

  const saveList = () => {
    if (text === ''){
      return;
    }
    const newList = {...lists, [Date.now()]: {'text': text, 'work': work, 'complete': false, 'modify': false}};
    storeList(newList);
    setLists(newList);
    setText('');
  }

  const deleteList = (key) => {
    Alert.alert('해당 메모를 삭제하겠습니까?', '복구할 수 없습니다!',
      [{
          text: "No",
        },
        {
          text: "Yes",
          onPress: () =>{
            const newList = {...lists};
            delete newList[key];
            storeList(newList);
            setLists(newList);
          },
      }],
      {
        cancelable: true,
      }
    )}

  const getBtn = async () => {
    try {
      const value = await AsyncStorage.getItem(BTN_KEY);
      if(value !== null) {
        setWork(JSON.parse(value));
      }
    } catch(e) {
      console.log('Btn get Error')
    }
  }

  const storeBtn = async (bool) => {
    try {
      await AsyncStorage.setItem(BTN_KEY, JSON.stringify(bool));
    } catch (e) {
      console.log('Btn store Error');
    }
  }
  
  const working = () => {
    setWork(true);
    storeBtn(true);
  }
  const traveling = () => {
    setWork(false);
    storeBtn(false);
  }

  const completeList =(key) => {
    const newList = {...lists};
    newList[key].complete = !newList[key].complete;
    storeList(newList);
    setLists(newList);
  }

  const modifyState = (key) => {
    const newList = {...lists};
    newList[key].modify = true;
    storeList(newList);
    setLists(newList);
  }

  const modifyList = (text, key) => {
    const newList = {...lists};
    newList[key].text = text.nativeEvent.text;
    newList[key].modify = false;
    storeList(newList);
    setLists(newList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={working}>
          <Text style={work? {...styles.btn, color:color.btnClick}: styles.btn}>
            WORK
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={traveling}>
          <Text style={work? styles.btn: {...styles.btn, color:color.btnClick}}>
            TRAVEL
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput 
          placeholder={work? "할 일을 입력해주세요": "여행갈 곳을 입력해주세요"}
          value={text}
          onChangeText={(input) => setText(input)}
          onSubmitEditing={saveList}
          style={styles.input}>
        </TextInput>
      </View>
      <ScrollView>
        {
          Object.keys(lists).map(key => work === lists[key].work? 
            lists[key].modify? 
              (<TextInput key={key} defaultValue={lists[key].text}
                          onEndEditing={(text) => modifyList(text, key)}
                          autoFocus
                          style={{...styles.input, marginTop: 10}}
                          onSubmitEditing={(text) => modifyList(text, key)}>
              </TextInput>): 
              (<View key={key} style={styles.listContent}>
                <Text onPress={() => modifyState(key)} 
                      style={lists[key].complete? {...styles.text, textDecorationLine: 'line-through'}: styles.text}>
                  {lists[key].text}
                </Text>
                <View style={styles.iconList}>
                  <TouchableOpacity onPress={() => completeList(key)}>
                    <FontAwesome name="check" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteList(key)}>
                    <FontAwesome name="trash-o" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>): null
          )
        }
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.bg,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  btn: {
    fontSize: 30,
    color: color.btn,
  },
  input: {
    backgroundColor: color.input,
    color: color.inputText,
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  listContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: color.list,
  },
  text: {
    flex: 8,
    color: color.listText,
    fontSize: 20,
  },
  iconList: {
    flex: 2,
    flexDirection:'row',
  },
  icon: {
    fontSize: 24,
    paddingLeft: 10,
    color: color.icon,
  },
});