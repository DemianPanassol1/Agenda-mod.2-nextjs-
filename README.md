#  Agenda de contatos NextJS
(PT-BR/ENG) 🌎

(PT-BR) App criado com NextJS, foi baseado no projeto "Contact Keeper" do curso "React Front To Back" da Udemy, originalmente feito em React. Esse projeto, feito em NextJS, faz uso do server-side buid-in do Next, além do Next-Auth para autenticação e validação de usuário. Além disso, o projeto faz uso do MongoDB como banco de dados e Express-validator para validar e sanitizar dados. A estilização do aplicativo é feita com o frameword TailwindCSS.

## Começando

É necessário uma conta e um banco de dados configurado no MongoDB para o app funcionar. Salve em um arquivo .env no diretório (/app) e defina as seguintes variáveis:

```
MONGO_DB="mongodb+srv://<NomedoUsuario>:<senha>@cluster0.wpqcr.mongodb.net/<NomedobancoDeDados>?retryWrites=true&w=majority"
NEXTAUTH_URL=http://localhost:3000
```

### Instalando

Utilize o comando

```
npm install
```
e a seguir 

```
npm run build
```
e por fim

```
npm start
```

Isso irá rodar o servidor nodejs na porta 3000 com a versão otimizada para produção. Para rodar a versão de desenvolvimento, utilize:

```
npm run dev
```
--------------------------------------------

#  NextJS contact list

(ENG) App created with NextJS, it was based on the "Contact Keeper" project from Udemy's "React Front To Back" course, originally made in React. This project, made in NextJS, makes use of Next's server-side build-in, in addition to Next-Auth for user authentication and validation. Furthermore, the project makes use of MongoDB as a database and Express-validator to validate and sanitize data. The application styling is done with the TailwindCSS framework.

## Getting Started

A MongoDB account and database is required for the app to work. Save to an .env file in the (/app) directory and set the following variables:

```
MONGO_DB="mongodb+srv://<Username>:<password>@cluster0.wpqcr.mongodb.net/<DataBaseName>?retryWrites=true&w=majority"
NEXTAUTH_URL=http://localhost:3000
```
### Instaling

Use the command

```
npm install
```

then 

```
npm run build
```

and finnaly

```
npm start
```

This will run nodejs server on port 3000 with production version optimized. To run the development version, use: 

```
npm run dev
```

## Author

👤 **Demian Panassol**
