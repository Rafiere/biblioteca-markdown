import chalk from 'chalk';
import * as url from "url";
const validaUrls = require('./validadorDeUrls')
const verificaStatus = require('./validadorDeUrls')

const fs = require('fs');

obterArquivo('assets/texto1.md').then((resposta) => {
   let resultados: object[] = extrairLinks(resposta);
   const urls: string = validaUrls(resultados);
   console.log(urls); //Até aqui, tudo certo.
   // verificaStatus(urls).then((resp: unknown) => {
   //      console.log(resp);
   // });
});




async function obterArquivo(caminhoDoArquivo: string): Promise<string> { //O "async" diz para o TS que o resultado dessa função será obtido de forma assíncrona.
    try {
        const encoding: string = 'UTF-8';
        return await fs.promises.readFile(caminhoDoArquivo, encoding); //Primeiro todo o processamento assíncrono será realizado, para que, apenas depois disso, o resultado seja enviado para a constante.
    } catch(erro: unknown){
        if(erro instanceof Error){
            tratarErro(erro);
        }
    }
    return '';
}

function tratarErro(erro: Error) {
    throw new Error(chalk.red(erro.name + ' Um arquivo inválido foi enviado.'));
}

function extrairLinks(texto: string): object[]{
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].\S*)\)/gm;
    const arrayResultados = [];
    let temp;

    while((temp = regex.exec(texto)) !== null){
        arrayResultados.push({
            [temp[1]]: temp[2] //O "[temp[1]]" indica que esse valor será a chave do objeto.
        });
    }
    return arrayResultados;
}
