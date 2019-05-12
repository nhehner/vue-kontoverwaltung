<template>
    <div id="login">
        <div id="flashMessage">
            <flash-message></flash-message>
        </div>

        <div class="wrapper">
            <div id="formContent">
                <!-- Tabs Titles -->
                <h2 class="active"> Login </h2>

                <!-- Login Form -->
                <form>
                    <input type="text" id="username" name="username" v-model="input.username" class="second"
                           placeholder="Benutzername">
                    <input type="password" id="password" name="password" v-model="input.password" class="third"
                           placeholder="Passwort">
                    <input type="button" class="fourth" v-on:click="login()" value="Login">
                </form>

                <!-- Register -->
                <div id="formFooter">
                    <a class="underlineHover" href="#/register">Registrieren?</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    require('vue-flash-message/dist/vue-flash-message.min.css');

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                user: []
            }
        },
        methods: {
            async login() {
                if (this.input.username !== "" && this.input.password !== "") {
                    this.user = await fetch("http://localhost:8000/login", {
                        method: "POST",
                        url: "http://localhost:8000",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: this.input.username,
                            password: this.input.password
                        })
                    }).then(response => {
                        if (response.ok) {
                            return response.json()
                        }

                        throw new Error('Network response was not ok.');
                    }).then(data => {
                        return JSON.stringify(data);
                    }).catch(error => {
                        this.user = [];
                    });

                    if (this.user) {
                        this.$emit("authenticated", true);
                        this.$router.replace({name: "home"});
                    } else {
                        this.flash('The username and / or password is incorrect', 'warning', {
                            timeout: 3000
                        });
                    }
                } else {
                    this.flash('A username and password must be present', 'error', {
                        timeout: 3000
                    });
                }
            }
        }
    }
</script>