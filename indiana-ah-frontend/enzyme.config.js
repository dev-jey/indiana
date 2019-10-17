import register from 'ignore-styles';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

register(['.css', '.sass', '.scss']);

configure({ adapter: new Adapter() });
