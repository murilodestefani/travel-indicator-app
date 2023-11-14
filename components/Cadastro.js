import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Switch,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { createTables, addLocal, getLocais } from './database';

export default function Cadastro() {
	const [nome, setNome] = useState('');
	const [data, setData] = useState('');
	const [descricao, setDescricao] = useState('');
	const [despesa, setDespesa] = useState('');
	const [url, setUrl] = useState('');
	const [favorito, setFavorito] = useState(false);
	const [locais, setLocais] = useState([]);

	useEffect(() => {
		createTables();
		getLocais();
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

	const handleCadastrar = () => {
		addLocal(nome, data, descricao, despesa, url, favorito, () => {
			getLocais((results) => setLocais(results));
			limparCampos();
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

	return (
		<View className='flex-1 p-8'>
			<Text className='font-bold text-lg text-slate-800'>Local</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800'
				value={nome}
				onChangeText={setNome}
				placeholder='nome do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Visita</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800'
				value={data}
				onChangeText={setData}
				placeholder='data da visita'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Descrição</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800'
				value={descricao}
				onChangeText={setDescricao}
				placeholder='descrição da experiência'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Despesa</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800'
				value={despesa}
				onChangeText={setDespesa}
				placeholder='valor gasto'
				keyboardType='numeric'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Foto</Text>
			<TextInput
				className='border-2 rounded-lg border-slate-800'
				value={url}
				onChangeText={setUrl}
				placeholder='foto do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-lg text-slate-800'>Favorito</Text>
			<View className='flex-1 items-start'>
				<Switch onValueChange={onToggleSwitch} value={favorito} />
			</View>
			<TouchableOpacity
				onPress={handleCadastrar}
				className='bg-blue-500 py-4 items-center rounded-xl'
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
		</View>
	);
}
