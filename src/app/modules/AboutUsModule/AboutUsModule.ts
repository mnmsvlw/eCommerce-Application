import AboutUs from '../../components/AboutUs/AboutUs';
import Component from '../../components/Component';

export default class AboutUsModule extends Component {
  render = () => {
    this.content = new AboutUs().render();
    return this.content;
  };
}
