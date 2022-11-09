/* import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mokedUser2, mockedUserLogin, mockedTeam, mockedRequest, mockedRequestInvalidTeamId, mockedRequestInvalidPosition} from "../../mocks/requests/index"


describe("/requests", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mokedUser2)
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        await request(app).post('/team').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedTeam)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /requests -  Must be able to create a requests",async () => {
      
        const teams = await request(app).get('/teams')
        const loginResponse = await request(app).post("/login").send(mokedUser2);
        mockedRequest.teamId = teams.body[0].id
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedRequest)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("position")
        expect(response.body).toHaveProperty("teamId")
        expect(response.body).toHaveProperty("userId")
        expect(response.status).toBe(201)
     
    })


    test("POST /requests -  should not be able to create requests without authentication",async () => {
        const teams = await request(app).get('/teams')
        mockedRequest.teamId = teams.body[0].id
        const response = await request(app).post('/requests').send(mockedRequest)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /requests -  should not be able to create requests with invalid teamId",async () => { 
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedRequestInvalidTeamId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("POST /requests -  should not be able to create requests with invalid position",async () => { 
        const loginResponse = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedRequestInvalidPosition)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("GET /requests -  Must be able to list all requests",async () => {
        const response = await request(app).get('/requests')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

}) 
*/
