import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { getLocaisFavoritos } from '../lib/sqlite/queries';
import { Local } from '../components/Local';
import { useFocusEffect } from '@react-navigation/native';

export function Favoritos() {
	const [locais, setLocais] = useState([]);

	const handleUpdateLocaisFavoritos = () => {
		getLocaisFavoritos(setLocais);
	};

	useFocusEffect(handleUpdateLocaisFavoritos);

	return (
		<FlatList
			data={locais}
			renderItem={({ item }) => (
				<Local item={item} onDeleteLocal={handleUpdateLocaisFavoritos} />
			)}
			key={(loc) => loc.id}
		/>
	);
}
