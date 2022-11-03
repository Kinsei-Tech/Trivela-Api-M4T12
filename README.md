# Documentação do Projeto Final - Trivela-Api

![alt Pastas](./Doc/img/imagem.PNG)

## Idioma do codigo / FeedBack das requisições

- Inglês / Português

## Linguagens utilizada

- JavaScript/TypeScript

## Bibliotecas em produção (dependencies)

    - express: ^4.18.1
    - express-async-errors: ^3.1.1
    - pg: ^8.7.3
    - reflect-metadata: ^0.1.13
    - typeorm: ^0.3.6
    - class-transformer: ^0.5.1
    - uuid: ^9.0.0
    - jsonwebtoken: ^8.5.1
    - bcryptjs: ^5.1.0
    - cross-env: ^7.0.3
    - dotenv: ^16.0.1
    - yup: ^0.32.11

## Bibliotecas de desenvolvimento (devDependencies)

    - @types/bcrypt: ^5.0.0,
    - @types/express: ^4.17.13,
    - @types/jest: ^28.1.4,
    - @types/jsonwebtoken: ^8.5.9,
    - @types/supertest: ^2.0.12,
    - @types/uuid: ^8.3.4,
    - jest: ^28.1.2,
    - sqlite3: ^5.0.8,
    - supertest: ^6.2.4,
    - ts-jest: ^28.0.5,
    - ts-node-dev: ^2.0.0,
    - typescript: ^4.7.4

## Conventional Branchs/Commits

### Branchs

##### Master:

    Branch padrão do repositório, só aceitará pull request da branch
    Develop ou de uma branch hotFix

##### Develop:

    Branch de desenvolvimento, todas as branchs de feature serão criadas apartir desta.

##### Feature:

    Branch usada para desenvolver uma nova funcionalidade. Essa
    branch só existem enquanto a funcionalidade está sendo
    desenvolvida, mas será excluida quando o merge for realizado
    para branch develop

##### HotFix:

    Branch para correções emergenciais da branch Master caso esta já
    esteja em produção nesse caso a branch Develop também deve ser
    atualizada, ou para correções emergenciais da branch Develop
    antes que está seja mergeada com a Master

#### Modelo de Branch

    tipoDaBranch_nomeDafuncionalidade (escrito em ingles com camelCase)

### Commits

    Os arquivos deverão ser adicionados individualmente para serem
    commitados evitando o uso de git add .

##### feat:

     Commits, que adicionam um novo recurso

##### fix:

     Commits, que corrige um bug

##### refactor:

    Commits, que reescrevem/reestruturam seu código, porém
    não alteram nenhum comportamento

##### perf:

    são commits de refatoração especiais, que melhoram o desempenho

##### style:

    Commits, que não afetam o significado (espaço em branco,
    formatação, ponto e vírgula ausente etc.)

##### docs:

    Commits, que afetam apenas a documentação

##### build:

    Commits, que afetam componentes de compilação como ferramenta de
    compilação, pipeline ci, dependências, versão do projeto ...

##### chore:

    Commits, Utilizado na atualização para mudanças em
    ferramentas, configurações e bibliotecas.

Atualizações que não ocasionam alteração no código de produção.

## Modelo de Organização das Pastas

![alt Pastas](./Doc/img/pastas.png)

### src

    Contém todos as pastas criadas para o projeto

### src/**tests**

    Contém os testes da aplicação

### src/@types

    Contém extensões de tipagem caso necessario

### src/controllers

    - Contém as SubPastas para cada rota
    - Cada subpasta contem as rotas separadas em arquivos proprios.
    - Cada arquivo contem seu controller responsavel
       por chamar o service de cada rota e devolver a resposta da
       requisição

### src/services

    - Contém as SubPastas para cada service
    - Cada subpasta contem os services separadas em arquivos proprios.
    - Cada arquivo contem seu service responsavel
       por acessar e manipular o database

### src/errors

    Contém o AppError da aplicação

### src/Validators

    Contém as validações como yup,resolver, schema

### src/interface

    Contém as interfaces de ts utilizadas no codigo

### src/middlewares

    Contém os middlewares de rotas divididos em arquivos proprios

### src/migrations

    Contém as migrations geradadas pelo typeOrm

### src/entities

    - Contém as SubPastas para cada entidade
    - Cada subpasta contem as entidades separadas em arquivos proprios.

### src/router

    - Contém as SubPastas para cada conjunto de rota
    - cada conjunto de rota possui seu proprio arquivo .ts

### Funções

    Devem ser variaveis
    const Nome () =>{
        return
    }

### Formatação do codigo

    Espaços devem ser evitados pois deixam um codigo pequeno, extenso e cansativo de ler

    adotar aspas simples ( '' )
