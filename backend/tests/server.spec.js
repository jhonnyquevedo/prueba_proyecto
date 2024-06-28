const request = require("supertest")
const server = require("../index")

describe("Operaciones CRUD rutas AustralAuto", () => {
    // ruta get
    it("Obteniendo statusCode y recibiendo array de vehiculos", async () => {
        const { statusCode } = await request(server).get('/vehiculos').send()
        expect(statusCode).toBe(200)
    })
})