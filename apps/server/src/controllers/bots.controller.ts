import { NextFunction, Request, Response } from 'express'
import Bot from '../models/Bot'
import { uniqueNamesGenerator, animals, colors } from 'unique-names-generator'
import Openai from 'openai'
import dotenv from 'dotenv'

dotenv.config()
const configuration = {
  organization: "org-V8EHqzUCNq2ayr4OSo4Q8Bis",
  apiKey: process.env.OPENAI_API_KEY,
}
const openai = new Openai(configuration);

const BotsController = {

  async createBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, content, observation, service, limitations } = req.body

      if (!name) {

        // creates random name with unique-names-generator
        const botName = uniqueNamesGenerator({
          dictionaries: [colors, animals],
          separator: "-"
        })

        const bot = await Bot.create(botName, content, [observation], service, limitations)
        res.status(201).json(bot)
      } else {

        let bot = await Bot.findByName(name)

        if (!bot) bot = await Bot.create(name, content, [observation], service, limitations);
        else bot = await Bot.update(name, content, [observation], service, limitations);

        res.status(201).json(bot);
      }
    } catch (e) {
      console.log(e)
      next(e)
    }
  },

  async updateBot(req: Request, res: Response, next: NextFunction) {
    try {
      // Currently modify ONLY the name - change it to modify also content, observation, service, limitations
      const { name, content, observation, service, limitations } = req.body
      const bot = await Bot.update(name, content, observation, service, limitations)
      res.status(201).json(bot)
    } catch (e) {
      next(e)
    }
  },

  async getBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const bot = await Bot.findById(id)
      if (!bot) {
        res.status(404)
        return
      }
      res.json(bot)
    } catch (e) {
      next(e)
    }
  },

  async addDatatoExistingBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { observation, content, service, limitations } = req.body

      if (!observation) {
        return res.sendStatus(404)
      }

      const observations = Array.isArray(observation) ? observation : [observation]

      const dataToUpdate = {
        observation: observations,
        content,
        service,
        limitations,
      }

      const bot = await Bot.addData(id, dataToUpdate)
      return res.status(201).json(bot)
    } catch (e) {
      next(e)
    }
  },

  async deleteObservation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { observationToRemove } = req.body

      if (!observationToRemove) {
        return res.sendStatus(404)
      }
      const bot = await Bot.deleteObservation(id, observationToRemove)
      return res.status(204).json(bot)
    } catch (e) {
      next(e)
    }
  },

  async sendQueryToBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { message } = req.body;

      // Check if the bot with the given ID exists

      const bot = await Bot.findById(id)
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found' })
      }
      // bot specs
      const setup = `
        Behave like a bot that helps customers in my website answering questions.
        Here's the context of my biz: ${bot.content}
        Here's a list of services: ${bot.service}
        Here's a list of limitations: ${bot.limitations}
        
        Make sure to respond in a way that respects these observations: 
        ${bot.observation?.map(obs => `- ${obs}\n`)}

        The questions are going to come in the following messages.
      `


      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: setup
        },
        {
          role: "user",
          content: message
        }
        ],
      })

      // message, question from user


      // const newMessage = await Bot.messageToBot(id, message)
      return res.status(201).json(response.choices[0].message);
    } catch (e) {
      next(e)
    }
  },

}

export default BotsController