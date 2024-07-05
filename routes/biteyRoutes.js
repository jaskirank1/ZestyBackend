import express from 'express'
import {handleOrderAdd, handleOrderRemove} from '../controllers/biteyController.js'

const biteyRouter = express.Router();

biteyRouter.post('/webhook', (req, res) => {
    const queryResult = req.body.queryResult;
    const intentName = queryResult.intent.displayName;
    const parameters = queryResult.parameters;
    const sessionId = queryResult.outputContexts[0].name.split('/').slice(-1)[0];
  
    let response;
  
    switch (intentName) {
      case 'order.add':
        response = handleOrderAdd(parameters, sessionId);
        break;
      case 'order.remove':
        response = handleOrderRemove(parameters, sessionId);
        break;
      default:
        response = {
          fulfillmentText: 'Sorry, I did not understand that.'
        };
    }
  
    res.json(response);
});

export default biteyRouter;