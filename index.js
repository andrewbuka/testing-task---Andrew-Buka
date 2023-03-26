const cards = new Cards(document.querySelector('.container-limiter'), new DomBuilderCards());
const modalWindow = new ModalWindow(document.querySelector('.container-limiter'), new DomBuilderModalWindows());
const scroll = new Scroll(document.querySelector('.container-limiter'), new DomBuilderCards());

cards.getCards();
scroll.appearToTop();

cards.modalWindowRequest = modalWindow.modalWindowRequest.bind(modalWindow);
scroll.modalWindowRequest = modalWindow.modalWindowRequest.bind(modalWindow);