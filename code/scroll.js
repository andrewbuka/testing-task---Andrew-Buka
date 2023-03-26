class Scroll extends Cards{
  constructor(cards, builderCards) {
    super(cards, builderCards);
    this.builderCards = builderCards;
    this.cards = cards;

    this.toTopButton = document.querySelector('.to-top');
    this.pageHead = document.querySelector('.header');

    this.lastCard = this.cards.lastElementChild;
    this.appearToTop = this.appearToTop.bind(this);
    window.addEventListener('scroll', this.appearToTop.bind(this));
    this.toTopButton.addEventListener('click', this.onToTop.bind(this));

    this.page = 2;
  }

  appearToTop() {
    let height = this.cards.offsetHeight;  
    let height2 = this.offset(this.lastCard).top;
    let height3 = window.innerHeight;
    let height4 = height - height3;

    if (height2 > 200) {
      this.toTopButton.style.transform = 'scale(1)';
    } else {
      this.toTopButton.style.transform = 'scale(0)';
    }

    if (height2 === height4+170) {
      this.addCards(this.page);
      this.page = this.page+1;
    }
  }

  offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageXOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  async addCards(page) {
    const nextPage = await this.getCard(page);
    this.getVariables(nextPage.results);
  }

  async getCard(page) {
    try {
      const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const pageData = await data.json();
      console.log('!!!!!!!!!', pageData);
      return pageData;      
    } catch (error) {
      alert('try again');
    }
  }

  async onToTop() {
    const elementPosition = this.pageHead.getBoundingClientRect().top;
    window.scrollBy({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}
