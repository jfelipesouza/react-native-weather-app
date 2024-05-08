type WeatherList = {
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

type WeatherCity = {
  name: string;
};

export type Weather = {
  list: WeatherList[];
  city: WeatherCity;
};
