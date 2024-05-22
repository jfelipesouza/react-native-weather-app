import {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useMMKVNumber, useMMKVString} from 'react-native-mmkv';

import {axios} from '../../services/axios';
import {TOKENS} from '../../services/tokens';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/fonts';
import styles from './styles';

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
        <View style={styles.loadingContainer}>
          <Text style={styles.title} maxFontSizeMultiplier={1.1}>
            Buscando clima
          </Text>
          <ActivityIndicator size={fontSize.title} color={colors.blue} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title} maxFontSizeMultiplier={1.1}>
            Qual a sua localização?
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.textGray}
            placeholder="Procure a sua cidade"
            onChangeText={text => setInput(text)}
            onSubmitEditing={fetchWeather}
            ref={inputRef}
            maxFontSizeMultiplier={1.1}
          />
        </View>
      )}
    </View>
  );
};
