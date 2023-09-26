import mongoose from "mongoose";

export default class MongoClient{
    constructor(){
        this.connected = true,
        this.client = mongoose
    }

    connect = async() =>{
        try {
            await this.client.connect('mongodb+srv://federicoaraya:cCbvYRYjjNeDJR7v@asgard.0pnjaxo.mongodb.net/')
            
        } catch (error) {
            console.log(error)
        }
    }
}