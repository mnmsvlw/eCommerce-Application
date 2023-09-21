import Container from '../../../UI/Container';
import Component from '../../Component';
import './Collaboration.css';

export default class Collaboration extends Component {
  render = () => {
    const text =
      '  In our collaborative journey, we implemented a well-structured approach to ensure effective teamwork and project success.';
    this.content = new Container('collaboration-wrapper', text).render();
    const box1 = new Container('collaborationText', '  This involved:').render();
    const box2 = new Container(
      'collaborationText',
      '• Organizing regular pre-sprint meetings for task allocation.'
    ).render();
    const box3 = new Container('collaborationText', '• Utilizing GitHub Projects to track task statuses.').render();
    const box4 = new Container(
      'collaborationText',
      '• Conducting collaborative code reviews for every pull request.'
    ).render();
    const box5 = new Container(
      'collaborationText',
      '• Addressing challenges collectively through joint problem-solving efforts.'
    ).render();
    const box6 = new Container(
      'collaborationText',
      `• Leveraging sprint retrospectives to gather insights and enhance subsequent sprints,ultimately leading to our project's successful outcome.`
    ).render();

    this.content.append(box1, box2, box3, box4, box5, box6);
    return this.content;
  };
}
