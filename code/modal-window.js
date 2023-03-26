class ModalWindow {
  constructor(cardsContainer, builderModalWindows) {
    this.cardsContainer = cardsContainer;
    this.builderModalWindows = builderModalWindows;

    this.modalBack = document.querySelector('.modal-back');

    this.closeButton = document.querySelector('.close-btn');
    this.leftButton = document.querySelector('.left-arrow-container');
    this.rightButton = document.querySelector('.right-arrow-container');


    this.closeButton.addEventListener('click', this.onCloseButton.bind(this));
    this.leftButton.addEventListener('click', this.onLeftButton.bind(this));
    this.rightButton.addEventListener('click', this.onRightButton.bind(this));

    this.imageContainer = document.querySelector('.modal-window-image-container');
    this.CharacterName = document.querySelector('.name');
    this.CharacterStatus = document.querySelector('.status');
    this.CharacterSpecies = document.querySelector('.species');
    this.CharacterOrigin = document.querySelector('.origin');
    this.CharacterLocation = document.querySelector('.location');
    this.CharacterGender = document.querySelector('.gender');
  }

  async modalWindowRequest(id) {
    try {
      const data = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      const card = await data.json();
      this.getVariablesForModal(card, id);
    } catch (error) {
      alert('try again');
    }
  }

  async getVariablesForModal(card, id) {
    const { name: nameModal, status, species, origin, location, gender, image } = card;
    this.createModalWindows(nameModal, status, species, origin.name, location.name, gender, image, id);
  }

  async createModalWindows(name, status, species, origin, location, gender, image, id) {
    this.imageContainer.textContent = '';
    this.CharacterName.textContent = '';
    this.CharacterStatus.textContent = '';
    this.CharacterSpecies.textContent = '';
    this.CharacterOrigin.textContent = '';
    this.CharacterLocation.textContent = '';
    this.CharacterGender.textContent = '';

    const imageModalWindow = this.builderModalWindows.createImageModalWindow(name, image);
    const CharacterName = this.builderModalWindows.createNameCharacter([{ prop: 'data-id', value: id }], name);
    const characterStatus = this.builderModalWindows.createStatusCharacter(status);
    const characterSpecies = this.builderModalWindows.createSpeciesCharacter(species);
    const CharacterOrigin = this.builderModalWindows.createOriginCharacter(origin);
    const characterLocation = this.builderModalWindows.createLocationCharacter(location);
    const characterGender = this.builderModalWindows.createGenderCharacter(gender);

    this.imageContainer.append(imageModalWindow);
    this.CharacterName.append(CharacterName);
    this.CharacterStatus.append(characterStatus);
    this.CharacterSpecies.append(characterSpecies);
    this.CharacterOrigin.append(CharacterOrigin);
    this.CharacterLocation.append(characterLocation);
    this.CharacterGender.append(characterGender);

    this.modalBack.style.left = '0%';
  }


  async onCloseButton() {
    this.modalBack.style.left = '-100%';

    this.imageContainer.textContent = '';
    this.CharacterName.textContent = '';
    this.CharacterStatus.textContent = '';
    this.CharacterSpecies.textContent = '';
    this.CharacterOrigin.textContent = '';
    this.CharacterLocation.textContent = '';
    this.CharacterGender.textContent = '';
  }

  async onLeftButton(event) {
    const modalWindow = event.target.closest('.outer-container');
    const modalWindowName = modalWindow.querySelector('.character-name');
    const modalWindowId = +modalWindowName.dataset.id;
    const previousId = modalWindowId - 1;

    if (previousId !== 0) {
      this.modalWindowRequest(previousId);
    }
  }

  async onRightButton(event) {
    const modalWindow = event.target.closest('.outer-container');
    const modalWindowName = modalWindow.querySelector('.character-name');
    const modalWindowId = +modalWindowName.dataset.id;
    const nextId = modalWindowId + 1;

    const lastCard = this.cardsContainer.lastElementChild;
    const lastCardName = lastCard.querySelector('.card-title');
    const lastCardId = +lastCardName.dataset.id;

    if (nextId < lastCardId + 1) {
      this.modalWindowRequest(nextId);
    }
  }
}
