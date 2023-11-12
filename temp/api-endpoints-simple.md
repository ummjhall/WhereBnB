# `WhereBnB`

## Database Schema Design

`<insert database schema design here>`

## API Documentation

## USERS

### Get the Current User

* Request
  * Method: GET
  * URL: /api/profile

### Log In a User

* Request
  * Method: POST
  * URL: /api/login

### Sign Up a User

* Request
  * Method: POST
  * URL: /api/signup


## SPOTS

### Get all Spots

* Request
  * Method: GET
  * URL: /api/spots

### Get all Spots owned by the Current User

* Request
  * Method: GET
  * URL: /api/profile/spots

### Get details of a Spot from an id

* Request
  * Method: GET
  * URL: /api/spots/:spotId

### Create a Spot

* Request
  * Method: POST
  * URL: /api/spots

### Add an Image to a Spot based on the Spot's id

* Request
  * Method: POST
  * URL: /api/spots/:spotId/images

### Edit a Spot

* Request
  * Method: PUT
  * URL: /api/spots/:spotId

### Delete a Spot

* Request
  * Method: DELETE
  * URL: /api/spots/:spotId


## REVIEWS

### Get all Reviews of the Current User

* Request
  * Method: GET
  * URL: /api/profile/reviews

### Get all Reviews by a Spot's id

* Request
  * Method: GET
  * URL: /api/spots/:spotId/reviews

### Create a Review for a Spot based on the Spot's id

* Request
  * Method: POST
  * URL: /api/spots/:spotId/reviews

### Add an Image to a Review based on the Review's id

* Request
  * Method: POST
  * URL: /api/reviews/:reviewId/images

### Edit a Review

* Request
  * Method: PUT
  * URL: /api/reviews/:reviewId

### Delete a Review

* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId


## BOOKINGS

### Get all of the Current User's Bookings

* Request
  * Method: GET
  * URL: /api/profile/bookings

### Get all Bookings for a Spot based on the Spot's id

* Request
  * Method: GET
  * URL: /api/spots/:spotId/bookings

### Create a Booking for a Spot based on the Spot's id

* Request
  * Method: POST
  * URL: /api/spots/:spotId/bookings

### Edit a Booking

* Request
  * Method: PUT
  * URL: /api/bookings/:bookingId

### Delete a Booking

* Request
  * Method: DELETE
  * URL: /api/bookings/:bookingId


## IMAGES

### Delete a Spot Image

* Request
  * Method: DELETE
  * URL: /api/images/:imageId

### Delete a Review Image

* Request
  * Method: DELETE
  * URL: /api/images/:imageId

## Add Query Filters to Get All Spots

* Request
  * Method: GET
  * URL: /api/spots
