const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

const connectionString = "CONNECTION-STRING";
const topic = "TOPIC";
const subscriptionName = "SUBSCRIPTION";

export async function receiveMessages() {
  const notifications = [];

  const client = ServiceBusClient.createFromConnectionString(
    "Endpoint=sb://roversdev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=Gse4QMOebkUE1D395bjgH+UkyMiYZ6B4wKqsnTtgc50="
  );
  const subscription = client.createSubscriptionClient("835translation");
  const receiver = subscription.createReceiver(ReceiveMode.peekLock);

  const messageHandler = async (brokeredMessage) => {
    console.log(`Received message: ${brokeredMessage.body}`);
    notifications.push(brokeredMessage.body);
    await brokeredMessage.complete();
  };

  const onErrorHandler = (err) => {
    console.log(`Error occurred: `, err);
  };

  try {
    receiver.registerMessageHandler(messageHandler, onErrorHandler, {
      autoComplete: false,
    });
    await new Promise((r) => setTimeout(r, 3000));
    await receiver.close();
  } finally {
    await client.close();
  }
  return notifications;
}
