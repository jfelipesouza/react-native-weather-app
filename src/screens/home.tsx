import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import {colors} from '../theme/colors';
import {axios} from '../services/axios';
import {TOKENS} from '../services/tokens';
import {useMMKVString} from 'react-native-mmkv';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../routers/stack';

export const HomeScreen = () => {
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<TextInput>(null);
  const [locale, setLocale] = useMMKVString('location');
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const fetchWeather = async () => {
    console.log(input);
    try {
      const response = await axios.get(
        `forecast?${TOKENS.DEFAULT_SETTINGS}&appid=${TOKENS.API_KEY}&cnt=5&q=${input}`,
      );
      const data = await response.data;
      if (data) {
        inputRef.current?.clear();
        setLocale(input);
        navigation.replace('weatherScreen');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.bg} barStyle={'light-content'} />
      <Text style={styles.title}>Qual a sua localização?</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textGray}
        placeholder="Procure a sua cidade"
        onChangeText={text => setInput(text)}
        onSubmitEditing={fetchWeather}
        ref={inputRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 25,
    color: colors.textWhite,
  },
  input: {
    color: colors.textWhite,
    backgroundColor: colors.bgItem,
    width: Dimensions.get('screen').width * 0.8,
    paddingHorizontal: 10,
    fontSize: 18,
    paddingVertical: 20,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
  },
});
