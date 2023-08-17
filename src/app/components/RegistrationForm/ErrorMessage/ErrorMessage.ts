import Container from '../../../UI/Container';
import ElementCreator from '../../../utils/ElementCreator';
import Component from '../../Component';
import './ErrorMessage.css';

export default class ErrorMessage extends Component {
  render = (message: string) => {
    this.content = new Container('message-cover').render();
    const messageContainer = new Container('message-container').render();

    const messageHeader = new ElementCreator({
      tag: 'h2',
      classNames: 'message-header__error',
      text: message,
    }).getElement();

    messageContainer.append(messageHeader);

    this.content.append(messageContainer);
    return this.content;
  };
}
