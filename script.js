const searchInput = document.querySelector("#breed-search");
const breedCards = document.querySelectorAll(".breed-card");
const noResults = document.querySelector("#no-results");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  breedCards.forEach((card) => {
    const matches = card.dataset.breed.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  noResults.hidden = visibleCount > 0;
});
