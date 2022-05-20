import React, { useState, useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Fetch } from 'react-request';
import { Ionicons, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons'
import { FavoritesContext } from '../contexts/FavoritesContext';
import RenderItem from '../components/RenderItem';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function List() {
  const navigation = useNavigation();
  const { favoriteList, setFavoriteList } = useContext(FavoritesContext)

  const onFavorite = restaurant => {
    setFavoriteList([...favoriteList, restaurant]);
  };

  const onRemoveFavorite = restaurant => {
    const filteredList = favoriteList.filter(
      item => item.id !== restaurant.id
    );
    setFavoriteList(filteredList);
  };

  const ifExists = restaurant => {
    if (favoriteList.filter(item => item.id === restaurant.id).length > 0) {
      return true;
    }
    return false;
  };

  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          navigation.navigate('Favorites', {favoriteList})
        }
      >
        <Text style={styles.text}>Go to favorites</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Fetch
      method='GET'
      url={`https://example-data.draftbit.com/restaurants?_limit=10`}
      headers={{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <ActivityIndicator />;
        }

        if (error) {
          return null;
        }

        if (!data) {
          return null;
        }

        return (
          <FlatList
            data={data}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => {
              return (
                <RenderItem item={item} />
              );
            }}
          />
        );
      }}
    </Fetch>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 30,
    borderRadius: 8,
    backgroundColor: '#edf2fb'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    opacity: 0.7
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontColor: '#010101'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  }
});