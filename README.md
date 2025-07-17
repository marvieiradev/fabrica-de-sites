# Fábrica de Sites - Landing Page

Uma landing page moderna e responsiva para a empresa "Fábrica de Sites", desenvolvida com HTML5, CSS3 e JavaScript puro.

## 🚀 Características

- **Design Moderno e Futurista**: Interface elegante com gradientes roxo/azul claro
- **Tema Dark/Light**: Toggle entre temas escuro e claro com persistência no localStorage
- **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- **Animações Suaves**: Elementos flutuantes, animações de scroll e micro-interações
- **Performance Otimizada**: Carregamento rápido e otimizado
- **SEO Friendly**: Estrutura semântica e meta tags otimizadas

## 📁 Estrutura do Projeto

```
fabrica-de-sites/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS com temas e animações
├── js/
│   └── script.js       # JavaScript para interatividade
├── images/             # Imagens da galeria de projetos
│   ├── site_exemplo_1.jpeg
│   ├── site_exemplo_2.webp
│   ├── site_exemplo_3.png
│   ├── site_exemplo_4.jpeg
│   ├── site_exemplo_5.jpg
│   ├── site_exemplo_6.png
│   ├── site_exemplo_7.png
│   └── site_exemplo_8.jpeg
├── assets/             # Ícones e imagens de fundo
│   ├── html_css_js.jpg
│   ├── python.png
│   ├── react.png
│   ├── flask.jpg
│   ├── ai.jpg
│   ├── hero_bg_1.jpg
│   ├── hero_bg_2.jpg
│   ├── hero_bg_3.jpg
│   └── hero_bg_4.jpg
└── README.md           # Este arquivo
```

## 🎨 Seções do Site

### 1. Header
- Logo da empresa
- Menu de navegação
- Toggle de tema (dark/light)
- Menu mobile responsivo

### 2. Hero Section
- Título principal com gradiente
- Descrição da empresa
- Botões de call-to-action
- Elementos flutuantes animados

### 3. Sobre
- Apresentação da empresa
- Features principais com ícones
- Foco em inovação e tecnologia

### 4. Galeria de Projetos
- 8 cards de projetos
- Imagens com overlay de hover
- Tags de tecnologias utilizadas
- Botão de contato via WhatsApp

### 5. Tecnologias
- Categorias: Frontend, Backend, IA
- Ícones das tecnologias
- Benefícios das tecnologias escolhidas

### 6. Valores/Preços
- 3 planos de serviços
- Destaque para o plano mais popular
- Lista de features incluídas
- Botões de contato para cada plano

### 7. Contato
- Informações de contato
- Métodos de comunicação
- Call-to-action principal

### 8. Footer
- Links organizados por categoria
- Informações da empresa
- Copyright

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos, Grid, Flexbox, Animações
- **JavaScript**: Interatividade e funcionalidades dinâmicas
- **Google Fonts**: Tipografia (Inter e Space Grotesk)

## ✨ Funcionalidades

### Toggle de Tema
- Alternância entre tema dark (padrão) e light
- Persistência da preferência no localStorage
- Transições suaves entre temas
- Ícone dinâmico (lua/sol)

### Animações
- Elementos flutuantes no hero
- Animações de entrada no scroll
- Hover effects nos cards
- Transições suaves em botões e links

### Responsividade
- Layout adaptativo para todas as telas
- Menu mobile com hamburger
- Grid responsivo para cards
- Tipografia escalável

### Interatividade
- Scroll suave para seções
- Header que se esconde/mostra no scroll
- Lazy loading para imagens
- Efeitos de hover personalizados

## 📱 Responsividade

O site é totalmente responsivo e foi testado em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Breakpoints Principais
- `768px`: Transição para layout mobile
- `480px`: Ajustes para telas muito pequenas

## 🎯 Call-to-Actions

O site possui botões estratégicos de contato via WhatsApp:
- Hero section: "Solicitar Orçamento"
- Galeria: "Solicitar Orçamento via WhatsApp"
- Preços: Botões individuais para cada plano
- Contato: "Iniciar Conversa no WhatsApp"

## 🚀 Como Usar

1. **Abrir o site**: Simplesmente abra o arquivo `index.html` em qualquer navegador moderno
2. **Navegação**: Use o menu superior ou scroll para navegar pelas seções
3. **Tema**: Clique no ícone da lua/sol para alternar entre temas
4. **Mobile**: O menu mobile aparece automaticamente em telas menores
5. **Contato**: Clique nos botões de WhatsApp para iniciar conversas

## 🔧 Personalização

### Cores
As cores principais estão definidas como variáveis CSS em `:root`:
```css
--primary-purple: #8B5CF6;
--primary-cyan: #06B6D4;
--gradient-primary: linear-gradient(135deg, var(--primary-purple), var(--primary-cyan));
```

### Conteúdo
- **Textos**: Edite diretamente no arquivo `index.html`
- **Imagens**: Substitua as imagens nas pastas `images/` e `assets/`
- **Contatos**: Atualize os links do WhatsApp com o número real

### Animações
As animações podem ser ajustadas nas variáveis CSS:
```css
--transition-fast: 0.2s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;
```

## 📞 Contatos Configurados

Atualmente configurado com número de exemplo:
- **WhatsApp**: (11) 99999-9999
- **E-mail**: contato@fabricadesites.com

**⚠️ Importante**: Substitua pelos dados reais antes de usar em produção.

## 🌟 Destaques Técnicos

- **Performance**: Otimizado para carregamento rápido
- **Acessibilidade**: Estrutura semântica e navegação por teclado
- **SEO**: Meta tags e estrutura otimizada para buscadores
- **Cross-browser**: Compatível com navegadores modernos
- **Mobile-first**: Desenvolvido pensando primeiro em dispositivos móveis

## 📈 Próximos Passos

Para colocar o site em produção:
1. Substitua as informações de contato pelos dados reais
2. Configure um domínio e hospedagem
3. Adicione Google Analytics (código já preparado)
4. Configure certificado SSL
5. Otimize imagens para produção

---

**Desenvolvido com 💜 e tecnologia de ponta**

*Este projeto demonstra as capacidades da Fábrica de Sites em criar experiências digitais modernas e funcionais.*

