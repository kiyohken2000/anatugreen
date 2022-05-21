import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RenderItem from '../components/RenderItem';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import { FAB } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function List() {
  const navigation = useNavigation();
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [word, setWord] = useState('')
  const [viewData, setViewData] = useState([])
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if(!word) {
      setViewData(data)
    } else {
      const filtered = data.filter((v) => v.name.toLowerCase().includes(word))
      setViewData(filtered)
    }
  }, [word])

  const fetchData = async() => {
    try {
      setIsLoading(true)
      const res = await axios.get(`https://example-data.draftbit.com/restaurants?_limit=${limit}`)
      setData(res.data)
      setViewData(res.data)
    } catch(e) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = async() => {
    try {
      setIsLoading(true)
      setLimit(prev => prev + 10)
      const res = await axios.get(`https://example-data.draftbit.com/restaurants?_limit=${limit}`)
      setData(res.data)
      if(!word) {
        setViewData(res.data)
      } else {
        const filtered = data.filter((v) => v.name.toLowerCase().includes(word))
        setViewData(filtered)
      }
    } catch(e) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          navigation.navigate('Favorites')
        }
      >
        <Text style={styles.text}>Go to favorites</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {!isLoading?
      <>
        <View style={styles.searchContainer}>
          <SearchBox
            value={word}
            onChangeText={(text) => setWord(text)}
          />
        </View>
        <FlatList
          data={viewData}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => {
            return (
              <RenderItem item={item} />
            );
          }}
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => loadMore()}
        />
        </>
        :<ActivityIndicator />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#010101'
  },
  header: {
    alignItems: 'center',
  },
  container: {
    flex: 1
  },
  searchContainer: {
    paddingTop: 30
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
  },
});