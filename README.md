# 📼 Blockbuster - Projeto PW

## 📌 Descrição

O **Blockbuster** é uma aplicação web inspirada nos clássicos videoclubes dos anos 80, desenvolvida no âmbito da unidade curricular de **Programação para a Web** do CTESP em Tecnologias Informáticas.

O sistema permite a gestão e consulta de um catálogo de filmes em VHS. Os utilizadores podem verificar a disponibilidade de cada título, consultar informações detalhadas e efetuar alugueres ou reservas. O projeto assenta numa arquitetura cliente-servidor, consumindo dados dinamicamente de uma API REST, e integra atualmente uma API externa de filmes para enriquecer o catálogo.

---

## 👨‍💻 Autores

- André Silva
- Diogo Silva

---

## ⚙️ Funcionalidades

- 📼 Catálogo de filmes VHS com capas, sinopse, género e classificação etária.
- 🎬 **Integração com a API do TMDB (themoviedb.org)** para carregamento dinâmico de dados reais de filmes, capas e descrições.
- 🔍 Sistema de filtragem e ordenação de filmes.
- 🛒 Funcionalidade de aluguer e reserva de cópias disponíveis.
- 🌐 Comunicação assíncrona (AJAX) para obtenção dos dados da API.
- 🗄️ Base de dados relacional para persistência de informação (em desenvolvimento).
- 🏢 Secção de apresentação da equipa estilo "start-up".

---

## 🏗️ Arquitetura

O projeto está organizado numa estrutura baseada no padrão MVC (Model-View-Controller):

```text
pw_project/
 ├── config/        # Ficheiros de configuração (ex: ligação à base de dados MySQL)
 ├── models/        # Lógica de negócio e acesso/manipulação de dados na base de dados
 ├── routes/        # Controllers e definição dos endpoints da API REST
 ├── www/           # Views (Front-end): Ficheiros HTML, CSS, JavaScript e Imagens
 ├── app.js         # Configuração e inicialização do servidor Express.js
 └── package.json   # Configuração do projeto Node.js e dependências
```

---

## 📂 Tecnologias utilizadas

- 🌐 **HTML5, CSS3, JavaScript** (Front-end desenvolvido sem frameworks)
- 🎬 **TMDB API** (themoviedb.org) (Obtenção de metadados e capas de filmes)
- 🟢 **Node.js & Express.js** (Back-end / API REST - em desenvolvimento)
- 🐬 **MySQL** (Base de Dados Relacional - em desenvolvimento)
- 🔄 **AJAX / JSON** (Comunicação de dados e consumo de APIs)

---

## ▶️ Como executar

*(Nota: Como o back-end ainda está em desenvolvimento, atualmente basta abrir o ficheiro HTML principal no navegador ou usar um Live Server).*

### 1. Instalar as dependências do projeto (Futuro)

```bash
npm install
```

### 2. Executar o servidor web (Futuro)

```bash
node app.js
```

### 3. Aceder à aplicação
Abrir o navegador de internet no endereço: `http://localhost:<porto-configurado>`

---

## 🚧 Estado do Projeto

🟡 Em desenvolvimento

- [x] Definição da UI/UX estática (HTML/CSS)
- [x] Integração com API externa (TMDB) via JavaScript (AJAX)
- [ ] Modelação e criação da Base de Dados (MySQL)
- [ ] Desenvolvimento da API REST própria (Node.js/Express)
- [ ] Integração final do Front-end com o Back-end próprio

---

## 💡 Objetivos

- Aplicar conceitos fundamentais de Programação Web e Bases de Dados.
- Desenvolver um Web Service RESTful.
- Implementar interfaces interativas assíncronas com carregamento via DOM.
- Trabalhar com o padrão de arquitetura MVC.

---

## 📜 Licença

Projeto desenvolvido para fins académicos.