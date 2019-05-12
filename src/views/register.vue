<template>
    <div id="registration">
        <div id="flashMessage">
            <flash-message></flash-message>
        </div>

        <div class="wrapper">
            <div id="formContent">
                <!-- Tabs Titles -->
                <h2 class="active"> Registrierung </h2>

                <!-- Register Form -->
                <form>
                    <input type="text" id="firstname" name="firstname" v-model="input.firstname" class="second"
                           placeholder="Vorname">
                    <input type="text" id="lastname" name="lastname" v-model="input.lastname" class="third"
                           placeholder="Nachname">
                    <input type="date" id="birthday" name="birthday" v-model="input.birthday" class="fourth"
                           placeholder="Geburtstag">
                    <input type="text" id="username" name="username" v-model="input.username" class="fifth"
                           placeholder="Benutzername">
                    <input type="text" id="password" name="password" v-model="input.password" class="sixth"
                           placeholder="Passwort">
                    <input type="text" id="email" name="email" v-model="input.email" class="seventh"
                           placeholder="Email Adresse">
                    <input type="button" class="fourth" v-on:click="registerUser()" value="Registrieren">
                </form>

                <!-- Login -->
                <div id="formFooter">
                    <a class="underlineHover" href="#/login">Login?</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    require('vue-flash-message/dist/vue-flash-message.min.css');

    export default {
        name: 'registration',
        data() {
            return {
                input: {
                    firstname: "",
                    lastname: "",
                    birthday: "",
                    username: "",
                    password: "",
                    email: ""
                },
                user: []
            }
        },
        methods: {
            async registerUser() {
                if (this.input.firstname !== "" && this.input.lastname !== "" && this.input.birthday !== "" && this.input.username !== "" && this.input.password !== "" && this.input.email !== "") {
                    this.user = await fetch("http://localhost:8000/register", {
                        method: "POST",
                        url: "http://localhost:8000",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            firstname: this.input.firstname,
                            lastname: this.input.lastname,
                            birthday: this.input.birthday,
                            username: this.input.username,
                            password: this.input.password,
                            email: this.input.email
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
                        this.flash('Something went wrong please try again', 'warning', {
                            timeout: 3000
                        });
                    }
                } else {
                    this.flash('A firstname, lastname, birthday, username, password and email must be present', 'error', {
                        timeout: 3000
                    });
                }
            }
        }
    }
</script>