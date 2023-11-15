import { db } from '.';

export const createTables = () => {
	db.transaction((txn) => {
		txn.executeSql(
			`CREATE TABLE IF NOT EXISTS locais (id INTEGER PRIMARY KEY AUTOINCREMENT, nome VARCHAR(50), data TEXT, descricao TEXT, despesa FLOAT, url TEXT, favorito BOOLEAN)`,
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

export const addLocal = (
	nome,
	data,
	descricao,
	despesa,
	url,
	favorito,
	callback
) => {
	db.transaction((txn) => {
		txn.executeSql(
			`INSERT INTO locais (nome, data, descricao, despesa, url, favorito) VALUES (?, ?, ?, ?, ?, ?)`,
			[nome, data, descricao, despesa, url, favorito],
			(sqlTxn, res) => {
				console.log(`${nome} adicionado com sucesso`);
				callback();
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

export const getLocais = (callback) => {
	db.transaction((txn) => {
		txn.executeSql(
			`SELECT * FROM locais ORDER BY id DESC`,
			[],
			(_, { rows: { _array } }) => {
				callback(_array);
			}
		);
	});
};

export const getLocaisFavoritos = (callback) => {
	db.transaction((txn) => {
		txn.executeSql(
			`SELECT * FROM locais WHERE favorito = true ORDER BY id DESC`,
			[],
			(_, { rows: { _array } }) => callback(_array)
		);
	});
};

export const deleteLocal = (id, callback) => {
	db.transaction((txn) => {
		txn.executeSql(`DELETE FROM locais WHERE id = ?`, [id], () => callback());
	});
};
