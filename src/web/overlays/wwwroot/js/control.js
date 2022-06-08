Vue.config.devtools = true;


const app = new Vue({
  el: '#app',
  data: function () {
    return {
      socket: null,
      streamDate: null
    };
  },
  methods: {
    sendOrbit() {
      this.socket.emit('onOrbit', this.streamDate);
    },
    sendFullOrbit() {
      this.socket.emit('onFullOrbit', this.streamDate);
    },
    rollCredits() {
      this.socket.emit('requestCreditRoll', this.streamDate)
    },
    startPoll() {
      this.socket.emit('onPollStart', {
        pollId: this.streamDate,
        lengthInSeconds: 120,
        started_at: (new Date()).toISOString()
      })
    },
    endPoll() {
      this.socket.emit('onPollEnd')
    }
  },
  mounted() {
    this.socket = io.connect('/');

    this.socket.on('reconnect', () => {
      window.location.reload();
    });

    console.log("We're loaded and listening the socket.io hub");
  },
  template:
    `<div>
      <input type="text" v-model="streamDate" id="streamDate"/><br/>
      <button type="submit" @click.prevent="sendOrbit">Send onOrbit</button><br/>
      <button type="submit" @click.prevent="sendFullOrbit">Send onFullOrbit</button><br/>
      <button type="submit" @click.prevent="rollCredits">Roll Credits</button><br/>
      <button type="submit" @click.prevent="startPoll">Start Poll</button><br/>
      <button type="submit" @click.prevent="endPoll">End Poll</button>
    </div>`
});
