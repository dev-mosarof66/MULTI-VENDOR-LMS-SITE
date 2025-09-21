import {Redis} from 'ioredis'

const redisClient = ()=>{
    try {
        if(process.env.REDIS_URL){
            console.log(`Redis connected`)
            return process.env.REDIS_URL
        }
    } catch (error) {
        console.log('Error while connecting to redis.',error)
        process.exit(1)
    }
}

export const redis = new Redis(redisClient())