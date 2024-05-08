import Axios from 'axios';
import {TOKENS} from './tokens';

export const axios = Axios.create({baseURL: TOKENS.BASE_URL});
