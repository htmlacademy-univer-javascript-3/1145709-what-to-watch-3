import {ErrorDetailsMessage} from '../types/response-error-type.ts';

export const authError: ErrorDetailsMessage = {
  errorType: 'errorType',
  message: 'message',
  details: [{
    property: 'name',
    value: 'Semen',
    messages: ['invalid name entered']
  },{
    property: 'password',
    value: '12',
    messages: ['password length can\'t be less than 3']
  }]
};
