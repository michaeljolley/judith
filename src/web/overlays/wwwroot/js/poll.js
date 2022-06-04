Vue.config.devtools = true;

Vue.component('vote', {
  template: `
    <li class="vote" v-bind:style="{ backgroundImage: 'url(${avatar_url})' }"></li>`,
  props: ['avatar_url']
});

Vue.component('choice', {
  template: `
    <div class="choice" v-bind:class="{ hide: hideMe }" v-bind:style="{ order: total - ind }">
      <ul class="votes">
        <vote v-for="let vote of votes" :key="vote.user.login" :avatar_url="vote.user.avatar_url"/>
      </ul>
    </div>`,
  props: ['name', 'votes', 'hideMe']
});

const app = new Vue({
  el: '#app',
  data: function () {
    return {
      poll: null,
      endInterval: null,
      socket: null
    };
  },
  methods: {
    onVoteEnd() {

    },
    onVoteStart(onVoteStartEvent) {

    },
    onVote(onVoteEvent) {

    },
    onVoteWinner(onVoteWinnerEvent) {

    }
  },
  created() {
    this.socket = io.connect('/');

    this.socket.on('onVoteWinner', onVoteWinnerEvent => 
      this.onVoteWinner(onVoteWinnerEvent));

    this.socket.on('onVote', onVoteEvent => this.onVote(onVoteEvent));

    this.socket.on('onVoteStart', onVoteStartEvent => 
      this.onVoteStart(onVoteStartEvent));

    this.socket.on('onVoteEnd', onVoteEndEvent => {
      // Wait 5 seconds before removing everything to make sure we don't
      // get an onVoteWinner event.
      this.endInterval = setInterval(() => {
        this.onVoteEnd();
      }, 5000);
    });

    this.socket.on('reconnect', () => {
      window.location.reload();
    });

    console.log("We're loaded and listening to polls from socket.io");
  },
  template: `<div class="chat">
              <transition-group name="list" @after-leave="checkOverflow">
                <chatMessage v-for="(message, index) in messages" :key="message.id" :onChatMessageEvent="message" :ind="index" :total="messages.length" v-on:removeItem="removeItem" ref="message"></chatMessage>
              </transition-group>
            </div>`
})
