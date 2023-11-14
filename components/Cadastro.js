import React, { useEffect, useState } from 'react';
import {
	View,
	ScrollView,
	Text,
	TextInput,
	Switch,
	TouchableOpacity,
} from 'react-native';
import { openDatabase } from 'expo-sqlite';
import { FlatList } from 'react-native';

export default function Cadastro() {
	const [nome, setNome] = useState('');
	const [data, setData] = useState('');
	const [descricao, setDescricao] = useState('');
	const [despesa, setDespesa] = useState('');
	const [url, setUrl] = useState('');
	const [favorito, setFavorito] = useState(false);
	const [locais, setLocais] = useState([]);

	const db = openDatabase({
		name: 'rn_sqlite',
	});

	const createTables = () => {
		db.transaction((txn) => {
			txn.executeSql(
				`CREATE TABLE IF NOT EXISTS local (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(50), data DATE, descricao TEXT, despesa REAL, url TEXT, favorito BOOLEAN)`,
				[],
				(sqlTxn, res) => {
					console.log('Tabela criada com sucesso');
				},
				(error) => {
					console.log('Erro ao criar a tabela ' + error.message);
				}
			);
		});
	};

	const addLocal = () => {
		if (!nome) {
			alert('Entre com o local');
			return false;
		}

		db.transaction((txn) => {
			txn.executeSql(
				`INSERT INTO local (nome, data, descricao, despesa, url, favorito) VALUES (?, ?, ?, ?, ?, ?)`,
				[nome, data, descricao, despesa, url, favorito],
				(sqlTxn, res) => {
					console.log(`${nome} adicionado com sucesso`);
					getLocais();
					limparCampos();
				},
				(error) => {
					console.log(
						`Nome: ${nome} | Data: ${data} | Descrição: ${descricao} | Despesa: ${despesa} | Url: ${url} | Favorito: ${favorito}`
					);
					console.log('Erro na inserção do local ' + error.message);
				}
			);
		});
	};

	const getLocais = () => {
		db.transaction((txn) => {
			txn.executeSql(
				`SELECT * FROM local ORDER BY id DESC`,
				[],
				(sqlTxn, res) => {
					console.log('Locais carregados com sucesso');
					let len = res.rows.length;

					if (len > 0) {
						let results = [];
						for (let i = 0; i < len; i++) {
							let item = res.rows.item(i);
							results.push({
								id: item.id,
								nome: item.nome,
								data: item.data,
								descricao: item.descricao,
								despesa: item.despesa,
								url: item.url,
								favorito: item.favorito,
							});
						}

						setLocais(results);
					}
				},
				(error) => {
					console.log('Erro ao buscar os locais ' + error.message);
				}
			);
		});
	};

	const renderLocais = ({ item }) => {
		return (
			<View className='flex-1'>
				<Text>{item.nome}</Text>
				<Text>{item.data}</Text>
				<Text>{item.descricao}</Text>
				<Text>{item.despesa}</Text>
				<Text>{item.url}</Text>
				<Text>{item.favorito}</Text>
			</View>
		);
	};

	useEffect(async () => {
		await createTables();
		await getLocais();
	}, []);

	const onToggleSwitch = () => {
		setFavorito((previousState) => !previousState);
	};

	const limparCampos = () => {
		setNome('');
		setData('');
		setDescricao('');
		setDespesa(0);
		setUrl('');
		setFavorito(false);
	};

	return (
		<ScrollView className='flex-1 p-8'>
			<Text className='font-bold text-lg text-slate-800'>Local</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800 p-4 mt-1 mb-4'
				value={nome}
				onChangeText={setNome}
				placeholder='nome do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Visita</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800 p-4 mt-1 mb-4'
				value={data}
				onChangeText={setData}
				placeholder='data da visita'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Descrição</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800 p-4 mt-1 mb-4'
				value={descricao}
				onChangeText={setDescricao}
				placeholder='descrição da experiência'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Despesa</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800 p-4 mt-1 mb-4'
				value={despesa}
				onChangeText={setDespesa}
				placeholder='valor gasto'
				keyboardType='numeric'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Foto</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800 p-4 mt-1 mb-4'
				value={url}
				onChangeText={setUrl}
				placeholder='foto do local'
				keyboardType='default'
				returnKeyType='next'
			/>{' '}
			<Text className='font-bold text-lg text-slate-800'>Favorito</Text>
			<View className='flex-1 items-start'>
				<Switch onValueChange={onToggleSwitch} value={favorito} />
			</View>
			<TouchableOpacity
				onPress={addLocal}
				className='bg-blue-500 py-4 items-center rounded-xl mt-12'
			>
				<Text className='font-bold text-slate-50 uppercase text-base'>
					Cadastrar
				</Text>
			</TouchableOpacity>
			<FlatList
				className='flex-1'
				data={locais}
				renderItem={renderLocais}
				key={(cat) => cat.id}
			/>
		</ScrollView>
	);
}
