import React, { useState } from 'react';
import { View, Text, TextInput, Switch } from 'react-native';

export default function Cadastro() {
	const [nome, setNome] = useState('');
	const [data, setData] = useState('');
	const [descricao, setDescricao] = useState('');
	const [despesa, setDespesa] = useState('');
	const [url, setUrl] = useState('');
	const [favorito, setFavorito] = useState(false);

	const onToggleSwitch = () => {
		setFavorito((previousState) => !previousState);
	};

	return (
		<View className='flex-1'>
			<Text>Local</Text>
			<TextInput
				value={nome}
				placeholder='nome do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text>Visita</Text>
			<TextInput
				value={data}
				placeholder='data da visita'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text>Descrição</Text>
			<TextInput
				value={descricao}
				placeholder='descrição da experiência'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text>Despesa</Text>
			<TextInput
				value={despesa}
				placeholder='valor gasto'
				keyboardType='numeric'
				returnKeyType='next'
			/>
			<Text>Foto</Text>
			<TextInput
				value={url}
				placeholder='foto do local'
				keyboardType='default'
				returnKeyType='next'
			/>
			<Text>Favorito</Text>

			<Switch onValueChange={onToggleSwitch} value={favorito} />
		</View>
	);
}
