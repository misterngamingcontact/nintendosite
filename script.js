const quizData = [
  {
    q: "Dans quel métier Mario exerçait-il à l'origine (1981, Donkey Kong) ?",
    answers: ["Médecin", "Charpentier", "Plombier", "Pilote de kart"],
    correct: 1,
  },
  {
    q: "Quelle console a introduit le stick analogique sur manette ?",
    answers: ["Nintendo 64", "Super Nintendo", "GameCube", "Wii"],
    correct: 0,
  },
  {
    q: "Quel jeu a popularisé le format « monde ouvert » moderne en 2017 ?",
    answers: ["Metroid Dread", "Zelda: Breath of the Wild", "Super Mario Odyssey", "Splatoon 2"],
    correct: 1,
  },
];

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  });

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".stat-num").forEach((el) => observer.observe(el));
}

function initCarousel() {
  const carousel = document.getElementById("carousel");
  const step = () => carousel.querySelector(".consoles-card").offsetWidth + 22;
  document.getElementById("prevBtn").addEventListener("click", () => {
    carousel.scrollBy({ left: -step(), behavior: "smooth" });
  });
  document.getElementById("nextBtn").addEventListener("click", () => {
    carousel.scrollBy({ left: step(), behavior: "smooth" });
  });
}

function initQuiz() {
  const questionEl = document.getElementById("quizQuestion");
  const answersEl = document.getElementById("quizAnswers");
  const feedbackEl = document.getElementById("quizFeedback");
  const scoreEl = document.getElementById("quizScore");
  let index = 0;
  let score = 0;

  function render() {
    const current = quizData[index];
    questionEl.textContent = `Question ${index + 1}/${quizData.length} — ${current.q}`;
    answersEl.innerHTML = "";
    feedbackEl.textContent = "";
    const feedback = current.correct;
    current.answers.forEach((answer, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = answer;
      btn.addEventListener("click", () => {
        const isCorrect = i === feedback;
        btn.classList.add(isCorrect ? "correct" : "wrong");
        answersEl.querySelectorAll("button").forEach((b, j) => {
          b.disabled = true;
          if (j === feedback) b.classList.add("correct");
        });
        if (isCorrect) score += 1;
        feedbackEl.textContent = isCorrect
          ? "✅ Exact ! Bien joué."
          : "❌ Raté… le prochain sera le bon.";
        scoreEl.textContent = `Score : ${score}/${quizData.length}`;
        setTimeout(() => {
          index += 1;
          if (index < quizData.length) {
            render();
          } else {
            questionEl.textContent =
              score === quizData.length
                ? "🏆 Sans faute ! Tu es un vrai vétéran Nintendo."
                : `Terminé ! Score final : ${score}/${quizData.length}`;
            answersEl.innerHTML = "";
            feedbackEl.textContent = "";
            const replay = document.createElement("button");
            replay.type = "button";
            replay.textContent = "Rejouer";
            replay.addEventListener("click", () => {
              index = 0;
              score = 0;
              scoreEl.textContent = "";
              render();
            });
            answersEl.appendChild(replay);
          }
        }, 1400);
      });
      answersEl.appendChild(btn);
    });
  }

  render();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initReveal();
  initCounters();
  initCarousel();
  initQuiz();
});
