import 'dotenv/config';
const request = require('supertest');
import config from "../../src/config";
import appManager from "../../src/app";
const app = appManager.setup(config);

describe('It Should be return Chat Group Details', () => {

    it("Should return Group Details on GET /", async () => {
        const response = await request(app).get("/api/chat/group/get_details?chat_group_id=1").set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJVdGlsaXplY29yZSBDb2RpbmcgUm91bmQiLCJzdWIiOjQsImlhdCI6MTY3MTk0OTQxMjEyMSwiZXhwIjoxNjcxOTUxMjEyMTIxfQ.H2ySwTGaLBLKDKR-WNstjhB02VSabT1eBRe5kaxmA_w');
        expect(response.statusCode).toBe(200);
    })
})
