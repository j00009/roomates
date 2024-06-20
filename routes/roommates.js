import { Router } from "express";
import { crearRommate, obtenerRoommates} from "../models/roommates.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const roommates = await obtenerRoommates()

        res.json(roommates)
    } catch (error) {
        console.log(error)
        res.status(500).json
        
    }
})

export {router}