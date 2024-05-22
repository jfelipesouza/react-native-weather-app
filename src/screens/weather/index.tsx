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
import {useMMKVNumber, useMMKVString} from 'react-native-mmkv';

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
  const [locationInfo, setLocationInfo] = useMMKVString('location');
  const [location] = useMMKVString('locationName');
  const [expires, setExpires] = useMMKVNumber('Expires');

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
      setExpires(data!.list[1].dt * 10000);
      setLocationInfo(JSON.stringify(data));
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

  useEffect(() => {
    if (expires && expires < Date.now()) {
      fetchWeatherData(location!);
    } else if (locationInfo && locationInfo.trim() !== '') {
      const data = JSON.parse(locationInfo) as Weather;
      setWeatherData(data);
    } else {
      fetchWeatherData(location!);
    }
  }, []);

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
            <TouchableOpacity></TouchableOpacity>
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
