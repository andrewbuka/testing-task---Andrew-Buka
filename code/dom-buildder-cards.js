class DomBuilderCards {
  createTitleCard(attributes, name, handlers) {
    return this.createElement({
      tag: 'h4',
      classList: ['card-title'],
      textContent: name,
      handlers,
      attributes,
    });
  }

  createImageCard(name, image, handlers) {
    return this.createElement({
      tag: 'img',
      classList: ['card-image'],
      textContent: name,
      attributes: [
        { prop: 'src', value: image},
        { prop: 'alt', value: name },
      ],
      handlers,
    });
  }

  createImageContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['image-container'],
      children,
      childrenAction: 'append',
    });
  }

  createTitleImageContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['title-image-container'],
      children,
      childrenAction: 'append',
    });
  }

  createCardContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['card-container'],
      children,
      childrenAction: 'append',
    });
  }

  createNumberButtons(counter, handlers) {
    return this.createElement({
      tag: 'button',
      classList: ['button-to'],
      textContent: counter,
      handlers,
    });
  }

  createElement({
    tag,
    classList,
    attributes,
    textContent,
    handlers,
    children,
    childrenAction,
  }) {
    const element = document.createElement(tag);

    if (classList?.length) {
      element.classList.add(...classList);
    }

    if (attributes?.length) {
      attributes.forEach(({ prop, value }) => {
        element.setAttribute(prop, value);
      });
    }

    if (textContent) {
      element.textContent = textContent;
    }

    if (handlers?.length) {
      handlers.forEach(({ event, handler }) => {
        element.addEventListener(event, handler);
      });
    }

    if (children) {
      element[childrenAction](...children);
    }

    return element;
  }
}
