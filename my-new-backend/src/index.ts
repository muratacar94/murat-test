import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = 3000; //porten där servern körs

app.use(express.json()); //middleware för att hantera json-data

//starta servern
app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send("Välkommen till min API-server! Gå till /users för att se data.") //vad är res.send?
})

//skapa endpoints här nedan
//hämta ALLA användare med GET

app.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); //hämtar alla användare från databasen
    res.json(users); //returnerar användarna som json
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ett fel uppstod vid hämtning av användare." });
  }
});

app.get('/users/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params; // 'id' är nu korrekt typad som en sträng
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }, // Konverterar 'id' från sträng till nummer
    });
    if (!user) {
      return res.status(404).json({ error: "Användaren hittades inte" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Ett fel uppstod vid hämtning av användare." });
  }
});


//lägg till ny användare med POST

app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body; //hämtar 'name' och 'email', är det som FromBody?

  try {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(newUser); //201 betyder created, denna returnerar en ny användare
  } catch (error) {
    res
      .status(404)
      .json({ error: "Användaren kunde inte hittas eller uppdateras" });
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params; //vad är detta?
  const { name, email } = req.body; //nya värden för förfrågan

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) }, //uppdaterar med rätt användare
      data: { name, email }, //nya värden som ska uppdateras
    });
    res.status(200).json(updatedUser); //varför ingen statuskod här? är det bara för 201 är created?
  } catch (error) {
    res
      .status(404)
      .json({ error: "Användaren kunde inte hittas eller uppdateras" });
  }
});

//ta bort användare med ID

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params; //hämta id från URL sidan

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }, //antar att man inte behöver name och email för ID tar bort allting?
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(404)
      .json({ error: "Användaren kunde inte hittas eller tas bort" });
  }
});

//varför använder alla mina app. funktioner en await async men det finns ingen timer, vad väntar den på?