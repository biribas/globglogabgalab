// Bibliotecas para ler arquivos
const fs = require('fs');
const path = require('path');

// Detecta todos os arquivos .txt do diretório exceto resultados.txt
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.txt') && file != 'resultados.txt').map(file => path.join(__dirname, file));

// Exibe o array de dicionários no terminal
const exibir = dicts => console.log(dicts);

// Escreve o array de dicionários em resultados.txt
const escrever = dicts => {
    const dados = JSON.stringify(dicts).replace(/\,(?=\{)/gm, '\n')
                                       .replace(/(\[\{)/gm, '[\n{')
                                       .replace(/(\}\])/gm, '}\n]')
                                       .replace(/\n(?=\{)/gm, '\n  ');
    fs.writeFileSync(__dirname + '/resultados.txt', dados);
    console.log('Arquivo resultados.txt criado!!!');
}

// Ordena o array de dicionários em ordem decrescente de frequência
const ordenar = dicts => dicts.sort((a, b) => b.qtde - a.qtde);

// Calcula a frequência (em %) de aparição de cada palavra
const calcularFrequencia = dicts => {
    const numPalavras = dicts.reduce((acc, dict) => acc + dict.qtde, 0);
    return dicts.map(dict => (dict["%"] = (dict.qtde * 100 / numPalavras).toFixed(3), dict));
};

// Calcula a quantidade de vezes que cada palavra aparece no(s) texto(s)
const quantificar = palavras => palavras.reduce((acc, palavra) => {
    const p = palavra.toLowerCase();
    const i = acc.findIndex((dict => dict.palavra == p));
    if(i != -1) {
        return acc[i].qtde++, acc;
    } 
    return acc.push({"palavra": p, "qtde": 1}), acc;
}, []);

// Concatena os arrays de palavras de cada texto em um único array
const concatenar = textos => [].concat.apply([], textos);

// Separa as palavras do texto pelos espaços em branco
const separar = textos => textos.map(texto => texto.split(/\ +/));

// Substitui caracteres epeciais do texto por espaços
const filtro = textos => textos.map(texto => texto.replace(/[^a-zà-ÿ]/gim, ' '));

// Lê os textos existentes nos arquivos e os salva em um array
const lerArquivos = caminhos => caminhos.map(caminho => fs.readFileSync(caminho).toString());

// Composição da funções usadas no programa 
const composicao = (...functions) => files => functions.reduce((acc, f) => f(acc), files);

// Função que gera o resultado
const gerarResultado = composicao(
    lerArquivos,
    filtro,
    separar,
    concatenar,
    quantificar,
    calcularFrequencia,
    ordenar,
    escrever
);

gerarResultado(files);