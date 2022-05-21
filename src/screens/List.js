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
  const [word, setWord] = useState('')
  const [viewData, setViewData] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    const filtered = data.filter((v) => v.name.toLowerCase().includes(word))
    setViewData(filtered)
  }, [word, data])

  const fetchData = async() => {
    try {
      const res = await axios.get(`https://example-data.draftbit.com/restaurants?_page=${page}`)
      setData(prev => prev.concat(res.data))
    } catch(e) {
      console.log('error', e)
    }
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
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
      {data.length?
        <>
        <View style={styles.searchContainer}>
          <SearchBox
            value={word}
            onChangeText={(text) => setWord(text)}
          />
        </View>
        <FlatList
          data={word?viewData:data}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item, index) => index.toString()}
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