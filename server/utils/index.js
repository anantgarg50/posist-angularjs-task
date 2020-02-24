function calculateBillAmount(
  startTime,
  endTime,
  ratePerKilometer,
  hourlyRate,
  kmsTravelled
) {
  const DAILY_TIME_ALLOTTED = 8 * 60 * 60 * 1000;
  const DAILY_KMS_ALLOTTED = 250;

  const timeDiff = Number(new Date(endTime)) - Number(new Date(startTime));
  const daysBooked = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
  const totalAllowedHours = daysBooked * DAILY_TIME_ALLOTTED;
  const minChargeableKms = daysBooked * DAILY_KMS_ALLOTTED;

  const chargeableKms =
    kmsTravelled < minChargeableKms ? minChargeableKms : kmsTravelled;
  const extraChargeableHours = Math.ceil(
    (timeDiff - totalAllowedHours) / (60 * 60 * 1000)
  );

  let billAmount = chargeableKms * ratePerKilometer;
  billAmount +=
    extraChargeableHours > 0 ? extraChargeableHours * hourlyRate : 0;

  return billAmount;
};

module.exports = {
  calculateBillAmount
};