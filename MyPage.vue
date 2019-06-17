<template>
<div>
  <div v-if="user" class="header">

    <div>
      <h3>{{user.email}}</h3>
      <h1>Welcome To Your Page!</h1>
      <h2>Things we know about you: </h2>
      <input v-model="about" /><button @click="addAbout">Add</button>
      
    </div>
    <div class="button">
      <p><button @click="logout" class="pure-button pure-button-primary">Logout</button></p>
    </div>

  </div>
  <div v-else>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
import { db } from '@/main'
export default {
  name: 'mypage',
  data: function () {
    return {
      aboutyou: ''
    }
  },
  methods: {
    addAbout: function () {
      this.errors = ''

      if (this.myTodo !== '') {
          db.collection('users').add({
            title: this.about,
            created_at: Date.now()
          }).then((response) => {
            if (response) {
              this.myTodo = ''
            }
          }).catch((error) => {
            this.errors = error
          })
        } else {
          this.errors = 'Please enter some text'
        }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  }, 
    created() {
    this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
h3 {
  border: solid black 3px;
  padding: 3px;
  text-align: center;
}
.pure-button {
  margin: 3px 20px;
}

.header {
  display: flex;
  background-color: lightgray;
  padding: 0em 5em;
  padding-bottom: 2em;

}

.header .button {
  margin-left: 50px;
  order: 2;
}
</style>