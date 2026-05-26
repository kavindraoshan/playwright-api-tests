/*

Test : Create Booking (POST)
Request type - POST
Request body - Dynamic Data with Faker Library

Pre-requistes :
    * Install faker-js Libray
* Install luxon library to generate dates

*/

import { test, expect, request } from "@playwright/test"
import { faker, Faker } from "@faker-js/faker";
import { DateTime } from 'luxon';

test("Create Post Request using Dynamic Data", async ({ request }) => {

    //Data Generation using faker libray
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({min: 100, max: 5000});
    const depositPaid = faker.datatype.boolean();
    const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkOutDate = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");
    const additionalNeeds = faker.book.title();

    //Read data from JSON File
    const jsonFile = "testdata/post_request_body.json";
    const requestBody = {
        firstname: firstName,
        lastname: lastName,
        totalprice: totalPrice,
        depositpaid: depositPaid,
        bookingdates: {
            checkin: checkInDate,
            checkout: checkOutDate
        },
        additionalneeds: additionalNeeds
    }

    //Send Request (BaseURL is added in playwright.config.ts file)
    const response = await request.post("/booking", { data: requestBody });

    //Print the Response (Header, Response Body, Cookies, Status Code and everything in the output)
    const responseAll = response;

    //Print only Response Body
    const responseBody = await response.json();
    console.log(responseBody);

    //Validate Status Code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //Extract the booking Id and validate in the response and Attributes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    //Validating Booking Details
    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname: booking.firstname,
        lastname: booking.lastname,
        totalprice: booking.totalprice,
        depositpaid: booking.depositpaid,
        additionalneeds: booking.additionalneeds,
    });

    //Validater Booking Dates
    expect(booking.bookingdates).toMatchObject({
        checkin: booking.bookingdates.checkin,
        checkout: booking.bookingdates.checkout,
    });

});
