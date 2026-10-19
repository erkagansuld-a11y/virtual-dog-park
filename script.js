const searchInput = document.querySelector("#breed-search");
const breedCards = document.querySelectorAll(".breed-card");
const noResults = document.querySelector("#no-results");
const year = document.querySelector("#year");
const adoptForm = document.querySelector("#adopt-form");
const dogNameInput = document.querySelector("#dog-name");
const dogBreedSelect = document.querySelector("#dog-breed");
const nameError = document.querySelector("#name-error");
const dogDashboard = document.querySelector("#dog-dashboard");
const dogImage = document.querySelector("#dog-image");
const dogDisplayName = document.querySelector("#dog-display-name");
const dogDisplayBreed = document.querySelector("#dog-display-breed");
const dogDay = document.querySelector("#dog-day");
const dogStage = document.querySelector("#dog-stage");
const dogHappiness = document.querySelector("#dog-happiness");
const happinessTrack = document.querySelector("#happiness-track");
const happinessFill = document.querySelector("#happiness-fill");
const careFeedback = document.querySelector("#care-feedback");
const feedButton = document.querySelector("#feed-dog");
const playButton = document.querySelector("#play-dog");
const nextDayButton = document.querySelector("#next-day");
const startOverButton = document.querySelector("#start-over");

const breedImages = {
  Beagle: "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  Poodle: "assets/poodle.svg",
};

const storageKey = "virtual-dog-park-dog";
let adoptedDog = null;

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

function showNameError(message, field) {
  nameError.textContent = message;
  nameError.hidden = false;
  field.setAttribute("aria-invalid", "true");
  field.focus();
}

function clearNameError() {
  nameError.textContent = "";
  nameError.hidden = true;
  dogNameInput.removeAttribute("aria-invalid");
  dogBreedSelect.removeAttribute("aria-invalid");
}

function getGrowthStage(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

function updateDogDashboard() {
  dogDashboard.hidden = !adoptedDog;
  adoptForm.hidden = Boolean(adoptedDog);
  if (!adoptedDog) return;

  dogDisplayName.textContent = adoptedDog.name;
  dogDisplayBreed.textContent = adoptedDog.breed;
  dogImage.src = breedImages[adoptedDog.breed];
  dogImage.alt = `Illustration of a ${adoptedDog.breed}`;
  dogDay.textContent = `Day ${adoptedDog.day}`;
  dogStage.textContent = getGrowthStage(adoptedDog.day);
  dogHappiness.textContent = adoptedDog.happiness;
  happinessTrack.setAttribute("aria-valuenow", String(adoptedDog.happiness));
  happinessFill.style.width = `${adoptedDog.happiness}%`;
}

function saveDog() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(adoptedDog));
    return true;
  } catch (error) {
    console.error("Could not save the dog to browser storage.", error);
    careFeedback.textContent =
      "Your dog is active, but this browser could not save its progress.";
    return false;
  }
}

function restoreDog() {
  const savedDog = localStorage.getItem(storageKey);
  if (!savedDog) return;

  try {
    const dog = JSON.parse(savedDog);
    const validDog =
      dog &&
      typeof dog.name === "string" &&
      dog.name.trim().length > 0 &&
      dog.name.length <= 20 &&
      Object.hasOwn(breedImages, dog.breed) &&
      Number.isInteger(dog.day) &&
      dog.day >= 1 &&
      Number.isInteger(dog.happiness) &&
      dog.happiness >= 0 &&
      dog.happiness <= 100;

    if (!validDog) {
      throw new TypeError("Saved dog data is invalid.");
    }

    adoptedDog = dog;
    updateDogDashboard();
    careFeedback.textContent = `${adoptedDog.name} is back at the park!`;
  } catch (error) {
    console.error("Could not restore the saved dog.", error);
    localStorage.removeItem(storageKey);
    careFeedback.textContent =
      "Saved dog data was invalid and has been cleared. You can adopt again.";
  }
}

function careForDog(action) {
  if (!adoptedDog) return;

  adoptedDog.happiness = Math.min(adoptedDog.happiness + 10, 100);
  const saved = saveDog();
  updateDogDashboard();
  if (!saved) return;
  const activityMessage =
    action === "feed" ? "enjoyed a tasty meal" : "had a fun play session";

  if (adoptedDog.happiness === 100) {
    careFeedback.textContent = `${adoptedDog.name} ${activityMessage}! Happiness is full.`;
    return;
  }

  careFeedback.textContent = `${adoptedDog.name} ${activityMessage}! Happiness +10.`;
}

function advanceDay() {
  if (!adoptedDog) return;

  adoptedDog.day += 1;
  adoptedDog.happiness = Math.max(adoptedDog.happiness - 5, 0);
  const saved = saveDog();
  updateDogDashboard();
  if (!saved) return;
  careFeedback.textContent = `A new day begins! ${adoptedDog.name}'s happiness decreased by 5.`;
}

adoptForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearNameError();

  const name = dogNameInput.value.trim();
  const breed = dogBreedSelect.value;

  if (name.length === 0) {
    showNameError("Please enter a name before adopting your dog.", dogNameInput);
    return;
  }

  if (name.length > 20) {
    showNameError("Please keep the name to 20 characters or fewer.", dogNameInput);
    return;
  }

  if (!Object.hasOwn(breedImages, breed)) {
    showNameError("Please choose one of the three breeds.", dogBreedSelect);
    return;
  }

  adoptedDog = { name, breed, day: 1, happiness: 50 };
  if (saveDog()) {
    careFeedback.textContent = `${adoptedDog.name} is ready for a happy day!`;
  }
  updateDogDashboard();
  dogDashboard.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

dogNameInput.addEventListener("input", clearNameError);
dogBreedSelect.addEventListener("change", clearNameError);
feedButton.addEventListener("click", () => careForDog("feed"));
playButton.addEventListener("click", () => careForDog("play"));
nextDayButton.addEventListener("click", advanceDay);
startOverButton.addEventListener("click", () => {
  if (!adoptedDog || !window.confirm("Start over and delete your saved dog?")) return;

  localStorage.removeItem(storageKey);
  adoptedDog = null;
  updateDogDashboard();
  careFeedback.textContent = "Your saved progress was deleted. You can adopt a new dog.";
});

restoreDog();
