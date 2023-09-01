import Button from '../../UI/Button';
import Container from '../../UI/Container';
import Heading from '../../UI/Heading';
import Input from '../../UI/Input';
import Label from '../../UI/Label';
import Component from '../Component';

export default class ProfilePersonalInfo extends Component {
  render = () => {
    this.content = new Container('wrapper-personal').render();
    this.content.classList.add('show');
    const header = new Heading(3, 'headerPage', 'Personal info').render();

    const formErrorFiers = new Container('errorFirstNew').render();
    const formErrorLast = new Container('errorLastNew').render();
    const formErrorDate = new Container('errorDateNew').render();

    const firstNameBox = new Container('first').render();
    const firstLabel = new Label('first', 'First name', 'label').render();
    const firstInput = new Input('first', 50, 'input-first', '', 'text').render();
    firstNameBox.append(firstLabel, firstInput, formErrorFiers);
    const svg1 = new Container('change-first').render();
    const boxForFirstName = new Container('form-personal').render();
    boxForFirstName.append(firstNameBox, svg1);

    const lastNameBox = new Container('last').render();
    const lastLabel = new Label('last', 'Last name', 'label').render();
    const lastInput = new Input('last', 50, 'input-last', '', 'text').render();
    lastNameBox.append(lastLabel, lastInput, formErrorLast);
    const svg2 = new Container('change-last').render();
    const boxForlastName = new Container('form-personal').render();
    boxForlastName.append(lastNameBox, svg2);

    const dateBox = new Container('date').render();
    const dateLabel = new Label('date', 'Date of birth', 'label').render();
    const dateInput = new Input('date', 0, 'input-date', '', 'date').render();
    dateBox.append(dateLabel, dateInput, formErrorDate);
    const svg3 = new Container('change-date').render();
    const boxForDate = new Container('form-personal').render();
    boxForDate.append(dateBox, svg3);

    const boxSave = new Container('save-i').render();
    const btnSave = new Button('Save', 'submit', 'save').render();
    boxSave.append(btnSave);
    boxSave.classList.add('hide');

    this.content.append(header, boxForFirstName, boxForlastName, boxForDate, boxSave);

    return this.content;
  };
}
