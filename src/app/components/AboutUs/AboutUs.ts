import Container from '../../UI/Container';
import { Katerina, Viktoriya, Vladimir } from './components/personData';
import Component from '../Component';
import HeaderAboutUs from './components/HeaderAboutUs';
import OurTeam from './components/OurTeam';
import './AboutUs.css';
import Contribution from './components/Contribution';
import Collaboration from './components/Collaboration';
import Link from '../../UI/Link';

export default class AboutUs extends Component {
  render = () => {
    this.content = new Container('about-us-wrapp').render();

    const ourTeam = new Container('team').render();
    const titleOur = new HeaderAboutUs().render('Our team');
    const boxTeam = new Container('boxTeam').render();
    const vika = new OurTeam().render(Viktoriya);
    vika.querySelector('.fotoPerson')?.classList.add('vika');
    const kate = new OurTeam().render(Katerina);
    kate.querySelector('.fotoPerson')?.classList.add('kat');
    const vova = new OurTeam().render(Vladimir);
    vova.querySelector('.fotoPerson')?.classList.add('vova');
    boxTeam.append(kate, vova, vika);
    ourTeam.append(titleOur, boxTeam);

    const contribution = new Container('contribution').render();
    const titleContribution = new HeaderAboutUs().render('Contribution');
    const boxContribution = new Container('boxContribution').render();
    const vikaSmall = new Contribution().render(Viktoriya);
    vikaSmall.querySelector('.foto-con')?.classList.add('vika');
    const kateSmall = new Contribution().render(Katerina);
    kateSmall.querySelector('.foto-con')?.classList.add('kat');
    const vovaSmall = new Contribution().render(Vladimir);
    vovaSmall.querySelector('.foto-con')?.classList.add('vova');
    boxContribution.append(kateSmall, vovaSmall, vikaSmall);
    contribution.append(titleContribution, boxContribution);

    const collaboration = new Container('collaboration').render();
    const titleCollaboration = new HeaderAboutUs().render('Collaboration');
    const boxCollaboration = new Collaboration().render();
    collaboration.append(titleCollaboration, boxCollaboration);

    const linkBox = new Container('linkBoxRs').render();
    const linkRS = new Link('https://rs.school/', 'rsLink').render();
    const iconRS = new Container('iconRs').render();
    linkRS.append(iconRS);
    linkBox.append(linkRS);

    this.content.append(ourTeam, contribution, collaboration, linkBox);
    return this.content;
  };
}
