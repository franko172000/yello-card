import * as sinon from 'sinon';
import TestSetup from "../TestSetup";
import AppService from "../../app/services/AppService";

describe('Auth Service Test', ()=> {
    beforeAll(async ()=>{
        await TestSetup.initDb()
    });

    const setUp = ()=>{
        const appService = new AppService();
        return {
            appService
        }
    }

    afterEach(()=>{
        sinon.restore();
    })

    afterAll(()=>{
        TestSetup.closeDb()
    });

    it('should return hello world', async function () {
        const {appService} = setUp();
        expect(appService.sayHello()).toEqual('Hello world')
    });
})