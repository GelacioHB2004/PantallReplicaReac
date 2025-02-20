import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const calculadorapropinas = () => {
  const [amount, setAmount] = useState('');
  const [customTip, setCustomTip] = useState('');
  const [selectedTip, setSelectedTip] = useState(null);
  const [history, setHistory] = useState([]);

  const tipOptions = [10, 15, 20];

  const calculateTip = (percentage) => {
    const billAmount = parseFloat(amount);
    if (isNaN(billAmount) || billAmount <= 0) return;
    const tipPercent = percentage ? percentage : parseFloat(customTip);
    if (isNaN(tipPercent) || tipPercent <= 0) return;
    
    const tipAmount = (billAmount * tipPercent) / 100;
    const totalAmount = billAmount + tipAmount;
    
    const newEntry = {
      key: Math.random().toString(),
      amount: billAmount.toFixed(2),
      tipPercent,
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Monto de consumo'
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.subtitle}>Selecciona un porcentaje de propina:</Text>
      <View style={styles.buttonContainer}>
        {tipOptions.map((tip) => (
          <Button key={tip} title={`${tip}%`} onPress={() => { setSelectedTip(tip); calculateTip(tip); }} />
        ))}
      </View>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Propina personalizada %'
        value={customTip}
        onChangeText={setCustomTip}
      />
      <Button title='Calcular' onPress={() => calculateTip(null)} />
      <Text style={styles.subtitle}>Historial de cálculos:</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            Consumo: ${item.amount} | Propina: {item.tipPercent}% (${item.tipAmount}) | Total: ${item.totalAmount}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginVertical: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  historyItem: { fontSize: 16, padding: 5, borderBottomWidth: 1 },
});

export default calculadorapropinas;