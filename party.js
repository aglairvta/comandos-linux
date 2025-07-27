function dispararConfete(elemento) {
  party.confetti(elemento, {
    count: party.variation.range(30, 50),
    spread: 90,
    speed: 400,
    colors: ["#00ffff", "#ffffff"],
  });
}