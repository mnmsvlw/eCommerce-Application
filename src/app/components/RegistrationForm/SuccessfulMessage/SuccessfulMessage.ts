import Container from '../../../UI/Container';
import ElementCreator from '../../../utils/ElementCreator';
import Component from '../../Component';
import './SuccessfulMessage.css';

export default class SuccessfulMessage extends Component {
  render = () => {
    this.content = new Container('message-cover').render();
    const messageContainer = new Container('message-container-success').render();

    const messageHeader = new ElementCreator({
      tag: 'h2',
      classNames: 'message-header',
      text: 'Registration successful!',
    }).getElement();

    messageContainer.append(messageHeader);

    this.content.append(messageContainer);
    return this.content;
  };
}
