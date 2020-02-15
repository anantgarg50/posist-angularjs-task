import { LoginController } from './login.controller';

const loginTemplate = require('!!html-loader!./login.template.html');

export const Login: angular.IComponentOptions = {
  template: loginTemplate,
  controller: LoginController
};

export default Login;