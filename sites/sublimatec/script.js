// Adicionar funcionalidade de scroll suave para os links de navegação
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Animação de fade-in para seções ao rolar
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    observer.observe(section);
});

// Adicionar classe para animação de fade-in no CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
.fade-in {
    animation: fadeInUp 1s ease-out forwards;
}
`, styleSheet.cssRules.length);

// Placeholder para futura funcionalidade de carregamento dinâmico da galeria
// function loadGalleryItems() {
//     // Aqui você poderia carregar itens da galeria de um JSON ou API
//     console.log("Carregando itens da galeria...");
// }
// loadGalleryItems();


