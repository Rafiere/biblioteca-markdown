"use strict";
const fetchLib = require('node-fetch');
module.exports = validaUrls;
// module.exports = verificaStatus;
// async function verificaStatus(arrayLinks: string[]): Promise<string[]> {
//     return await Promise.all(arrayLinks.map(async link => {
//         return await fetchLib(link);
//     }));
// }
function validaUrls(arrayLinks) {
    let stringComTodasAsUrls = arrayLinks.map(objeto => Object.values(objeto))
        .join(); //Estamos obtendo o valor de cada chave-valor e juntando as URLs em um array de URLs.
    return stringComTodasAsUrls.split(',');
}
