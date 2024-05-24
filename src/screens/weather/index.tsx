import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Search} from 'lucide-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useMMKVString} from 'react-native-mmkv';

import {StackParams} from '../../@types/screens';
import {Weather} from '../../@types/weather';
import {colors} from '../../theme/colors';
import {fontSize} from '../../theme/fonts';
import {WeatherItem} from '../../components/WeatherItem';
import {WeatherDay} from '../../components/WeatherDay';
import {TOKENS} from '../../services/tokens';
import {axios} from '../../services/axios';
import {round} from '../../services/math';
import {transformDate} from '../../services/date';
import styles from './styles';

export const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [location] = useMMKVString(TOKENS.LOCATION_NAME);
  const [currentLocation, setCurrentLocation] = useMMKVString(
    TOKENS.CURRENT_LOCATION,
  );

  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  const fetchWeatherData = async (city: string) => {
    try {
      const response = await axios.get(
        `/forecast?${TOKENS.DEFAULT_SETTINGS}&appid=${TOKENS.API_KEY}&q=${city}`,
      );
      const data = (await response.data) as Weather;
      if (data.message !== 0) {
        throw new Error(data.message);
      }
      setWeatherData(data);
    } catch (error: any) {
      console.error(error);
      return Alert.alert(
        'Error',
        `Tivemos um problema do tipo ${JSON.stringify(
          error.message,
        )}. Tente mais tarde, caso erro persista entrar em contato com o suporte.`,
        [{text: 'ok'}],
      );
    }
  };

  const transformInTitle = (text: string): string => {
    return text[0].toLocaleUpperCase() + text.slice(1, text.length);
  };

  const handleNavigate = () => {
    navigation.replace('searchScreen');
  };

  const loadingPage = () => {
    if (currentLocation !== location) {
      setCurrentLocation(location);
    }
    fetchWeatherData(location!);
  };

  useFocusEffect(React.useCallback(loadingPage, []));

  useEffect(() => {
    if (weatherData === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [weatherData]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.bg} barStyle={'light-content'} />

      {loading || weatherData === null ? (
        <ActivityIndicator size={fontSize.title * 4} color={colors.blue} />
      ) : (
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View>
              <Text maxFontSizeMultiplier={1.1} style={styles.headerTitle}>
                {weatherData.city.name}
              </Text>
              <Text maxFontSizeMultiplier={1.1} style={styles.headerSubTitle}>
                {transformInTitle(weatherData.list[0].weather[0].description)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleNavigate}
              style={styles.searchButton}>
              <Search size={20} color={colors.textWhite} />
            </TouchableOpacity>
          </View>

          <View style={styles.weatherContent}>
            <Text maxFontSizeMultiplier={1.1} style={styles.weatherTemp}>
              {round(weatherData.list[0].main.temp)}°C
            </Text>
          </View>

          <View style={styles.weatherInfo}>
            <WeatherItem
              type="thermometer"
              category={'Sensação Termica'}
              value={`${round(weatherData.list[0].main.temp)}°C`}
              border
            />
            <WeatherItem
              type="rain"
              border
              category={'Chance de chuva'}
              value={`${round(weatherData.list[0].pop * 100).toFixed(0)}%`}
            />
            <WeatherItem
              type="wind"
              category={'Velocidade dos ventos'}
              value={`${round(weatherData.list[0].wind.speed * 3.6)} Km`}
              border
            />
            <WeatherItem
              type="droplet"
              category="Umidade do ar"
              value={`${round(weatherData.list[0].main.humidity)}%`}
            />
          </View>

          <FlatList
            data={weatherData.list}
            renderItem={({item}) => (
              <WeatherDay
                day={transformInTitle(transformDate(item.dt))}
                maxTemp={round(item.main.temp_max)}
                minTemp={round(item.main.temp_min)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </View>
  );
};
