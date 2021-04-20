/*
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the MIT Licence.
This sample demonstrates how the send() function can be used to send messages to Service Bus
Queue/Topic.
See https://docs.microsoft.com/azure/service-bus-messaging/service-bus-queues-topics-subscriptions
to learn about Queues, Topics and Subscriptions.
*/
const subId = localStorage.getItem("subscriptionID");
const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString =
  "Endpoint=sb://roversdev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=Gse4QMOebkUE1D395bjgH+UkyMiYZ6B4wKqsnTtgc50=";

const data = [];

export async function sendMessages(data, queueName) {
  const sbClient = ServiceBusClient.createFromConnectionString(
    connectionString
  );
  // const queueName = "translation835";
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();
  try {
    for (let index = 0; index < data.length; index++) {
      const datalist = data[index];
      const message = {
        body: {
          FileName: datalist.name,
          SubscriptionId: subId,
          DomainId: localStorage.getItem("domainID"),
          FileString: datalist.body,
        },
        label: `${datalist.name}`,
      };
      // console.log("subid is", message);
      // return false;
      console.log(
        `Sending message: ${message.body.SubscriptionId} - ${message.label}`
      );
      await sender.send(message);
    }
    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}
sendMessages(data).catch((err) => {
  console.log("error is occure", err);
});
