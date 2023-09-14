import { Person } from '../../../../types/personTypes';
import Container from '../../../UI/Container';
import Component from '../../Component';
import './Contribution.css';

export default class Contribution extends Component {
  render = (person: Person) => {
    this.content = new Container('contribution-wrapper').render();
    const imgBox = new Container('imgBox-contribution').render();
    const img = new Container('foto-con').render();
    imgBox.append(img);
    const infoBox = new Container('infoBox-contribution').render();
    const info = new Container('info-contribution', person.contribution).render();
    infoBox.append(info);
    this.content.append(infoBox, imgBox);

    return this.content;
  };
}
