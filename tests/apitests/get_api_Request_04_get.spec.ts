import { test, expect, request } from "@playwright/test"

test("Get Booking Details by ID using Path Parameters", async ({ request }) => {

    const bookingId = 5; // using this as the path parameter for the request

    //Use backtick operator to parametarize the booking id for the URL as Path Parameters
    const response = await request.get(`/booking/${bookingId}`);

    //Parse the response and pring
    const responseBody = await response.json();
    console.log(responseBody);

    //Add Assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //Assert Response Body
    //expect(responseBody.firstname).toBe("Jim");

})

test("Get Booking Details by Name using Query Parameters", async ({ request }) => {

    const firstname = "Sally"; // using this as the Query parameter for the request
    const lastname = "Ericsson";

    //Use backtick operator to parametarize the booking id for the URL as Query Parameters
    const response = await request.get("booking", { params: { firstname, lastname } });

    //Parse the response and pring
    const responseBody = await response.json();
    console.log(responseBody);

    //Add Assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //Assert Response Body
    expect(responseBody.length).toBeGreaterThan(0);
    
    //Validation of Attribute, Data Type, Should not be Zero
    for(const item of responseBody)
    {
        expect(item).toHaveProperty("bookingid");
        expect(typeof(item.bookingid)).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }

})