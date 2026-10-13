# Meu Perfil Dev

Aplicativo mobile de perfil pessoal desenvolvido com **React Native** e **Expo**, com foco em apresentar informações profissionais de forma simples, moderna e visualmente agradável.

---

## Visão geral

Este projeto funciona como uma landing page mobile para um perfil profissional, reunindo:

- Foto de perfil
- Nome, cargo e localização
- Indicador de disponibilidade para projetos
- Descrição pessoal ("Sobre mim")
- Lista de habilidades técnicas
- Contador de curtidas
- Botão de contato por e-mail

A interface foi pensada para ser leve, responsiva e fácil de adaptar para outros perfis profissionais, bastando alterar os dados do objeto `PROFILE` no `App.js`.

---

## Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- JavaScript
- React Native `StyleSheet`
- `expo-status-bar`

---

## Estrutura do projeto

```
meu-perfil-dev/
├── App.js                 # Tela principal da aplicação
├── components/
│   └── Header.js          # Componente de cabeçalho com título dinâmico
├── assets/                # Ícones e imagens do app
├── app.json               # Configuração do Expo
├── index.js               # Ponto de entrada da aplicação
├── package.json           # Dependências e scripts do projeto
├── README.md              # Documentação do projeto
└── LICENSE                # Licença do projeto
```

---

## Funcionalidades

- Exibição de avatar com imagem externa, com descrição para acessibilidade
- Nome e profissão em destaque
- Badge de disponibilidade para projetos
- Seção "Sobre mim" com texto de apresentação
- Lista de habilidades em formato de chips com quebra automática de linha
- Botão para incrementar curtidas
- Botão "Entre em contato" que abre o aplicativo de e-mail (com alerta de fallback caso não haja cliente configurado)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm ou yarn
- Expo CLI (opcional, pois o projeto usa `npx expo`)
- Android Studio com emulador, ou o aplicativo **Expo Go** no celular

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/meu-perfil-dev.git
cd meu-perfil-dev
```

2. Instale as dependências:

```bash
npm install
```

---

## Como executar

Inicie o ambiente de desenvolvimento com:

```bash
npm start
```

Em seguida, você pode:

- Abrir no emulador Android:

```bash
npm run android
```

- Abrir no simulador iOS (somente macOS):

```bash
npm run ios
```

- Rodar no navegador:

```bash
npm run web
```

Ou escanear o QR Code exibido no terminal com o aplicativo **Expo Go**.

---

## Scripts disponíveis

No arquivo `package.json`, os scripts principais são:

```bash
npm start
npm run android
npm run ios
npm run web
```

---

## Personalização

Para usar o projeto com o seu perfil, edite o objeto `PROFILE` e a lista `SKILLS` no arquivo `App.js`:

```javascript
const PROFILE = {
  name: "Seu Nome",
  role: "Seu Cargo",
  city: "Sua Cidade - UF",
  email: "seu@email.com",
  available: true,
  avatarUrl: "https://link-da-sua-foto.jpg",
  bio: "Sua descrição pessoal.",
};

const SKILLS = ["Habilidade 1", "Habilidade 2"];
```

---

## Observações

Este projeto foi desenvolvido como exemplo inicial de um perfil profissional em React Native e serve como base para evoluções futuras, como:

- Adicionar redes sociais (GitHub, LinkedIn)
- Incluir projetos e portfólio
- Criar navegação entre telas
- Integrar com backend ou CMS
- Separar componentes em pastas próprias (`ProfileHeader`, `SkillChip`, `Card`)

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.