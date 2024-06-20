import axios from "axios";
import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from 'uuid';

console.log(import.meta.dirname)

const roommatesFile = path.join(import.meta.dirname, "../data/roommate.json")

async function crearRommate() {
    const data = await axios.get("https://randomuser.me/api")
    const usuarioRandom = data.data.results[0]
    console.log(usuarioRandom)
    const roommate = {
        id: uuidv4(),
        nombre: `${usuarioRandom.name.first} ${usuarioRandom.name.last} `,
        email: usuarioRandom.email,
        debe: 0,
        recibe: 0
    }

    fs.readFile(roommatesFile, "utf-8")
        .then(data => {
            const nuevoUsuario = JSON.parse(data)
            nuevoUsuario.roommates.push(roommate)
            fs.writeFile(roommatesFile, JSON.stringify(nuevoUsuario))
   
            .then(() => {
                    console.log("Usuario creado con éxito")
                })
                .catch(err => {
                    console.error(`Ha ocurrido un error: ${err}`)
                })
        })
    return roommate
}

const obtenerRoommates = async () => {
    try {
      const data = await fs.readFile(roommatesFile, "utf-8")
      const roommates = JSON.parse(data)
      return roommates
    } catch (error) {  
      console.log("Error", error)
      return error
    } 
  }

export {crearRommate, obtenerRoommates}
//module.exports(crearRoomate, obtenerRoommates)