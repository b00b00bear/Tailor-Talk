import { prisma } from "../lib/prisma"
interface Chat {
  id: string
  message: string[] | null
  botId?: string
  bot?: Bot
}

class Bot {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date,
    public updatedAt: Date,
    public content: string | null,
    public observation: string[] | null,
    public service: string | null,
    public limitations: string | null
  ) { }


  static async create(name: string, content: string, observation: string[], service: string, limitations: string): Promise<Bot> {
    const bot = await prisma.bot.create({
      data: {
        name,
        content,
        observation,
        service,
        limitations
      }
    })
    return new Bot(
      bot.id,
      bot.name,
      bot.createdAt,
      bot.updatedAt,
      bot.content,
      bot.observation,
      bot.service,
      bot.limitations
    )
  }

  static async update(name: string, content: string, observation: string[], service: string, limitations: string): Promise<Bot> {
    const record = await prisma.bot.update({
      where: { name },
      data: {
        name,
        content,
        observation,
        service,
        limitations
      },
    })
    console.log(record)
    return new Bot(
      record.id,
      record.name,
      record.createdAt,
      record.updatedAt,
      record.content,
      record.observation,
      record.service,
      record.limitations
    )
  }

  static async findById(id: string): Promise<Bot | null> {
    const record = await prisma.bot.findUnique({
      where: { id },
    })
    if (!record) {
      throw new Error('Bot does not exist')
    }
    return new Bot(
      id,
      record.name,
      record.createdAt,
      record.updatedAt,
      record.content,
      record.observation,
      record.service,
      record.limitations)
  }

  static async findByName(name: string): Promise<Bot | null> {
    const record = await prisma.bot.findUnique({
      where: { name },
    })
    if (!record) {
      return null
    }
    return new Bot(
      record.id,
      name,
      record.createdAt,
      record.updatedAt,
      record.content,
      record.observation,
      record.service,
      record.limitations)
  }

  static async addData(id: string, dataToUpdate: {
    observation: string[];
    content?: string
    service?: string;
    limitations?: string;
  }): Promise<Bot> {
    const record = await prisma.bot.findUnique({
      where: { id },
    });

    if (!record) {
      throw new Error('Bot does not exist');
    }

    const updatedBot = await prisma.bot.update({
      where: { id },
      data: {
        observation: {
          push: [...dataToUpdate.observation]
        },
        content: dataToUpdate.content,
        service: dataToUpdate.service,
        limitations: dataToUpdate.limitations,
      },
    });

    return new Bot(
      id,
      updatedBot.name,
      updatedBot.createdAt,
      updatedBot.updatedAt,
      updatedBot.content,
      updatedBot.observation,
      updatedBot.service,
      updatedBot.limitations
    );
  }


  static async deleteObservation(id: string, observationToRemove: string): Promise<Bot> {
    const record = await prisma.bot.findUnique({
      where: { id }
    })
    if (!record) throw new Error('Bot does not exist')

    const updatedObservations = record.observation.filter(observation => observation !== observationToRemove)

    const removeObservation = await prisma.bot.update({
      where: { id },
      data: {
        observation: updatedObservations
      },
    })

    return removeObservation
  }

  static async messageToBot(id: string, message: string[]): Promise<Chat> {
    const record = await prisma.bot.findUnique({
      where: { id }
    })
    if (!record) throw new Error('Bot does not exist')

    // Create a new message and associate it with the bot
    const newMessage = await prisma.chat.create({
      data: {
        message: message,
        bot: { connect: { id } }
      },
    })

    return newMessage
  }
}

export default Bot