exports.handler = async (event) => {
  const { cityname, type } = event.queryStringParameters;
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!cityname && !event.queryStringParameters.latitude) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required parameters" }),
    };
  }

  try {
    let url;
    
    if (type === "forward") {
      // Forward geocoding: city name to coordinates
      url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${API_KEY}`;
    } else if (type === "reverse") {
      // Reverse geocoding: coordinates to city name
      const { latitude, longitude } = event.queryStringParameters;
      url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch geocoding data" }),
    };
  }
};