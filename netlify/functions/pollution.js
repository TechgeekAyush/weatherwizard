exports.handler = async (event) => {
  const { latitude, longitude } = event.queryStringParameters;
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!latitude || !longitude) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing latitude or longitude" }),
    };
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch air pollution data" }),
    };
  }
};