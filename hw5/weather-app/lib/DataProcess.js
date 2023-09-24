const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCoordinates = async (cityName) => {
  const req = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=67a762e7be38765a887247105167a8c4`
  );
  const response = await req.json();
  const data = response[0];
  return {
    lat: data?.lat,
    lon: data?.lon,
  };
};

export const fetchWeather = async (lat, lon) => {
  if (lat !== undefined && lon !== undefined) {
    const req = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=67a762e7be38765a887247105167a8c4&units=metric`
    );
    const response = await req.json();
    return response;
  }
  return {};
};

export async function getWeather(city) {
  const cityName = city;
  const coordinates = await getCoordinates(cityName);
  const weather = await fetchWeather(coordinates.lat, coordinates.lon);

  if (Object.keys(weather).length === 0) {
    return { status: "wrong city" };
  }

  const cityWeather = {
    temp: Math.round(weather.main.temp),
    name: weather.name,
    main: weather.weather[0].main,
    id: String(weather.weather[0].id)[0],
    date: `${new Date().getDate()} ${monthNames[new Date().getMonth()]}`,
  };

  return cityWeather;
}
