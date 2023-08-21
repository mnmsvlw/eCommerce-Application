import ElementCreator from './ElementCreator';

describe('ElementCreator creates right element', () => {
  const element = new ElementCreator({
    tag: 'div',
    classNames: 'class',
    attributes: { attr: 'example' },
    text: 'Sample text',
  });

  const elementOneAttr = new ElementCreator({
    tag: 'div',
    attributes: { oneWordAttr: true },
  });

  it('should return DIV for a div element', () => {
    expect(element.getElement().tagName).toBe('DIV');
  });

  it('should return "class" as a class name', () => {
    expect(element.getElement().classList[0]).toBe('class');
  });

  it('should return "example" as a "attr" atribure', () => {
    expect(element.getElement().getAttribute('attr')).toBe('example');
  });

  it('should return "Sample text" as a textContent', () => {
    expect(element.getElement().textContent).toBe('Sample text');
  });

  it('should handle one-word attributes', () => {
    expect(elementOneAttr.getElement().getAttribute('oneWordAttr')).toBe('');
  });
});
