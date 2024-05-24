import React, {useRef, useState} from 'react';
import {Text, Pressable, View, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';
import {useMMKVString} from 'react-native-mmkv';

import {Weather} from '../../@types/weather';
import {fontSize} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {axios} from '../../services/axios';
import {TOKENS} from '../../services/tokens';
import styles from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../@types/screens';

export const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [input, setInputValue] = useState<string>('');

  const inputRef = useRef<TextInput>(null);
  const [currentLocationName, setCurrentLocationName] = useMMKVString(
    TOKENS.CURRENT_LOCATION,
  );
  const [locationName, setLocationName] = useMMKVString(TOKENS.LOCATION_NAME);

  const handleGoBack = () => {
    navigation.replace('weatherScreen');
  };

  const saveData = (data: string) => {
    if (data === currentLocationName) {
      return;
    } else {
      setLocationName(input);
      handleGoBack();
    }
  };

  const fetchNewCity = async () => {
    try {
      const response = await axios.get(
        `/forecast?q=${input}&appid=${TOKENS.API_KEY}${TOKENS.DEFAULT_SETTINGS}`,
      );
      const data = (await response.data) as Weather;

      if (data.message !== 0) {
        throw new Error(data.message);
      }

      Alert.alert('Encontrada!', 'Sua nova localização foi encontrada', [
        {
          text: 'Salvar',
          onPress: () => {
            saveData(input);
          },
        },
        {
          text: 'Descartar',
          onPress: handleGoBack,
          style: 'destructive',
        },
      ]);
    } catch (error: any) {
      Alert.alert('Ops!', 'Ocorreu um erro na busca pela nova localização', [
        {
          text: 'Voltar',
          onPress: handleGoBack,
          style: 'default',
        },
        {
          text: 'Tentar novamente',
        },
      ]);
      console.error(error.message);
    } finally {
      inputRef.current?.clear();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={handleGoBack}>
        <ArrowLeft size={fontSize.icon} color={colors.textWhite} />
        <Text style={styles.title}> Voltar</Text>
      </Pressable>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{width: '100%', gap: 15, paddingHorizontal: 20}}>
          <Text style={{color: colors.textWhite, fontSize: fontSize.subtitle}}>
            Busque a sua nova localização
          </Text>
          <TextInput
            placeholderTextColor={colors.textGray}
            placeholder={'Qual a nova localização?'}
            style={[
              {
                fontSize: fontSize.input,
                backgroundColor: colors.bgItem,
                borderColor: colors.border,
                borderWidth: 2,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 15,
                color: colors.textWhite,
              },
            ]}
            ref={inputRef}
            onChangeText={setInputValue}
            onSubmitEditing={fetchNewCity}
          />
        </View>
      </View>
    </View>
  );
};
