import { reducer as form } from 'redux-form';
import adverts from './adverts';
import placements from './placements';
import user from './user';

const reducers = { adverts, placements, user, form };

export default reducers;
