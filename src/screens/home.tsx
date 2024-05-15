import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useMMKVNumber, useMMKVString} from 'react-native-mmkv';

import {colors} from '../theme/colors';
import {TOKENS} from '../services/tokens';
import {axios} from '../services/axios';

export const HomeScreen = () => {
  const [input, setInput] = useState<string>('');
  const [laoding, setLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const [locationName, setLocationName] = useMMKVString('locationName');
  const [LocationIfo, setLocationInfo] = useMMKVString('location');
  const [expires, setExpires] = useMMKVNumber('Expires');

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/forecast?${TOKENS.DEFAULT_SETTINGS}&appid=${TOKENS.API_KEY}&q=${input}`,
      );

      const data = await response.data;

      if (data.message !== 0) {
        throw new Error(data.message);
      }

      Alert.alert('Sucesso', 'Cidade localizada', [
        {
          text: 'Salvar',
          onPress: () => {
            setLocationName(input);
            setExpires(data.list[1].dt * 1000);
            setLocationInfo(JSON.stringify(data));

            inputRef.current?.clear();
          },
        },
        {
          text: 'Descartar',
          onPress: () => {
            inputRef.current?.clear();
          },
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', JSON.stringify(error.message));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, styles.content]}>
      <StatusBar backgroundColor={colors.bg} barStyle={'light-content'} />
      {laoding ? (
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Text style={styles.title}>Buscando clima</Text>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <View style={styles.content}>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 25,
    color: colors.textWhite,
    alignSelf: 'flex-start',
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
