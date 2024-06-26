import app from '../../app'
import request from 'supertest'
import TestSetup from "../TestSetup";

describe('App Controller Test', ()=>{
    const basePath = '/api/';
    beforeAll(async ()=>{
        //await connection.sync();
       await TestSetup.initDb()
    });

    afterAll(async ()=>{
        //await connection.close();
        await TestSetup.closeDb()
    });

    it('Should return hello world', async ()=>{
        const response = await request(app).get(`${basePath}`)
        expect(response.status).toEqual(200)
        expect(response.body.message).toEqual('Hello world')
    })
})