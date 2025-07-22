# Landing Page - João Sobreira Personal Trainer

Uma landing page moderna, responsiva e profissional para personal trainers, desenvolvida com HTML5, CSS3 e JavaScript vanilla.

## 🎯 Características

- **Design Dark Moderno**: Tema escuro com destaques em laranja neon
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Fluidas**: Efeitos modernos e chamativas sem comprometer a performance
- **SEO Otimizado**: Estrutura semântica e meta tags configuradas
- **Fácil Personalização**: Código organizado e bem documentado
- **Performance Otimizada**: Carregamento rápido e animações suaves

## 📁 Estrutura do Projeto

```
joao-sobreira-landing/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos principais
│   ├── js/
│   │   └── script.js       # JavaScript e animações
│   └── images/             # Imagens do projeto
│       ├── hero-trainer.png
│       ├── personal-training.jpg
│       ├── coaching.jpg
│       ├── modern-gym.jpg
│       └── fitness-coach.jpg
└── README.md               # Este arquivo
```

## 🎨 Personalização

### Cores

As cores principais estão definidas no arquivo `assets/css/style.css` nas variáveis CSS:

```css
:root {
    /* Cores Principais */
    --primary-orange: #ff6b35;
    --primary-orange-light: #ff8c5a;
    --primary-orange-dark: #e55a2b;
    --neon-orange: #ff4500;
    
    /* Cores Dark */
    --bg-dark: #0a0a0a;
    --bg-dark-secondary: #111111;
    --bg-card: #1e1e1e;
    
    /* Cores de Texto */
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
}
```

### Conteúdo

#### 1. Informações Pessoais
Edite no arquivo `index.html`:

- **Nome**: Altere "João Sobreira" nas tags `<title>`, `<h1>`, etc.
- **Descrição**: Modifique o texto na seção hero
- **Estatísticas**: Atualize os números na seção `.hero-stats`
- **Sobre**: Personalize o conteúdo da seção `#sobre`

#### 2. Planos de Treino
Na seção `#planos`, você pode:

- Alterar preços nos elementos `.price-value`
- Modificar benefícios nas listas `.plan-features`
- Adicionar/remover planos duplicando os `.plan-card`

#### 3. Depoimentos
Na seção `#depoimentos`:

- Substitua os textos dos depoimentos
- Altere nomes e profissões dos clientes
- Adicione mais depoimentos duplicando os `.testimonial-card`

#### 4. Contato
Na seção footer:

- Atualize telefone, email e endereço
- Modifique links das redes sociais
- Configure o link do WhatsApp

### Imagens

Para substituir as imagens:

1. Coloque suas novas imagens na pasta `assets/images/`
2. Mantenha os mesmos nomes ou atualize as referências no HTML
3. Recomendado: Use imagens otimizadas (WebP ou JPG comprimido)

### Fontes

O projeto usa as fontes Google Fonts:
- **Inter**: Para textos gerais
- **Poppins**: Para títulos e destaques

Para alterar, modifique o link no `<head>` e as variáveis CSS:

```css
--font-primary: 'SuaFonte', sans-serif;
--font-secondary: 'SuaFonteDestaque', sans-serif;
```

## 🚀 Como Usar

### Desenvolvimento Local

1. Faça o download de todos os arquivos
2. Abra o arquivo `index.html` em um navegador
3. Para edições, use qualquer editor de código (VS Code recomendado)

### Hospedagem

O projeto é estático e pode ser hospedado em qualquer servidor web:

- **GitHub Pages**: Gratuito para projetos públicos
- **Netlify**: Deploy automático e gratuito
- **Vercel**: Hospedagem rápida e gratuita
- **Servidor tradicional**: Upload via FTP

### Configuração do WhatsApp

Para configurar o botão do WhatsApp:

1. Substitua `5511999999999` pelo seu número (com código do país)
2. A mensagem será enviada automaticamente quando o usuário clicar

```html
<a href="https://wa.me/5511999999999" class="footer-whatsapp">
```

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: até 767px

### Testando Responsividade

1. Abra as ferramentas de desenvolvedor (F12)
2. Clique no ícone de dispositivo móvel
3. Teste diferentes tamanhos de tela

## ⚡ Performance

### Otimizações Incluídas

- **CSS otimizado**: Uso de variáveis e classes reutilizáveis
- **JavaScript modular**: Código organizado em classes
- **Imagens otimizadas**: Compressão adequada
- **Lazy loading**: Carregamento sob demanda
- **Animações eficientes**: Uso de transform e opacity

### Dicas de Performance

1. **Comprima imagens**: Use ferramentas como TinyPNG
2. **Minifique código**: Para produção, minifique CSS e JS
3. **Use CDN**: Para bibliotecas externas como Font Awesome
4. **Cache**: Configure cache no servidor

## 🎭 Animações

### Animações Incluídas

- **Faixa animada**: Texto rolando no topo
- **Scroll suave**: Navegação entre seções
- **Fade in**: Elementos aparecem ao rolar
- **Hover effects**: Efeitos nos cards e botões
- **Parallax sutil**: Movimento da imagem de fundo
- **Contador animado**: Números das estatísticas

### Personalizando Animações

No arquivo `assets/js/script.js`, você pode:

- Ajustar velocidades nas variáveis `CONFIG`
- Modificar efeitos na classe `AnimationManager`
- Adicionar novas animações seguindo os padrões existentes

## 🔧 Customização Avançada

### Adicionando Novas Seções

1. Crie o HTML da nova seção
2. Adicione estilos no CSS
3. Inclua animações no JavaScript se necessário
4. Atualize a navegação

### Integrações

O projeto está preparado para integrar com:

- **Google Analytics**: Adicione o código de tracking
- **Facebook Pixel**: Para campanhas de marketing
- **Formulários**: Integração com serviços como Formspree
- **Chat**: WhatsApp Business ou outros chats

### SEO

Para melhorar o SEO:

1. Atualize as meta tags no `<head>`
2. Adicione dados estruturados (Schema.org)
3. Configure sitemap.xml
4. Otimize alt texts das imagens

## 📞 Suporte

Este template foi desenvolvido para ser facilmente customizável. Para dúvidas:

1. Consulte a documentação do código (comentários)
2. Use as ferramentas de desenvolvedor do navegador
3. Teste sempre em diferentes dispositivos

## 📄 Licença

Este projeto é um template personalizado. Você pode:

- ✅ Usar para projetos pessoais e comerciais
- ✅ Modificar e adaptar conforme necessário
- ✅ Criar múltiplas versões para diferentes clientes

## 🎉 Créditos

- **Fontes**: Google Fonts (Inter, Poppins)
- **Ícones**: Font Awesome
- **Imagens**: Imagens de stock otimizadas para o tema fitness

---

**Desenvolvido com ❤️ para transformar negócios de personal trainers**

