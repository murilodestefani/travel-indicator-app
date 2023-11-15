import React, { useState } from 'react';
import {
	ScrollView,
	View,
	Text,
	TextInput,
	Pressable,
	Switch,
} from 'react-native';
import { addLocal } from '../lib/sqlite/queries';

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
		if (!nome || !data || !descricao || !despesa || !url) {
			alert('Falta um ou mais campos sem preenchimento.');
			return false;
		}

		addLocal(nome, data, descricao, despesa, url, favorito, () => {
			limparCampos();
		});
	};

	return (
		<ScrollView className='flex-1 p-4'>
			<Text className='font-bold text-sm text-neutral-700 mb-1'>Local</Text>
			<TextInput
				className='rounded-full bg-neutral-200 px-4 py-4 mb-4'
				value={nome}
				onChangeText={setNome}
				placeholder='nome do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-sm text-neutral-700 mb-1'>Visita</Text>
			<TextInput
				className='rounded-full bg-neutral-200 px-4 py-4 mb-4'
				value={data}
				onChangeText={setData}
				placeholder='data da visita'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-sm text-neutral-700 mb-1'>Descrição</Text>
			<TextInput
				className='rounded-full bg-neutral-200 px-4 py-4 mb-4'
				value={descricao}
				onChangeText={setDescricao}
				placeholder='descrição da experiência'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-sm text-neutral-700 mb-1'>Despesa</Text>
			<TextInput
				className='rounded-full bg-neutral-200 px-4 py-4 mb-4'
				value={despesa}
				onChangeText={setDespesa}
				placeholder='valor gasto'
				keyboardType='numeric'
				returnKeyType='next'
			/>
			<Text className='font-bold text-sm text-neutral-700 mb-1'>Foto</Text>
			<TextInput
				className='rounded-full bg-neutral-200 px-4 py-4 mb-4'
				value={url}
				onChangeText={setUrl}
				placeholder='foto do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text className='font-bold text-sm text-neutral-700 mb-4'>Favorito?</Text>
			<View className='flex-row justify-start items-center space-x-2 -mt-2 mb-8'>
				<Text className='text-slate-600'>Não</Text>
				<Switch
					onValueChange={onToggleSwitch}
					value={favorito}
					thumbColor={favorito ? '#1e40af' : '#a3a3a3'}
					trackColor={{ false: '#e5e5e5', true: '#3b82f6' }}
				/>
				<Text className='text-slate-600'>Sim</Text>
			</View>

			<Pressable
				onPress={handleAddLocal}
				className='bg-blue-500 py-4 items-center rounded-full'
			>
				<Text className='font-bold text-slate-50 uppercase text-base'>
					Cadastrar
				</Text>
			</Pressable>
		</ScrollView>
	);
}
