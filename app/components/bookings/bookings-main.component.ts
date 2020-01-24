import { BookingsMainController } from './bookings-main.controller';

const bookingsMainTemplate = require('!!html-loader!./bookings-main.template.html');

export const BookingsMain: angular.IComponentOptions = {
  template: bookingsMainTemplate,
  controller: BookingsMainController
};

export default BookingsMain;