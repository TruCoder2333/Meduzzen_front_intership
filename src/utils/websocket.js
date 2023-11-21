import { eventBus } from './eventBus';

let socket;

function connectWebSocket() {
  socket = new WebSocket('ws://localhost:8000/ws/notifications/');

  socket.onopen = () => console.log("Connected to the WebSocket server");
  socket.onerror = (error) => console.error("WebSocket error:", error);
  socket.onmessage = (event) => {
    eventBus.emit('new-notification', event.data);
  };

  socket.onclose = () => {
    setTimeout(connectWebSocket, 5000); // Attempt to reconnect every 5 seconds
  };
}

export function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
}

export default connectWebSocket;
