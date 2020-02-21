import { RegisterController } from './register.controller';

const registerTemplate = require('!!html-loader!./register.template.html');

export const Register: angular.IComponentOptions = {
  template: registerTemplate,
  controller: RegisterController
};

export default Register;