import 'dotenv/config';
const request = require('supertest');
import config from "../../../config";
import appManager from "../../../app";
const app = appManager.setup(config);

describe("User Sign Up and User details API tests ", () => {
    it("should respond with an array of list User GET /", async () => {
        const response = await request(app).get("/api/users/get_details?start_page=1");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object))

    });

    it("Should Sign up user with POST/ ", async () => {
        const signUpRequestBody = {
            'name': 'ganesh2',
            'email_id': 'ganesh2@gmail.com'
        };
        const response = await request(app).post('/api/users/sign_up').send(signUpRequestBody);
        expect(response.statusCode).toBe(200);
        expect(response.body.type).toBeDefined();
        expect(response.body.type).toEqual("success");
    })
});
