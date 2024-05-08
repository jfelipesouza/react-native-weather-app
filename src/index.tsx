import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from './theme/colors';
import {WeatherItem} from './components/WeatherItem';
import {WeatherDay} from './components/WeatherDay';
import {axios} from './services/axios';
import {TOKENS} from './services/tokens';
import {Weather} from './@types/weather';

const {width, height} = Dimensions.get('window');

export const MyApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  const fetchWeatherData = async (city: string, numberOfDays: number) => {
    try {
      const response = await axios.get(
        `forecast?${TOKENS.DEFAULT_SETTINGS}&appid=${TOKENS.API_KEY}&cnt=${numberOfDays}&q=${city}`,
      );
      const data = await response.data;

      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const transformInTitle = (text: string): string => {
    return text[0].toLocaleUpperCase() + text.slice(1, text.length);
  };

  useEffect(() => {
    fetchWeatherData('Itabaiana', 5);
  }, []);

  if (weatherData === null) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.bg} barStyle={'light-content'} />
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>{weatherData.city.name}</Text>
          <Text style={styles.headerSubTitle}>
            {transformInTitle(weatherData.list[0].weather[0].description)}
          </Text>
        </View>
      </View>

      <View style={styles.weatherContent}>
        <Text style={styles.weatherTemp}>
          {Math.round(weatherData.list[0].main.temp)}°C
        </Text>
      </View>

      <View style={styles.weatherInfo}>
        <WeatherItem
          type="thermometer"
          category={'Sensação Termica'}
          value={`${Math.round(weatherData.list[0].main.temp)}°C`}
          border
        />
        <WeatherItem
          type="rain"
          border
          category={'Chance de chuva'}
          value={`${weatherData.list[0].pop * 100}%`}
        />
        <WeatherItem
          type="wind"
          category={'Velocidade dos ventos'}
          value={`${Math.round(weatherData.list[0].wind.speed * 3.6)} Km`}
          border
        />
        <WeatherItem
          type="droplet"
          category="Umidade do ar"
          value={`${Math.round(weatherData.list[0].main.humidity)}%`}
        />
      </View>

      <FlatList
        data={weatherData.list}
        renderItem={({item, index}) => (
          <WeatherDay
            day={dayjs(item.dt * 1000)
              .locale('pt-br')
              .format('ddd ha')
              .toUpperCase()}
            maxTemp={Math.round(item.main.temp_max)}
            minTemp={Math.round(item.main.temp_min)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingVertical: 10,
    gap: 40,
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
