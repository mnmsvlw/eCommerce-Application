import { Person } from '../../../../types/personTypes';
import Container from '../../../UI/Container';
import Link from '../../../UI/Link';
import Component from '../../Component';
import './OurTeam.css';

export default class OurTeam extends Component {
  render = (person: Person) => {
    this.content = new Container('ourTeam-wrapper').render();

    const imgBox = new Container('imgBox').render();
    const img = new Container('fotoPerson').render();
    imgBox.append(img);
    const infoBox = new Container('infoBox-wrapp').render();
    const name = new Container('name-person', person.name).render();
    const role = new Container('role-person', person.role).render();
    infoBox.append(name, role);
    const bioBox = new Container('bioBox-wrapp').render();
    const bio = new Container('bio-person', person.biography).render();
    const linkBox = new Container('linkBox').render();
    const linkGit = new Link(person.gitLink, 'gitLink').render();
    const iconGit = new Container('iconGit').render();
    linkGit.append(iconGit);
    const linkIn = new Link(person.inLink, 'inLink').render();
    const iconIn = new Container('iconIn').render();
    linkIn.append(iconIn);
    linkBox.append(linkGit, linkIn);
    bioBox.append(bio, linkBox);
    this.content.append(imgBox, infoBox, bioBox);

    return this.content;
  };
}
