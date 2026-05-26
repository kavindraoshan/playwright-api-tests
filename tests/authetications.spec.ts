/*

1) No Auth (Public APIs)
2) Basic Auth / Preemptive Authentication (username & password)
3) Bearer Token
4) API Key Authetication

*/

import { test, expect, request } from "@playwright/test";
import {Buffer} from 'buffer';


// 1) No Auth 
test('Public api - No Authetication', async ({ request }) => {

    const respose = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    expect(respose.ok()).toBeTruthy();
    const responseBody = await respose.json();
    console.log(responseBody);
    
});

// 2) Basic Auth
test('Basic Authentication', async({request})=>{

    const response = await request.get("https://httpbin.org/basic-auth/user/pass", 
                                    {
                                        headers: 
                                        {
                                            Authorization : `Basic ` + Buffer.from('user:pass').toString('base64'),
                                        }
                                    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    console.log(await response.json());
});