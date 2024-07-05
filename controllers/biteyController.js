function handleOrderAdd(parameters, sessionId) {
    // Implement your logic to add an order here
    const itemName = parameters.item;
    const quantity = parameters.quantity;
  
    console.log(`Session ID: ${sessionId}`);
    console.log(`Adding ${quantity} of ${itemName} to the order.`);
  
    return {
      fulfillmentText: `Added ${quantity} of ${itemName} to your order.`
    };
}
  
  // Function to handle order.remove intent
function handleOrderRemove(parameters, sessionId) {
    // Implement your logic to remove an order here
    const itemName = parameters.item;
    const quantity = parameters.quantity;
  
    console.log(`Session ID: ${sessionId}`);
    console.log(`Removing ${quantity} of ${itemName} from the order.`);
  
    return {
      fulfillmentText: `Removed ${quantity} of ${itemName} from your order.`
    };
  }

export {handleOrderAdd,handleOrderRemove}