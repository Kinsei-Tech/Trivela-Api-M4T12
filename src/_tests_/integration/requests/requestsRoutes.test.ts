import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedUser, mockedAdmin, mockedAdminLogin, mockedTeam, mockedRequest, mockedRequestInvalidTeamId, mockedRequestInvalidPosition, mockedUserLogin} from "../../mocks"


describe("/requests", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users').send(mockedUser)
        await request(app).post('/users').send(mockedAdmin)
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        await request(app).post('/team').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedTeam)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /requests -  Must be able to create a requests",async () => {
      
        const teams = await request(app).get('/teams')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        mockedRequest.teamId = teams.body[0].id
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedRequest)

        expect(response.body).toHaveRequest("id")
        expect(response.body).toHaveRequest("status")
        expect(response.body).toHaveRequest("position")
        expect(response.body).toHaveRequest("teamId")
        expect(response.body).toHaveRequest("userId")
        expect(response.status).toBe(201)
     
    })

    test("POST /requests -  should not be able to create requests that already exists",async () => {
      
        const teams = await request(app).get('/teams')
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        mockedRequest.teamId = teams.body[0].id
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedRequest)

        expect(response.body).toHaveRequest("message")
        expect(response.status).toBe(400)
     
    })

    test("POST /requests -  should not be able to create requests not being admin",async () => {
        const teams = await request(app).get('/teams')
        const userLoginResponse = await request(app).post("/login").send(mockedUserLogin);
        mockedRequest.teamId = teams.body[0].id
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedRequest)

        expect(response.body).toHaveRequest("message")
        expect(response.status).toBe(403)
     
    })

    test("POST /requests -  should not be able to create requests without authentication",async () => {
        const teams = await request(app).get('/teams')
        mockedRequest.teamId = teams.body[0].id
        const response = await request(app).post('/requests').send(mockedRequest)

        expect(response.body).toHaveRequest("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /requests -  should not be able to create requests with invalid teamId",async () => { 
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedRequestInvalidTeamId)

        expect(response.body).toHaveRequest("message")
        expect(response.status).toBe(404)
     
    })

    test("POST /requests -  should not be able to create requests with invalid position",async () => { 
        const adminLoginResponse = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedRequestInvalidPosition)

        expect(response.body).toHaveRequest("message")
        expect(response.status).toBe(404)
     
    })

    test("GET /requests -  Must be able to list all requests",async () => {
        const response = await request(app).get('/requests')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

})