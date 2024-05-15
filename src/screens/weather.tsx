import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useMMKVNumber, useMMKVString} from 'react-native-mmkv';

import {Weather} from '../@types/weather';
import {TOKENS} from '../services/tokens';
import {colors} from '../theme/colors';
import {round} from '../services/math';
import {WeatherItem} from '../components/WeatherItem';
import {WeatherDay} from '../components/WeatherDay';
import {transformDate} from '../services/date';
import {axios} from '../services/axios';

const {width, height} = Dimensions.get('window');

export const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationInfo, setLocationInfo] = useMMKVString('location');
  const [location] = useMMKVString('locationName');
  const [expires] = useMMKVNumber('Expires');

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
      setLocationInfo(JSON.stringify(data));
    } catch (error: any) {
      Alert.alert(
        'Error',
        `Tivemos um problema do tipo ${JSON.stringify(
          error.message,
        )}. Tente mais tarde, caso erro persista entrar em contato com o suporte.`,
        [{text: 'ok'}],
      );
      console.error(error);
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
        <ActivityIndicator size={120} />
      ) : (
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerTitle}>{weatherData.city.name}</Text>
              <Text style={styles.headerSubTitle}>
                {transformInTitle(weatherData.list[0].weather[0].description)}
              </Text>
            </View>
            <TouchableOpacity></TouchableOpacity>
          </View>

          <View style={styles.weatherContent}>
            <Text style={styles.weatherTemp}>
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
            contentContainerStyle={{
              alignSelf: 'flex-end',
              maxHeight: height,
              paddingHorizontal: 10,
              gap: 20,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  content: {
    paddingVertical: 10,
    gap: 40,
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 30,
    color: colors.textWhite,
  },
  headerSubTitle: {
    fontWeight: '600',
    fontSize: 24,
    color: colors.textGray,
  },
  weatherContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTemp: {
    fontWeight: '700',
    fontSize: 80,
    color: colors.textWhite,
  },
  weatherInfo: {
    width: width - 30,
    backgroundColor: colors.bgItem,
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
