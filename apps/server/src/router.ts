import express from 'express'
import BotsController from './controllers/bots.controller'

const router = express.Router()

router.post('/bots', BotsController.createBot)
router.put('/bots/:id', BotsController.updateBot)
router.get('/bots/:id', BotsController.getBot)

router.post('/bots/:id/observation', BotsController.addDatatoExistingBot)
router.delete('/bots/:id', BotsController.deleteObservation)
router.post('/bots/:id', BotsController.sendQueryToBot)

router.post('/bots/:id/chat', BotsController.sendQueryToBot)

export default router
