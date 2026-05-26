/*

    1. Create Booking ---> {POST} ---> bookingId
    2. Create a Token ---> {POST}
    3. Partial Update Booking ---> {Patch}

*/

import { test, expect, request } from "@playwright/test";
import fs from 'fs';

//Utility function returns json file data
function readJson(filePath: string) {

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Partial Update Booking - PATCH Request', async ({ request }) => {

    // 1. Create the booking
    const requestBody = readJson('testdata/post_request_body.json');
    const createResponse = await request.post('/booking', { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();

    // Extracting BookingId from JSON Response Body 
    const responseBody = await createResponse.json();
    console.log(responseBody);
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

    // 3. Partial Update Request with PATCH
    const patchRequestBody = readJson('testdata/patch_request_body.json');
    const partialUpdateResponse = await request.patch(`/booking/${bookingId}`,
                                        {
                                            headers: { "Cookie": `token=${token}` },
                                            data: patchRequestBody
                                        }
                                    );

    expect(partialUpdateResponse.ok()).toBeTruthy();
    expect(partialUpdateResponse.status()).toBe(200);

    const partialUpdateResponseBody = await partialUpdateResponse.json();
    console.log(partialUpdateResponseBody);

    console.log("Booking Details Partially Updated Successfully...")

});