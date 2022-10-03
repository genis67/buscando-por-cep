// IMPORTS
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// COMPONENTE
export default function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  const buscarCep = () => {

    if (cep.replace("-", "").length != 8) {
      setErro("CEP inválido")
      return
    }

    setCarregando(true)
    fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json`)
      .then(resposta => resposta.json())
      .then(obj => {
        if(obj.erro){
          setErro("CEP não encontrado!")
          return
        }

        setEndereco(obj)
        setErro("")
      })
      .catch(() => {
        setErro("Ocorreu um erro ao buscar o endereço!")
      })
      .finally(() => {
        setCarregando(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Buscando endereço por CEP</Text>
        <Text style={styles.texto}>Digite o CEP</Text>
        <TextInput placeholder="Digite aqui" style={styles.input} value={cep} onChangeText={input => setCep(input)} />

        <Button color="#034c3c" title="Buscar endereço" onPress={buscarCep} />

        {carregando && <Text style={styles.texto}>Carregando...</Text>}

        {erro != "" && <Text style={styles.erro}>{erro}</Text>}

        {endereco != null && !carregando && erro == "" && (
          <View style={styles.enderecoCard}>
            <Text style={styles.texto}>CEP -> {endereco.cep}</Text>
            <Text style={styles.texto}>Logradouro -> {endereco.logradouro}</Text>
            <Text style={styles.texto}>Complemento -> {endereco.complemento}</Text>
            <Text style={styles.texto}>Bairro -> {endereco.bairro}</Text>
            <Text style={styles.texto}>Localidade -> {endereco.localidade}</Text>
            <Text style={styles.texto}>UF -> {endereco.uf}</Text>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  enderecoCard: { padding: 15, backgroundColor: '#f2f4f3' },
  card: { backgroundColor: 'white', padding: 15 },
  input: { marginVertical: 20, borderColor: 'gray', borderWidth: 1 },
  titulo: {
    fontSize: 25,
    color: '#034c3c',
    marginBottom: 20
  },
  texto: {
    fontSize: 18,
    color: '#034c3c'
  },
  erro: {
    marginVertical:12,
    fontSize: 18,
    color: '#93032e'
  },
  container: {
    flex: 1,
    backgroundColor: '#c69f89',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
