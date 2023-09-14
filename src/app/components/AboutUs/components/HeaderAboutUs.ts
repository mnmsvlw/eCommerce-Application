import Container from '../../../UI/Container';
import Component from '../../Component';
import './Collaboration.css';
import './HeaderAboutUs.css';

export default class HeaderAboutUs extends Component {
  render = (title: string) => {
    this.content = new Container('titleBox-about').render();
    const text = new Container('title-about', title).render();
    const img = new Container('underlining').render();

    this.content.append(text, img);
    return this.content;
  };
}
