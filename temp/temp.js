// // Don't know how to account for when reservation starts earlier and ends later than doubleBooking
// check('startDate').custom(async (value, { req }) => {
//   value = value + 'T00:00:00.000Z'
//   const doubleBooking = await Booking.findOne({
//     where: {
//       spotId: req.params.spotId,
//       // Different types, seems like it should not work
//       startDate: {[Op.lte]: value},
//       endDate: {[Op.gte]: value}
//     }
//   });
//   if (doubleBooking) {
//     throw new Error('Start date conflicts with an existing booking');
//   }
// })

// // Random attempts to check for conflicts
// check('startDate').custom(async (value, { req }) => {
//   const startDate = new Date(new Date(value).toDateString()).getTime();
//   const today = new Date(new Date().toDateString()).getTime();
  // if (startDate < today) {
  //   throw new Error('startDate cannot be in the past');
  // }

  // Fix the error format (maybe call next(err))

//   value = value + 'T00:00:00.000Z';

//   const doubleBooking = await Booking.findOne({
//     where: {
//       spotId: req.params.spotId,
//       startDate: {[Op.lte]: value},
//       endDate: {[Op.gt]: value}
//     }
//   });
//   console.log('teeeeeeeeeeeeeeeeeeeest');
//   console.log(typeof value, value);
//   console.log(typeof doubleBooking.startDate, doubleBooking.startDate);
//   console.log(value == doubleBooking.startDate);
//   console.log(value === doubleBooking.startDate);
//   // console.log(doubleBooking.endDate);
//   if (doubleBooking) {
//     throw new Error('Start date conflicts with an existing booking');
//   }
// }),

// const endDate = new Date(new Date(value).toDateString()).getTime();
// const startDate = new Date(new Date(req.body.startDate).toDateString()).getTime();
