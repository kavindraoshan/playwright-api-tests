/*

Test : Create Booking (POST)
Request type - POST
Request body - Static

*/

import { test, expect } from "@playwright/test"

test("Create Post Request using Static Body", async ({ request }) => {

    const requestBody = {
        firstname: "Timon",
        lastname: "Brown",
        totalprice: 1000,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-05-10",
            checkout: "2026-05-12"
        },
        additionalneeds: "Breakfast"
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
        firstname: "Timon",
        lastname: "Brown",
        totalprice: 1000,
        depositpaid: true,
        additionalneeds: "Breakfast"
    });

    //Validater Booking Dates
    expect(booking.bookingdates).toMatchObject({
        checkin: "2026-05-10",
        checkout: "2026-05-12"
    });

})