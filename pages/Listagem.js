import { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { getLocais } from '../lib/sqlite/queries';
import { Local } from '../components/Local';
import { useFocusEffect } from '@react-navigation/native';

export function Listagem() {
	const [locais, setLocais] = useState([]);

	const handleUpdateLocais = useCallback(() => {
		console.log('handleupdatelocais');
		getLocais(setLocais);
	}, []);

	useFocusEffect(handleUpdateLocais);

	console.log(locais);

	return (
		<FlatList
			data={locais}
			renderItem={({ item }) => (
				<Local
					item={item}
					onDeleteLocal={() => {
						console.log('ondeletelocal');
						getLocais(setLocais);
					}}
				/>
			)}
			keyExtractor={(loc) => loc.id}
		/>
	);
}
