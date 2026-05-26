/*

    1. Create Booking ---> {POST} ---> bookingId
    2. Create a Token ---> {POST}
    3. Update Booking ---> {PUT}

*/

import { test, expect, request } from "@playwright/test";
import fs from 'fs';

//Utility function returns json file data
function readJson(filePath: string) {

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Update Booking - PUT Request', async ({ request }) => {

    // 1. Create the booking
    const requestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('/booking', { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();

    // Extracting BookingId from JSON Response Body 
    const responseBody = await createResponse.json();
    const bookingId = responseBody.bookingid;
    console.log("Booking Id : ", bookingId);

    // 2. Create Token
    const credentialsBody = readJson('testdata/credentials.json');
    const authResponse = await request.post('/auth', { data: credentialsBody });
    expect(authResponse.ok()).toBeTruthy();

    // Extract the Token
    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    console.log("Extracted Token : ", token);

    // 3. Update Request
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
    console.log(updateResponseBody);

    console.log("Booking Details Updated Successfully...")

});