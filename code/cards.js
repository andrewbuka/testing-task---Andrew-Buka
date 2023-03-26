class Cards {
  constructor(cardsContainer, builderCards) {
    this.cardsContainer = cardsContainer;
    this.builderCards = builderCards;    

    this.getIdCard = this.getIdCard.bind(this);

    this.loader = document.querySelector('.loader-content');
    this.body = document.querySelector('.body');

    window.addEventListener('load', () => {
      this.loader.classList.add('none');
      this.body.classList.remove('scroll');
    });
  }

  async getCards() {
    let counter = 1;
    let cardsArray = [];

    try {
      const data = await fetch('https://rickandmortyapi.com/api/character');
      const cards = await data.json();
      const pagesCount = +cards.info.pages;

      while (counter < pagesCount + 1) {
        const dataPage = await this.getCard(counter);
        cardsArray.push(...dataPage.results);
        counter++;
      }  

      this.getVariables(cards.results);
    } catch (error) {
        alert('try again');
      }
  }
  
  async getCard(counter) {
    try {
      const data = await fetch(`https://rickandmortyapi.com/api/character/?pages=${counter}`);
      const pageData = data.json();
      return pageData;
    } catch (error) {
        alert('try again');
      }
  }

  async getVariables(cards) {
    await cards.forEach(card => {
      const {id, name, image} = card;
     
      this.createCards(id, name, image);
    });
  }

  async createCards(id, name, image) {
    const titleCard = this.builderCards.createTitleCard([{ prop: 'data-id', value: id }], name, [{ event: 'click', handler: this.getIdCard,}]);
    const imageCard = this.builderCards.createImageCard(name, image, [{ event: 'click', handler: this.getIdCard, }]);
    const imageContainer = this.builderCards.createImageContainer([imageCard]);
    const titleImageContainer = this.builderCards.createTitleImageContainer([imageContainer, titleCard]);
    const cardContainer = this.builderCards.createCardContainer([titleImageContainer]);
    
    this.cardsContainer.append(cardContainer);
  }

  async getIdCard(event) {
    const card = event.target.closest('.card-container');
    console.log('CARD', card);

    const CardName = card.querySelector('.card-title');
    const cardId = +CardName.dataset.id;

    console.log('Name', CardName.textContent, cardId);
    this.modalWindowRequest(cardId);
  }
}
