import { useCallback, useState } from 'react';
import { FlatList, Pressable, Text, View, Image } from 'react-native';
import { deleteLocal, getLocaisFavoritos } from '../lib/sqlite/queries';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function Favoritos() {
	const [locais, setLocais] = useState([]);

	const handleUpdateLocaisFavoritos = useCallback(() => {
		getLocaisFavoritos(setLocais);
	}, []);

	useFocusEffect(handleUpdateLocaisFavoritos);

	const Local = ({ item }) => (
		<View className='flex-1 flex-row space-x-2 items-center mb-4'>
			<Image
				className='basis-1/4 rounded-xl'
				source={{ uri: `https://source.unsplash.com/random/?${item.url}` }}
				style={{
					width: '100%',
					height: '100%',
					resizeMode: 'cover',
				}}
			/>
			<View className='flex-1 bg-slate-50 rounded-xl min-h-[100px] p-4 overflow-hidden justify-center'>
				<Text className='font-bold text-lg text-gray-900'>
					{item.nome}
					{item.favorito && (
						<Ionicons name='ios-heart-circle' size={18} color='#dc2626' />
					)}
				</Text>
				<View className='flex-row justify-between my-1'>
					<View className='flex-row items-center gap-1'>
						<Ionicons name='ios-calendar' size={12} color='#3b82f6' />
						<Text className='text-xs text-gray-800'>{item.data}</Text>
					</View>
					<View className='flex-row items-center gap-1'>
						<Ionicons name='ios-cash' size={12} color='#3b82f6' />
						<Text className='text-xs text-gray-800'>R$ {item.despesa}</Text>
					</View>
				</View>
				<Text className='italic text-gray-500'>{item.descricao}</Text>
			</View>
			<Pressable
				className='bg-gray-700 justify-center items-center py-2 rounded-lg self-center w-[40px]'
				onPress={() => deleteLocal(item.id, handleUpdateLocaisFavoritos)}
			>
				<Ionicons name='ios-trash' size={24} color='#f8fafc' />
			</Pressable>
		</View>
	);

	return (
		<FlatList
			className='flex-1 mt-2 px-2'
			data={locais}
			renderItem={({ item }) => <Local item={item} />}
			keyExtractor={(loc) => loc.id}
		/>
	);
}
