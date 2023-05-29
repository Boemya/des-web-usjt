// config/eventBus.js
const amqp = require('amqplib');

class EventBus {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Error connecting to event bus:', error);
    }
  }

  async publishEvent(exchange, routingKey, message) {
    try {
      await this.channel.assertExchange(exchange, 'direct', { durable: true });
      await this.channel.publish(exchange, routingKey, Buffer.from(message));
    } catch (error) {
      console.error('Error publishing event:', error);
    }
  }
}

module.exports = new EventBus();
