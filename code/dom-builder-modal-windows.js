class DomBuilderModalWindows {
  createImageModalWindow(name, image) {
    return this.createElement({
      tag: 'img',
      classList: ['modal-window-image'],
      textContent: name,
      attributes: [
        { prop: 'src', value: image },
        { prop: 'alt', value: name },
      ],
    });
  }

  createImageBackground() {
    return this.createElement({
      tag: 'div',
      classList: ['image-back'],
    });
  }

  createImageContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['modal-window-image-container'],
      children,
      childrenAction: 'append',
    });
  }

  createPositionName() {
    return this.createElement({
      tag: 'h4',
      classList: ['position'],
      textContent: 'Name:',
    });
  }

  createNameCharacter(attributes, name) {
    return this.createElement({
      tag: 'p',
      classList: ['describe-character', 'character-name'],
      textContent: name,
      attributes,
    });
  }

  createNameContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['character-container'],
      children,
      childrenAction: 'append',
    });
  }

  createPositionStatus() {
    return this.createElement({
      tag: 'h4',
      classList: ['position'],
      textContent: 'Status:',
    });
  }

  createStatusCharacter(status) {
    return this.createElement({
      tag: 'p',
      classList: ['describe-character', 'character-status'],
      textContent: status,
    });
  }

  createStatusContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['character-container'],
      children,
      childrenAction: 'append',
    });
  }

  createPositionSpecies() {
    return this.createElement({
      tag: 'h4',
      classList: ['position'],
      textContent: 'Species:',
    });
  }

  createSpeciesCharacter(species) {
    return this.createElement({
      tag: 'p',
      classList: ['describe-character', 'character-species'],
      textContent: species,
    });
  }

  createSpeciesContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['character-container'],
      children,
      childrenAction: 'append',
    });
  }

  createLeftDescribeContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['left-describe-container'],
      children,
      childrenAction: 'append',
    });
  }

  createPositionOrigin() {
    return this.createElement({
      tag: 'h4',
      classList: ['position'],
      textContent: 'Origin:',
    });
  }

  createOriginCharacter(origin) {
    return this.createElement({
      tag: 'p',
      classList: ['describe-character', 'character-origin'],
      textContent: origin,
    });
  }

  createOriginContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['character-container'],
      children,
      childrenAction: 'append',
    });
  }

  createPositionLocation() {
    return this.createElement({
      tag: 'h4',
      classList: ['position'],
      textContent: 'Location:',
    });
  }

  createLocationCharacter(location) {
    return this.createElement({
      tag: 'p',
      classList: ['describe-character', 'character-location'],
      textContent: location,
    });
  }

  createLocationContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['character-container'],
      children,
      childrenAction: 'append',
    });
  }

  createPositionGender() {
    return this.createElement({
      tag: 'h4',
      classList: ['position'],
      textContent: 'Gender:',
    });
  }

  createGenderCharacter(gender) {
    return this.createElement({
      tag: 'p',
      classList: ['describe-character', 'character-gender'],
      textContent: gender,
    });
  }

  createGenderContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['character-container'],
      children,
      childrenAction: 'append',
    });
  }

  createRightDescribeContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['right-describe-container'],
      children,
      childrenAction: 'append',
    });
  }

  createCommonDescribingContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['common-describing-container'],
      children,
      childrenAction: 'append',
    });
  }
  
  createInnerModalWindowContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['modal-window'],
      children,
      childrenAction: 'append',
    });
  }

  createOuterModalWindowContainer(children) {
    return this.createElement({
      tag: 'div',
      classList: ['outer-container'],
      children,
      childrenAction: 'append',
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
