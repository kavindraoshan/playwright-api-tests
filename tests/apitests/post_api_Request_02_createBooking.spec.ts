/*

Test : Create Booking (POST)
Request type - POST
Request body - External Json File

*/

import { test, expect, request } from "@playwright/test"
import fs from 'fs'

test("Create Post Request from JSON File", async ({ request }) => {

    //Read data from JSON File
    const jsonFile = "testdata/post_request_body.json";
    const requestBody = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

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
