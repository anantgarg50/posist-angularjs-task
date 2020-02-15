import { EndedBookingsController } from './ended-bookings.controller';

const endedBookingsTemplate = require('!!html-loader!./ended-bookings.template.html');

export const EndedBookings: angular.IComponentOptions = {
  template: endedBookingsTemplate,
  controller: EndedBookingsController
};

export default EndedBookings;