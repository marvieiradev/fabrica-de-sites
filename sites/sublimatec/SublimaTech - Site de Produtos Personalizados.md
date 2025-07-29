# SublimaTech - Site de Produtos Personalizados

## Descrição
Site moderno e responsivo para empresa de produtos personalizados por sublimação, desenvolvido com HTML5, CSS3 e JavaScript vanilla.

## Características
- ✅ Design moderno e futurista
- ✅ Tema claro com detalhes em verde claro
- ✅ Totalmente responsivo (desktop e mobile)
- ✅ **Hero Section com imagem de fundo animada**
- ✅ **Cards de contato organizados em grid responsivo**
- ✅ Animações suaves e leves
- ✅ Seção de galeria com cards de produtos
- ✅ Integração com WhatsApp para orçamentos
- ✅ Fontes modernas (Poppins)
- ✅ Ícones Font Awesome

## Novidades da Última Atualização
### Hero Section Aprimorado
- Imagem de fundo com textura de sublimação
- Animação suave de flutuação (heroFloat)
- Overlay com gradiente para melhor legibilidade
- Efeito de blur sutil na imagem de fundo

### Seção de Contato com Cards
- 4 cards informativos: Telefone, Email, Endereço, WhatsApp
- Layout em grid responsivo
- Ícones Font Awesome para cada tipo de contato
- Animações de hover com efeito de brilho
- Botão dedicado do WhatsApp no card correspondente

## Estrutura do Projeto
```
sublimacao-site/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos principais
├── js/
│   └── script.js       # Scripts e animações
├── images/             # Imagens dos produtos
│   ├── caneca_personalizada.jpg
│   ├── camiseta_sublimada.jpg
│   └── brinde_corporativo.jpg
└── README.md           # Este arquivo
```

## Como Personalizar

### 1. Alterar Informações da Empresa
Edite o arquivo `index.html` e altere:
- Nome da empresa (atualmente "SublimaTech")
- Textos descritivos
- Informações de contato

### 2. Configurar WhatsApp
No arquivo `index.html`, substitua `SEU_NUMERO_WHATSAPP` pelo número real:
```html
<a href="https://wa.me/5511999999999" target="_blank" class="btn-whatsapp">
```

### 3. Adicionar/Alterar Produtos na Galeria
Para adicionar novos produtos:
1. Adicione a imagem na pasta `images/`
2. Adicione um novo card na seção `.gallery-grid` do HTML:
```html
<div class="product-card">
    <img src="images/seu_produto.jpg" alt="Seu Produto">
    <h3>Nome do Produto</h3>
    <p>Descrição do produto aqui.</p>
</div>
```

### 4. Personalizar Cores
No arquivo `css/style.css`, altere as variáveis CSS no `:root`:
```css
:root {
    --primary-color: #90EE90;    /* Verde claro principal */
    --secondary-color: #98FB98;  /* Verde claro secundário */
    --accent-color: #32CD32;     /* Verde de destaque */
    /* ... outras cores */
}
```

### 5. Alterar Fontes
Para usar outras fontes do Google Fonts:
1. Altere o link no `<head>` do HTML
2. Atualize a propriedade `font-family` no CSS

## Como Usar

### Visualização Local
1. Abra o arquivo `index.html` em qualquer navegador moderno
2. O site funcionará completamente offline

### Deploy/Hospedagem
O site pode ser hospedado em qualquer servidor web estático:
- GitHub Pages
- Netlify
- Vercel
- Servidor próprio

## Funcionalidades

### Navegação Suave
- Clique nos links do menu para navegar suavemente entre seções
- Scroll automático para a seção desejada

### Responsividade
- Layout adaptativo para diferentes tamanhos de tela
- Menu otimizado para mobile
- Cards da galeria se reorganizam automaticamente

### Animações
- Fade-in das seções ao rolar a página
- Hover effects nos cards e botões
- Animações CSS suaves e performáticas

## Tecnologias Utilizadas
- HTML5 semântico
- CSS3 com Flexbox e Grid
- JavaScript ES6+
- Google Fonts (Poppins)
- Font Awesome Icons

## Suporte a Navegadores
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Licença
Este projeto foi desenvolvido como template personalizável. Sinta-se livre para modificar conforme suas necessidades.

