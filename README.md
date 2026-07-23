# 🚀 Nova Forge - Plataforma de Consultoria em Tecnologia

Plataforma de consultoria em tecnologia empresarial focada em transformação digital para pequenos e médios negócios locais no Brasil.

[![TypeScript](https://img.shields.io/badge/TypeScript-99.6%25-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Sobre o Projeto

**Nova Forge** é uma plataforma web completa que oferece soluções tecnológicas personalizadas para negócios locais brasileiros, com foco especial em quatro setores estratégicos:

- 🏨 **Hospitalidade** - Pousadas e hotéis
- 🏥 **Saúde** - Clínicas médicas e odontológicas  
- ✂️ **Serviços Pessoais** - Barbearias e salões
- 🔧 **Automotivo** - Oficinas mecânicas

A plataforma apresenta um site institucional moderno com showcase de serviços, depoimentos de clientes, formulários de contato e painel administrativo para gestão de solicitações.

## ✨ Funcionalidades

### Site Institucional
- 🎨 **Design moderno** com tema dark profissional
- 📱 **Totalmente responsivo** para todos os dispositivos
- ⚡ **Performance otimizada** com carregamento rápido
- 🎭 **Animações suaves** usando Framer Motion
- 📝 **Formulário de contato** com validação robusta
- 💬 **Chat ao vivo** para engajamento com clientes
- 🌟 **Seção de depoimentos** de clientes satisfeitos

### Painel Administrativo
- 🔐 **Autenticação segura** com bearer token
- 📊 **Dashboard** para visualização de solicitações
- ✉️ **Gestão de mensagens** de contato
- 📈 **Métricas** de engajamento e conversão

### Segurança e Performance
- 🛡️ **Headers de segurança** com Helmet
- 🚦 **Rate limiting** para proteção contra abuso
- 🔒 **Validação dupla** (Zod + express-validator)
- ⚡ **Caching inteligente** com React Query
- 🌐 **CORS configurado** para ambiente de produção

## 🏗️ Arquitetura

### Stack Tecnológico

#### Frontend
- **React 18** - Biblioteca UI moderna
- **TypeScript** - Type safety em todo o código
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilização utility-first
- **Radix UI + shadcn/ui** - Componentes acessíveis
- **Wouter** - Roteamento leve
- **React Query** - Gerenciamento de estado do servidor
- **React Hook Form + Zod** - Validação de formulários
- **Framer Motion** - Animações fluidas

#### Backend
- **Node.js + Express** - API RESTful
- **TypeScript** - Type safety no servidor
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM type-safe
- **Neon Database** - PostgreSQL serverless
- **Helmet** - Segurança HTTP
- **Express Rate Limit** - Proteção contra abuso

### Estrutura do Projeto

```
novaforge/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilitários
├── server/                # Backend Express
│   ├── routes.ts          # Rotas da API
│   ├── index.ts           # Servidor principal
│   └── middleware/        # Middlewares
├── shared/                # Código compartilhado
│   └── schema.ts          # Schemas Zod
└── package.json           # Dependências
```

## 🚀 Como Executar

### Pré-requisitos

```bash
Node.js 18+
PostgreSQL 14+
npm ou yarn
```

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/lucianoon/novaforge.git
cd novaforge
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais
```

Variáveis necessárias:
```env
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=development
PORT=3000
ADMIN_KEY=seu_token_secreto
```

4. Execute as migrações do banco:
```bash
npm run db:push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5000`

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Sobe o build de produção
npm run check        # Type-check com tsc
npm test             # Executa a suíte de testes
npm run db:push      # Aplica migrações do banco
```

## 🧪 Testes

O projeto usa [Vitest](https://vitest.dev/) para testes automatizados:

```bash
npm test             # Executa a suíte de testes
```

Cobertura atual:

- ✅ **Schemas Zod** (`shared/schema.ts`) - casos válidos e inválidos
- ✅ **Rotas da API** (`server/routes.ts`) - validação, autenticação e erros, com storage mockado (sem banco real)

Os testes ficam em `tests/` e rodam automaticamente no CI a cada push e pull request.

## 🎨 Personalização

### Tema e Cores

O tema pode ser personalizado editando `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
      // ...
    }
  }
}
```

### Conteúdo

Edite os componentes em `client/src/pages/` para personalizar:
- Textos e descrições
- Imagens e ícones
- Seções e layout
- Depoimentos de clientes

## 🔐 Segurança

O projeto implementa múltiplas camadas de segurança:

- ✅ **Helmet** para headers HTTP seguros
- ✅ **CORS** configurado adequadamente
- ✅ **Rate limiting** em todas as rotas
- ✅ **Validação dupla** de dados (cliente e servidor)
- ✅ **Autenticação** com bearer token
- ✅ **SQL injection protection** via Drizzle ORM
- ✅ **XSS protection** via sanitização de inputs

## 📊 Performance

Otimizações implementadas:

- ⚡ **Code splitting** automático
- ⚡ **Lazy loading** de componentes
- ⚡ **Caching** com React Query
- ⚡ **Compressão** de assets
- ⚡ **Minificação** de código
- ⚡ **Tree shaking** para bundle menor

## 🌐 Deploy

### Opções de Deploy

#### Vercel (Recomendado para Frontend)
```bash
npm install -g vercel
vercel
```

#### Heroku (Backend)
```bash
git push heroku main
```

## 🗺️ Roadmap

### Em Desenvolvimento
- [ ] Integração com SendGrid para emails
- [ ] Sistema de agendamento online
- [ ] Dashboard com analytics avançado
- [ ] Integração com WhatsApp Business
- [ ] Sistema de CRM integrado

### Planejado
- [ ] App mobile (React Native)
- [ ] Módulo de pagamentos
- [ ] Sistema de notificações push
- [ ] Multi-idioma (PT/EN/ES)
- [ ] Temas personalizáveis por cliente

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Luciano Oliveira Nunes**
- LinkedIn: [linkedin.com/in/luciano-oliveira-nunes](https://www.linkedin.com/in/luciano-oliveira-nunes/)
- GitHub: [@lucianoon](https://github.com/lucianoon)
- Email: [contato@novaforge.com.br](mailto:contato@novaforge.com.br)

## 🙏 Agradecimentos

- Comunidade React e TypeScript
- Equipe do Radix UI e shadcn/ui
- Contribuidores do Drizzle ORM
- Todos os desenvolvedores que contribuíram com feedback

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma [issue](https://github.com/lucianoon/novaforge/issues)
- Entre em contato via LinkedIn
- Envie um email para suporte@novaforge.com.br

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

**Desenvolvido com ❤️ para transformar negócios locais através da tecnologia**

