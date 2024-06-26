import connection from "./test.db-config";

export default class TestSetup {
    static async initDb(){
        try{
            await connection.authenticate();
        }catch (err){
            console.log(err)
        }
    }
    static async closeDb(){
        await connection.close();
    }
    static initApp(){
    }
}