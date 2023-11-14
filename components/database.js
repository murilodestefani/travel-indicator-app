// database.js
import { openDatabase } from 'expo-sqlite';

const db = openDatabase({
	name: 'rn_sqlite',
});

export const createTables = () => {
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
			`INSERT INTO local (nome, data, descricao, despesa, url, favorito) VALUES (?, ?, ?, ?, ?, ?)`,
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

					callback(results);
				}
			},
			(error) => {
				console.log('Erro ao buscar os locais ' + error.message);
			}
		);
	});
};
