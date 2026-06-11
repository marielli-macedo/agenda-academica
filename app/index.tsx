import React, { useState } from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type Atividade = {
  id: string;
  disciplina: string;
  atividade: string;
  data: string;
  concluida: boolean;
};

export default function Index() {

  const [disciplina, setDisciplina] = useState('');
  const [atividade, setAtividade] = useState('');
  const [data, setData] = useState('');

  const [lista, setLista] = useState<Atividade[]>([]);

  function adicionarAtividade() {

    if (
  disciplina.trim() === '' ||
  atividade.trim() === '' ||
  data.trim() === ''
){
      return;
    }

    const novaAtividade = {
  id: Date.now().toString(),
  disciplina,
  atividade,
  data,
  concluida: false
};

    setLista([...lista, novaAtividade]);

    setDisciplina('');
    setAtividade('');
    setData('');
  }

function concluirAtividade(id: string) {

  const novaLista = lista.map(item => {

    if (item.id === id) {

      return {
        ...item,
        concluida: !item.concluida
      };

    }

    return item;

  });

  setLista(novaLista);
}

  function excluirAtividade(id: string) {

    const novaLista = lista.filter(
      item => item.id !== id
    );

    setLista(novaLista);
  }

  return (
    

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Agenda Acadêmica
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Disciplina"
        value={disciplina}
        onChangeText={setDisciplina}
      />

      <TextInput
        style={styles.input}
        placeholder="Atividade"
        value={atividade}
        onChangeText={setAtividade}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (dd/mm/aaaa)"
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarAtividade}
      >

        <Text style={styles.textoBotao}>
          Adicionar
        </Text>

      </TouchableOpacity>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}

        renderItem={({ item }: { item: Atividade }) => (

          <View style={styles.card}>

            <Text style={styles.disciplina}>
              📚 {item.disciplina}
            </Text>

            <Text
  style={[
    styles.texto,

    item.concluida && {
      textDecorationLine: 'line-through',
      color: '#22C55E'
    }
  ]}
>
  📝 {item.atividade}
</Text>

            <Text style={styles.texto}>
              📅 {item.data}
            </Text>

            <TouchableOpacity
  onPress={() => concluirAtividade(item.id)}
>

  <Text style={styles.concluir}>
    {item.concluida
      ? '✅ Concluída!'
      : '⬜ Marcar como concluída.'}
  </Text>

</TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                excluirAtividade(item.id)
              }
            >

              <Text style={styles.excluir}>
                🗑 Excluir
              </Text>

            </TouchableOpacity>

          </View>

        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#38BDF8',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#38BDF8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  disciplina: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  concluir: {
  color: '#22C55E',
  fontWeight: 'bold',
  marginTop: 10,
},

  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },

  excluir: {
    color: '#EF4444',
    fontWeight: 'bold',
    marginTop: 10,
  }

});