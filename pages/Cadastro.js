import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { addLocal, getLocais } from '../lib/sqlite/queries';

export function Cadastro() {
	const [nome, setNome] = useState('');
	const [data, setData] = useState('');
	const [descricao, setDescricao] = useState('');
	const [despesa, setDespesa] = useState('');
	const [url, setUrl] = useState('');
	const [favorito, setFavorito] = useState(false);

	const onToggleSwitch = () => {
		setFavorito((previousState) => !previousState);
	};

	const limparCampos = () => {
		setNome('');
		setData('');
		setDescricao('');
		setDespesa('');
		setUrl('');
		setFavorito(false);
	};

	const handleAddLocal = () => {
		if (!nome) {
			alert('Entre com o local');
			return false;
		}

		addLocal(nome, data, descricao, despesa, url, favorito, () => {
			limparCampos();
		});
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
			<Switch onValueChange={onToggleSwitch} value={favorito} />

			<TouchableOpacity
				onPress={handleAddLocal}
				className='bg-blue-500 py-4 items-center rounded-xl'
			>
				<Text className='font-bold text-slate-50 uppercase text-base'>
					Cadastrar
				</Text>
			</TouchableOpacity>
		</View>
	);
}
