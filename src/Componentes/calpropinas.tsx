import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface HistoryItem {
  key: string;
  amount: string;
  tipPercent: number;
  tipAmount: string;
  totalAmount: string;
}

const calpropinas: React.FC = () => {
  const [cantidad, setAmount] = useState<string>('');
  const [tipoporcentaje, setCustomTip] = useState<string>('');
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [historial, setHistory] = useState<HistoryItem[]>([]);

  const Opcion: number[] = [10, 15, 20];

  const calcularporcen = (percentage: number | null) => {
    const Monto = parseFloat(cantidad);
    if (isNaN(Monto) || Monto <= 0) return;

    const tipPercent = percentage !== null ? percentage : parseFloat(tipoporcentaje);
    if (isNaN(tipPercent) || tipPercent <= 0) return;

    const tipAmount = (Monto * tipPercent) / 100;
    const totalMonto = Monto + tipAmount;

    const newEntry: HistoryItem = {
      key: Math.random().toString(),
      amount: Monto.toFixed(2),
      tipPercent,
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalMonto.toFixed(2),
    };

    setHistory([newEntry, ...historial]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Calculadora de Propinas 💵</Text>
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Monto de consumo"
        value={cantidad}
        onChangeText={setAmount}
      />

      <Text style={styles.subtitle}>Selecciona un porcentaje de propina:</Text>
      <View style={styles.buttonContainer}>
        {Opcion.map((tip) => (
          <TouchableOpacity key={tip} style={styles.tipButton} onPress={() => { setSelectedTip(tip); calcularporcen(tip); }}>
            <Text style={styles.buttonText}>{tip}%</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Propina personalizada %"
        value={tipoporcentaje}
        onChangeText={setCustomTip}
      />

      <TouchableOpacity style={styles.calculateButton} onPress={() => calcularporcen(null)}>
        <Text style={styles.calculateButtonText}>Calcular</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Historial de cálculos:</Text>
      <FlatList
        data={historial}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>
              💳 Consumo: <Text style={styles.bold}>${item.amount}</Text>
            </Text>
            <Text style={styles.historyText}>
              💸 Propina: <Text style={styles.bold}>{item.tipPercent}% (${item.tipAmount})</Text>
            </Text>
            <Text style={styles.historyText}>
              ✅ Total a pagar: <Text style={styles.bold}>${item.totalAmount}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#444',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tipButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default calpropinas;

