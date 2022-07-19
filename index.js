"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const validaUrls = require('./validadorDeUrls');
const verificaStatus = require('./validadorDeUrls');
const fs = require('fs');
obterArquivo('assets/texto1.md').then((resposta) => {
    let resultados = extrairLinks(resposta);
    const urls = validaUrls(resultados); //Até aqui, tudo certo.
    console.log(urls);
    // verificaStatus(urls).then((resp: unknown) => {
    //      console.log(resp);
    // });
});
async function obterArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'UTF-8';
        return await fs.promises.readFile(caminhoDoArquivo, encoding); //Primeiro todo o processamento assíncrono será realizado, para que, apenas depois disso, o resultado seja enviado para a constante.
    }
    catch (erro) {
        if (erro instanceof Error) {
            tratarErro(erro);
        }
    }
    return '';
}
function tratarErro(erro) {
    throw new Error(chalk_1.default.red(erro.name + ' Um arquivo inválido foi enviado.'));
}
function extrairLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].\S*)\)/gm;
    const arrayResultados = [];
    let temp;
    while ((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({
            [temp[1]]: temp[2] //O "[temp[1]]" indica que esse valor será a chave do objeto.
        });
    }
    return arrayResultados;
}
