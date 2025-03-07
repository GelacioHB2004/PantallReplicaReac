import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";

const Api_Key = "e4694013dafe60f9d90eb04957f93eeb";
const lugar = "Huejutla de Reyes"; 

const getBackgroundColor = (tempMax: number) => {
  if (tempMax < 20) return "#ADD8E6"; 
  if (tempMax >= 21 && tempMax <= 30) return "#FFD700";
  return "#FF8C00"; 
};

const traducirDia = (fecha: string) => {
  const dias = {
    Sunday: "Domingo",
    Monday: "Lunes",
    Tuesday: "Martes",
    Wednesday: "Miércoles",
    Thursday: "Jueves",
    Friday: "Viernes",
    Saturday: "Sábado",
  };
  const diaIngles = new Date(fecha).toLocaleDateString("en-US", { weekday: "long" });
  return dias[diaIngles as keyof typeof dias] || diaIngles;
};

const WeatherPronostico = () => {
  const [weather, setWeather] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${lugar}&appid=${Api_Key}&units=metric&lang=es`
        );
        const data = await response.json();
        
        console.log("Respuesta de la API:", data);

        if (data.list) {
          // Filtramos para obtener solo un reporte por día (cada 24h)
          const dailyData: any[] = [];
          const fechasAgregadas = new Set();

          data.list.forEach((entry: any) => {
            const fecha = entry.dt_txt.split(" ")[0]; // Extraemos solo la fecha (YYYY-MM-DD)

            if (!fechasAgregadas.has(fecha)) {
              fechasAgregadas.add(fecha);
              dailyData.push({
                date: fecha,
                dayName: traducirDia(fecha),
                tempMax: entry.main.temp_max,
                tempMin: entry.main.temp_min,
                rainProb: entry.pop * 100, // Probabilidad de lluvia
                condition: entry.weather[0].description,
              });
            }
          });

          setWeather(dailyData.slice(0, 5)); // Solo los próximos 5 días
        } else {
          console.error("No se obtuvieron datos de pronóstico.");
        }
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      }
      setLoading(false);
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima en {lugar}</Text>

      {weather.length === 0 ? (
        <Text style={styles.error}>No hay datos disponibles</Text>
      ) : (
        <FlatList
          data={weather}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: getBackgroundColor(item.tempMax) }]}>
              <Text style={styles.day}>{item.dayName}</Text>
              <Text>{item.date}</Text>
              <Text>🌡️ Máx: {item.tempMax}°C | Mín: {item.tempMin}°C</Text>
              <Text>🌧️ Prob. lluvia: {item.rainProb.toFixed(1)}%</Text>
              <Text>🌤️ {item.condition}</Text>
            </View>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  card: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WeatherPronostico;