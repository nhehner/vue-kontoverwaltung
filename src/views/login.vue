<template>
    <div id="login">
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
                    <input type="button" id="button" class="fourth" v-on:click="login()" value="Login">
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
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                user: [],
                isLoading: false,
                isFullPage: true
            }
        },
        methods: {
            async login() {
                if (this.input.username !== "" && this.input.password !== "") {
                    const loadingComponent = this.$loading.open({
                        container: null
                    });

                    this.user = '';
                    this.user = await
                        fetch("http://localhost:8000/login", {
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
                        localStorage.clear();
                        localStorage.setItem('userId', this.user);
                        this.$router.replace({name: "secure"});

                        this.$toast.open({
                            duration: 4500,
                            message: `Successfully logged in`,
                            position: 'is-top-right',
                            type: 'is-success'
                        });
                    } else {
                        this.$toast.open({
                            duration: 4500,
                            message: `The username and / or password is incorrect`,
                            position: 'is-top-right',
                            type: 'is-warning'
                        });
                    }
                    loadingComponent.close();
                } else {
                    this.$toast.open({
                        duration: 4500,
                        message: `A username and password must be present`,
                        position: 'is-top-right',
                        type: 'is-danger'
                    });
                }
            }
        }
    }
</script>