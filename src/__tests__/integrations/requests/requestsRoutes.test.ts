import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedRequest, mockedRequestInvalidTeamId, mockedRequestInvalidPosition} from "../../mocks/requests/index"
import { mockedCorrectLogin, mokedUser } from "../../mocks/login";
import { mockedTeam0 } from "../../mocks/teams";


describe("/requests", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/users/create').send(mokedUser)
        const loginResponse = await request(app).post("/users/login").send(mockedCorrectLogin);
        await request(app)
            .post('/teams/create')
            .set('Authorization', `Bearer ${loginResponse.body.token}`)
            .send(mockedTeam0);
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /requests -  Must be able to create a requests",async () => {
      
        const resultLogin = await request(app)
            .post('/users/login')
            .send(mockedCorrectLogin);
  
        const teams = await request(app).get('/teams').set("Authorization", `Bearer ${resultLogin.body.token}`)
        const users = await request(app).get('/users').set("Authorization", `Bearer ${resultLogin.body.token}`)
        mockedRequest.teamId = teams.body[0].id
        mockedRequest.userId = users.body[0].id
      
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${resultLogin.body.token}`).send(mockedRequest)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("status")
        expect(response.body).toHaveProperty("positions")
        expect(response.body).toHaveProperty("teams")
        expect(response.body).toHaveProperty("user")
        expect(response.status).toBe(201)
     
    })


    test("POST /requests -  should not be able to create requests without authentication",async () => {
        const teams = await request(app).get('/teams')
        mockedRequest.teamId = teams.body.id
        const response = await request(app).post('/requests').send(mockedRequest)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /requests -  should not be able to create requests with invalid teamId",async () => { 
        const loginResponse = await request(app).post("/login").send(mockedCorrectLogin);
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedRequestInvalidTeamId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /requests -  should not be able to create requests with invalid position",async () => { 
        const loginResponse = await request(app).post("/login").send(mockedCorrectLogin);
        const response = await request(app).post('/requests').set("Authorization", `Bearer ${loginResponse.body.token}`).send(mockedRequestInvalidPosition)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("GET /requests -  Must be able to list all requests",async () => {

        const resultLogin = await request(app)
            .post('/users/login')
            .send(mockedCorrectLogin);
  
        const teams = await request(app).get('/teams').set("Authorization", `Bearer ${resultLogin.body.token}`)
        const users = await request(app).get('/users').set("Authorization", `Bearer ${resultLogin.body.token}`)
        mockedRequest.teamId = teams.body[0].id
        mockedRequest.userId = users.body[0].id
      
        await request(app).post('/requests/').set("Authorization", `Bearer ${resultLogin.body.token}`).send(mockedRequest)

        const response = await request(app).get(`/requests/${teams.body[0].id}`).set("Authorization", `Bearer ${resultLogin.body.token}`)

        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("status")
        expect(response.body[0]).toHaveProperty("positions")
        expect(response.status).toBe(200)
    })

}) 
