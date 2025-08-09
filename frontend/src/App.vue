<template>
  <div class="container">
    <h1>User Registration</h1>
    <form @submit.prevent="registerUser" novalidate>
      <input v-model="firstname" placeholder="First Name" required />
      <input v-model="lastname" placeholder="Last Name" required />
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>

    <p v-if="message" :class="{ error: isError }">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      message: '',
      isError: false
    };
  },
  methods: {
    async registerUser() {
      this.message = '';
      this.isError = false;
      try {
        const res = await axios.post('http://localhost:5000/register', {
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.message = res.data.message || 'Registered';
        this.isError = false;
        // clear form
        this.firstname = this.lastname = this.username = this.email = this.password = '';
      } catch (err) {
        this.isError = true;
        this.message = err.response?.data?.error || 'Registration failed';
      }
    }
  }
};
</script>

<style>
.container { max-width: 480px; margin: 40px auto; padding: 20px; font-family: sans-serif; }
input, button { display:block; width:100%; padding:10px; margin:8px 0; box-sizing: border-box; }
.error { color: red; }
</style>
