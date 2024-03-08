# silabas-js

**silabas-js** é um módulo NPM fornecendo um algoritmo de separação de sílabas
para palavras em português brasileiro.

Esse módulo foi inicialmente feito rapidamente para um projeto que não exige um
algoritmo perfeito, portanto o **silabas-js** não saberá lidar com 100% dos
casos. Sinta-se livre para contribuir ou criar uma issue caso encontre um erro.

## Como isso funciona?

O algoritmo funciona em várias etapas. Cada etapa é recursiva e tenta dividir a
palavra em duas baseado na primeira ocorrência de uma regra. Em resumo:

- A etapa atual começa a executar
- A etapa tenta dividir a palavra em duas utilizando uma regra
  - Se a palavra for dividida em duas:
    - A primeira subpalavra é enviada à próxima etapa
    - A segunda subpalavra é enviada recursivamente à mesma etapa
    - Os resultados das duas chamadas anteriores são planificados em um array e
      retornados pela etapa atual
  - Se a palavra não for dividida:
    - A palavra é enviada à próxima etapa
    - O resultado da próxima etapa é retornado pela etapa atual

A etapa final sendo a função identidade.
