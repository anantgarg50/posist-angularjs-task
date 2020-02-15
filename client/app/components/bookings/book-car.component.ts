import { BookCarController } from './book-car.controller';

const bookCarTemplate = require('!!html-loader!./book-car.template.html');

export const BookCar: angular.IComponentOptions = {
  template: bookCarTemplate,
  controller: BookCarController
};

export default BookCar;