# Part 5: Registration

We are going to create a separate registration page. We also want `My Page` to
show the user's profile if they are logged in, but direct them to register or
login if they are not.

## Registration Form

Create a new file called `src/views/Register.vue`. It should have a `template` section:

```
<template>
<div>
  <h1>Register for an account</h1>
  <form @submit.prevent="register" class="pure-form pure-form-aligned">
    <fieldset>
      <p class="pure-form-message-inline">All fields are required.</p>

      <div class="pure-control-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" placeholder="Email">
      </div>

      <div class="pure-control-group">
        <label for="password">Password</label>
        <input v-model="password" type="password" placeholder="Password">
      </div>

      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
  <p v-if="error" class="error">{{error}}</p>
</div>
</template>
```

This sets up a registration form. We are using the `Pure.css` styles here. Othewise this is similar to the other forms we have done previously.

We also need a `script` section:

```
<script>
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          email: this.email,
          password: this.password
        });
        if (this.error === "")
          this.$router.push('mypage');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
```

This creates an event handler for registration. It uses the Vuex store to
dispatch a registration action. We expect the store to return an error string if
an error occurs. Otherwise, we use the Router `push` method to send the user to
the `mypage` view.

We also need some styles:

```
<style scoped>
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}

.pure-controls {
  display: flex;
}

.pure-controls button {
  margin-left: auto;
}
</style>
```

## Firebase Authentication

We will use Firebase Authentication to register new users accounts.  Add this line to `src/store.js`.
```
import Vuex from "vuex";
import firebase from 'firebase';
```


In `src/store.js` add the state for users and the
mutation and actions for registering
a user:

```
export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.message;
      }
    }
  }
})
```

The `register` action uses firebase authentication to create a new user with the email and password given. If this succeeds, it commits the `setUser` mutation and returns an empty string.
If an error occurs, it returns the error message from the API.

## My Page

We'll polish the MyPage view later. For
now, create `src/views/MyPage.vue` with the following:

```
<template>
<div>
  <h1>My Page</h1>
  <p v-if="user">Hello, {{user.email}}</p>
</div>
</template>

<script>
export default {
  name: 'mypage',
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
}
</script>
```

This simply displays the user's name once
they are registered (which also logs then in). We use a computed property
to return the current user from the Vuex store.

## Routing

To make our views work, we need to add them to `src/router.js`. At the same
time, we'll delete the unused `about` route. Start with modifying the imported
views:

```
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import MyPage from './views/MyPage.vue'
```

Next, delete the `about` route and add two new routes:

```
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
```

## Results

You should now be able to register a user. You can visit `localhost:8080/register` to see the Register component.

Go to [Part 6](/tutorials/part6.md).
