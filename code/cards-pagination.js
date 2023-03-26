class Cards {
  constructor(cardsContainer, builderCards) {
    this.cardsContainer = cardsContainer;
    this.builderCards = builderCards;

    this.getIdCard = this.getIdCard.bind(this);

    this.numbersButtons = document.querySelector('.buttons-limiter');
    this.leftArrow = document.querySelector('.left-arrow-pagination');
    this.rightArrow = document.querySelector('.right-arrow-pagination');

    this.leftArrow.addEventListener('click', this.onLeftArrow.bind(this));
    this.rightArrow.addEventListener('click', this.onRightArrow.bind(this));

    this.onButtonNumber = this.onButtonNumber.bind(this);

    this.moving = 0;

    this.loader = document.querySelector('.loader-content');
    this.body = document.querySelector('.body');

    window.addEventListener('load', () => {
      console.log('sdgjsdgljsgklj')
      this.loader.classList.add('none');
      this.body.classList.remove('scroll');
    });   
  }

  async getCards() {
    try {
      const data = await fetch('https://rickandmortyapi.com/api/character')
      const cards = await data.json();
      const pagesAmount = +cards.info.pages;

      this.getVariables(cards.results);
      this.createNumberButtons(pagesAmount);
    } catch (error) {
      alert('try again');
    }
  }

  async getCard(counter) {
    try {
      const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${counter}`);
      const pageData = await data.json();
      this.getVariables(pageData.results)
    } catch (error) {
      alert('try again');
      
    }
  }

  async getVariables(cards) {
    await cards.forEach(card => {
      const { id, name, image } = card;
      this.createCards(id, name, image);  
    });
  }

  async createCards(id, name, image) {
    const titleCard = this.builderCards.createTitleCard([{ prop: 'data-id', value: id }], name, [{ event: 'click', handler: this.getIdCard, }]);
    const imageCard = this.builderCards.createImageCard(name, image, [{ event: 'click', handler: this.getIdCard, }]);
    const imageContainer = this.builderCards.createImageContainer([imageCard]);
    const titleImageContainer = this.builderCards.createTitleImageContainer([imageContainer, titleCard]);
    const cardContainer = this.builderCards.createCardContainer([titleImageContainer]);

    this.cardsContainer.append(cardContainer);
  }

  async getIdCard(event) {
    const card = event.target.closest('.card-container');
    const CardName = card.querySelector('.card-title');
    const cardId = +CardName.dataset.id;

    this.modalWindowRequest(cardId);
  }

  createNumberButtons(pagesAmount) {
    let counter = 1;
    while(counter !== pagesAmount) {
      const numberButton = this.builderCards.createNumberButtons(counter, [{ event: 'click', handler: this.onButtonNumber, }]);
      this.numbersButtons.append(numberButton)
      counter++;
    }
  }

   onButtonNumber(event) {
    const button = event.target;
    const pageNumber = +button.textContent;
    const cards = this.cardsContainer.querySelectorAll('.card-container');

     cards.forEach(card => {
      card.remove();
    });  

     this.getCard(pageNumber);
   }

  onLeftArrow() {
    if (this.numbersButtons.style.left === '0px') {
      this.moving = 0;
      return;
    }
    this.moving += 100;

    this.numbersButtons.style.left = this.moving + 'px';
  }

  onRightArrow() {
    if (this.numbersButtons.style.left === '-1200px') {
      return;
    }

    this.moving -= 100;
    console.log('MOVING', this.moving);

    this.numbersButtons.style.left = this.moving + 'px';
  }
}
