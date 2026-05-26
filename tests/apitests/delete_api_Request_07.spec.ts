/*

    1. Create new booking
    2. Get Booking
    3. Update Booking (Token needed)
    4. Delete Booking (Token needed)

*/

import { test, expect, request } from '@playwright/test';
import fs from 'fs';

//Utility function to read JSON
function readJson(filePath: string) {

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Delete Request', async ({ request }) => {

    // 1. Create new booking using POST
    const postRequestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('/booking', { data: postRequestBody });
    expect(createResponse.ok()).toBeTruthy();

    // Extracting BookingId from JSON Response Body 
    const responseBody = await createResponse.json();
    console.log(responseBody);
    const bookingId = responseBody.bookingid;
    console.log("Booking Id => ", bookingId);
    console.log("Booking is created.........");

    // 2. Get Booking Details
    const getBookingResponse = await request.get(`/booking/${bookingId}`);
    const getResponseBody = await getBookingResponse.json();
    console.log("Booking details.....");
    console.log(getResponseBody);

    // 3. Create Token
    const credentialsBody = readJson('testdata/credentials.json');
    const authResponse = await request.post('/auth', { data: credentialsBody });
    expect(authResponse.ok()).toBeTruthy();

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    console.log("Extracted Token => ", token);

    // 4. Update Request
    const updateRequestBody = readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingId}`,
                                            {
                                                headers: { "Cookie": `token=${token}` },
                                                data: updateRequestBody
                                            }
                                        );
    
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    
    const updateResponseBody = await updateResponse.json();
    console.log("Booking Details Updated Successfully...");
    console.log(updateResponseBody);

    // 5. Delete the Booking Id
    const deleteResponse = await request.delete(`/booking/${bookingId}`,
                                            {
                                                headers: {"Cookie": `token=${token}`},
                                            }
                                        );
        
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201);
    console.log("Booking Details Deleted Successfully......")

})


