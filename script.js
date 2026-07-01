document.addEventListener("DOMContentLoaded", () => {
    
    // Matriz de dados contendo o Copywriting de cada modo
    const contentData = {
        criador: {
            title: "O jogo mudou. Seu dia a dia agora é uma Missão.",
            subtitle: "Crie conteúdos reais para marcas locais, evolua seu avatar e ganhe recompensas reais.",
            cta: "Começar Jornada",
            gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(9, 9, 11, 0.8) 100%)"
        },
        empresa: {
            title: "Crie um Batalhão de divulgadores locais.",
            subtitle: "Chega de anúncios caros. Coloque missões no mapa e tenha dezenas de micro-influenciadores gerando vendas reais para o seu negócio.",
            cta: "Recrutar Criadores",
            gradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(9, 9, 11, 0.8) 100%)" // Variação sutil pro modo empresa
        }
    };

    // Seleção de Elementos do DOM
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const heroCta = document.getElementById("hero-cta");
    const heroVisualBg = document.getElementById("hero-visual-bg");
    
    let currentMode = "criador";

    // Event Listener para os botões do Alternador
    toggleButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const targetMode = e.target.getAttribute("data-target");
            
            // Evita re-animar se clicar no botão que já está ativo
            if (targetMode === currentMode) return;
            
            currentMode = targetMode;

            // 1. Atualiza classe ativa no alternador
            toggleButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            // 2. Mágica UI/UX: Animação de Fade-out + Troca de Conteúdo + Fade-in usando GSAP
            // Animamos o bloco de textos e o botão separadamente para dar um efeito de "Stagger" (atraso) premium
            gsap.to([".hero-text-anim-wrapper", heroCta], {
                opacity: 0,
                y: 15,
                duration: 0.25,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    // Atualiza os textos no DOM exatamente quando sumirem
                    heroTitle.textContent = contentData[currentMode].title;
                    heroSubtitle.textContent = contentData[currentMode].subtitle;
                    heroCta.textContent = contentData[currentMode].cta;

                    // Muda o background do placeholder com transição CSS
                    heroVisualBg.style.background = contentData[currentMode].gradient;

                    // Faz o conteúdo reaparecer suavemente subindo
                    gsap.to([".hero-text-anim-wrapper", heroCta], {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.08,
                        ease: "power2.out"
                    });
                }
            });
        });
    });
});
