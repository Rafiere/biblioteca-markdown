import chalk from 'chalk';

const fs = require('fs');

// async function funcaoAsync(){
//     const resultado = await obterArquivo('assets/texto1.md');
//     console.log(typeof(resultado));
// }
// console.log(funcaoAsync()); //resolver problema de retorno assíncrono.

let arquivo: string = '';

obterArquivo('assets/texto1.md').then((resposta) => {
   let resultados: object[] = extrairLinks(resposta);
   console.log(resultados);
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



// function obterArquivo(caminhoDoArquivo: string){
//     const encoding: string = 'UTF-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro){
//             tratarErro(erro);
//         }
//         console.log(chalk.green(texto))
//     });
// }
