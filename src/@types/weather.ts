export type WeatherList = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      main: string;
      description: string;
    },
  ];

  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  pop: number;
};

export type WeatherCity = {
  name: string;
};

export type Weather = {
  list: WeatherList[];
  city: WeatherCity;
  message: any;
};

export type WeatherDayProps = {
  day: string;
  minTemp: number;
  maxTemp: number;
};

export type WeatherTypes = 'thermometer' | 'droplet' | 'wind' | 'rain';
export type WeatherItemProps = {
  type?: WeatherTypes;
  border?: boolean;
  category: string;
  value: string;
};
