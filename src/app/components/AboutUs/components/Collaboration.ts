import Container from '../../../UI/Container';
import Component from '../../Component';
import './Collaboration.css';

export default class Collaboration extends Component {
  render = () => {
    const text =
      'Some text here ...Some text here ... Some text here ... Some text here ... Some text here ... Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ... Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...vvvvSome text here ...vSome text here ... Some text here ...vvSome text here ...vvvvSome text here ...Some text here ...v v v Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...';
    this.content = new Container('collaboration-wrapper', text).render();

    return this.content;
  };
}
