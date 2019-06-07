# Part 4: Authentication 

Users need to register for an account and login. 

## Login.vue

Create a file called `views/Login.vue` and put the following in the template section:

```
<template>
  <div class="login">
    <img src="../assets/dc_logo.jpg" width="300px">
    <h3>DC Comics Rebirth - Covers</h3>
    <input 
      type="text" 
      v-model="email" 
      placeholder="Email address" 
      class="input" 
      required>
    <br/>
    <input 
      type="password" 
      v-model="password"
      placeholder="Password" 
      class="input" 
      required>
    <br/>
    <button v-on:click="login" class="button">Enter</button>
    <p><router-link to="/signup">
      New Here? Create a new account
    </router-link></p>
  </div>
</template>
```

## auth.js

Create a file called `server/auth.js` and put the following there:

```
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// We define a random secret here to use for signing JWTs
// You should NOT do this normally. You don't want to hard code
// secret values into your code.
let secret = "RANDOMSECRETCHANGETHIS";

// Instead, you should define the value in a file called ".env".
// Then call "source .env" to put this into the environment
// This file should have in it:
// export jwtSecret="RANDOMSECRETCHANGETHIS"
// We would read this secret with the lne below:

// let secret = process.env.jwtSecret;

if (secret === undefined) {
  console.log("You need to define a jwtSecret environment variable to continue.");
  mongoose.connection.close();
  process.exit();
}

// Generate a token
const generateToken = (data, expires) => {
  return jwt.sign(data, secret, {
    expiresIn: expires
  });
};

// Verify the token that a client gives us.
// This is setup as middleware, so it can be passed as an additional argument to Express after
// the URL in any route. This will restrict access to only those clients who possess a valid token.
const verifyToken = (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) return res.status(403).send({
    message: "No token provided."
  });
  try {
    const decoded = jwt.verify(token, secret);
    // save user id
    req.user_id = decoded.id;
    req.token = token;
    next();

  } catch (error) {
    console.log(error);
    return res.status(403).send({
      message: "Failed to authenticate token."
    });
  }
}

const removeOldTokens = (tokens) => {
  return tokens.filter(token => {
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  });
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
  removeOldTokens: removeOldTokens,
};
```

## server.js

Finally, modify `server/server.js` so it contains the following, before
`app.listen`.

```
const users = require("./users.js");
app.use("/api/users", users.routes);
```

Go to [Part 5](/tutorials/part5.md).
