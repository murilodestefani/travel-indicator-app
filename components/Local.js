import { Pressable, Text, View } from 'react-native';
import { deleteLocal } from '../lib/sqlite/queries';

export function Local({ item, onDeleteLocal }) {
	return (
		<View className='flex-1'>
			<Text>{item.nome}</Text>
			<Text>{item.data}</Text>
			<Text>{item.descricao}</Text>
			<Text>{item.despesa}</Text>
			<Text>{item.url}</Text>
			<Text>{item.favorito}</Text>
			<Pressable onPress={() => deleteLocal(item.id, onDeleteLocal)}>
				<Text>Deletar</Text>
			</Pressable>
		</View>
	);
}
