# Landing Page - Vitória Castro Nutricionista

## Descrição
Landing page institucional moderna e responsiva para a nutricionista Vitória Castro, desenvolvida com HTML5, CSS3 e JavaScript vanilla. O design utiliza um tema claro com destaque em tons de verde, transmitindo saúde e bem-estar.

## Características Principais

### Design e Visual
- **Tema claro** com paleta de cores verdes (#2d7d32, #4caf50, #81c784)
- **Tipografia moderna** usando Google Fonts (Poppins e Inter)
- **Ícones Font Awesome** para elementos visuais
- **Imagens profissionais** relacionadas à nutrição e saúde
- **Animações fluidas** e micro-interações

### Funcionalidades
- **Faixa animada superior** com texto em movimento
- **Navegação responsiva** com menu hambúrguer para mobile
- **Slider de depoimentos** com navegação automática e manual
- **Formulário de contato** com validação
- **Botões chamativos** com design arredondado e efeitos hover
- **Scroll suave** entre seções
- **Botão WhatsApp flutuante**
- **Botão "voltar ao topo"**

### Seções Incluídas
1. **Hero** - Apresentação principal com estatísticas
2. **Sobre** - Informações sobre a nutricionista
3. **Serviços** - Cards com preços e características
4. **Vantagens** - Benefícios de escolher a profissional
5. **Depoimentos** - Slider com feedback de pacientes
6. **CTA** - Chamada para ação principal
7. **Contato** - Informações e formulário
8. **Footer** - Links e informações adicionais

### Responsividade
- **Mobile First** - Otimizado para dispositivos móveis
- **Breakpoints** em 768px e 480px
- **Grid flexível** que se adapta a diferentes tamanhos
- **Imagens responsivas** com object-fit
- **Menu mobile** com animação hamburger

## Estrutura de Arquivos

```
vitoria-castro-landing/
├── index.html          # Arquivo principal
├── assets/
│   └── images/         # Imagens do projeto
│       ├── hero-nutritionist.jpg
│       ├── nutritionist-planning.jpg
│       ├── healthy-foods.jpg
│       ├── healthy-lifestyle.jpg
│       └── colorful-foods.jpg
└── README.md           # Documentação
```

## Tecnologias Utilizadas
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
  - CSS Grid e Flexbox
  - CSS Variables (Custom Properties)
  - Animações e transições
  - Media queries para responsividade
- **JavaScript ES6+** - Interatividade
  - Intersection Observer API
  - Event listeners
  - DOM manipulation
  - Form validation
- **Font Awesome 6.4.0** - Ícones
- **Google Fonts** - Tipografia (Poppins e Inter)

## Personalização

### Cores
As cores principais estão definidas como CSS variables no `:root`:
```css
--primary-color: #2d7d32;
--primary-light: #4caf50;
--secondary-color: #81c784;
--accent-color: #66bb6a;
```

### Conteúdo
Para personalizar o conteúdo, edite as seguintes seções no HTML:
- Informações pessoais da nutricionista
- Preços dos serviços
- Depoimentos de pacientes
- Informações de contato
- Textos das seções

### Imagens
Substitua as imagens na pasta `assets/images/` mantendo os mesmos nomes ou atualize as referências no HTML.

## Funcionalidades JavaScript

### Navegação
- Menu responsivo com toggle para mobile
- Scroll suave entre seções
- Header que muda ao fazer scroll

### Slider de Depoimentos
- Navegação automática (5 segundos)
- Controles manuais (botões e dots)
- Transições suaves

### Formulário
- Validação de campos obrigatórios
- Validação de email
- Sistema de notificações
- Reset automático após envio

### Animações
- Scroll animations com Intersection Observer
- Contadores animados para estatísticas
- Efeitos hover em cards
- Animações de entrada

## Otimizações

### Performance
- Debounce em eventos de scroll
- Lazy loading para imagens
- CSS otimizado com variáveis
- JavaScript modular

### SEO
- Meta tags apropriadas
- Estrutura semântica HTML5
- Alt text em imagens
- Títulos hierárquicos

### Acessibilidade
- Contraste adequado de cores
- Navegação por teclado
- ARIA labels onde necessário
- Textos alternativos

## Como Usar

1. **Abrir o arquivo** `index.html` em um navegador
2. **Personalizar o conteúdo** conforme necessário
3. **Substituir imagens** na pasta assets/images/
4. **Ajustar cores** nas CSS variables
5. **Testar responsividade** em diferentes dispositivos

## Compatibilidade
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Dispositivos móveis iOS e Android

## Template para Outros Sites
Este projeto foi desenvolvido como template reutilizável. Para adaptar para outros profissionais:

1. Altere as informações pessoais
2. Ajuste a paleta de cores conforme a área
3. Substitua as imagens por conteúdo relevante
4. Modifique os serviços e preços
5. Atualize os depoimentos
6. Personalize as informações de contato

## Suporte
Para dúvidas ou sugestões sobre o template, consulte a documentação ou entre em contato.

