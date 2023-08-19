import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Link from '../../UI/Link';
import Component from '../Component';
import './NotFound.css';

export default class NotFound extends Component {
  render = () => {
    this.content = new Container('wrapperNotFound').render();
    // const container = new Container('error-box').render();
    const headerNum = new Heading(1, 'text-num', '404').render();
    const headerText = new Heading(3, 'text-text', 'Page Not Found !').render();
    const btnHome = new Link('/', 'btnHome', 'Back to home').render();
    this.content.append(headerNum, headerText, btnHome);
    return this.content;
  };
}
