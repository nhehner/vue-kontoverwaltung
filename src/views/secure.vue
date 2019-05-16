<template>
    <div id="secure">
        <div class="container">
            <article class="message">
                <div class="message-header">
                    <p>Ihre Konten</p>
                </div>

                <div class="message-body">
                    <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
                    <b-table striped hover :data="this.data" :columns="this.columns"></b-table>

                    <button class="button is-primary is-medium" @click="newKontoModal()">
                        Neues Konto erstellen
                    </button>

                    <button class="button is-light is-right" @click="getGridData()">Refresh</button>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    const ModalForm = {
        props: ['beschreibung', 'iban', 'bic', 'inhaber', 'kreditkarte', 'gueltigBis'],
        template: `
            <form @submit="createNewKonto">
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Neues Konto erstellen</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Beschreibung">
                            <b-input
                                type="text"
                                :value="beschreibung"
                                placeholder="Beschreibung"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="IBAN">
                            <b-input
                                type="text"
                                :value="iban"
                                placeholder="IBAN"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="BIC">
                            <b-input
                                type="text"
                                :value="bic"
                                placeholder="BIC"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Inhaber">
                            <b-input
                                type="text"
                                :value="inhaber"
                                placeholder="Inhaber"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Kreditkarte">
                            <b-input
                                type="text"
                                :value="kreditkarte"
                                placeholder="Kreditkarte"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Gültig Bis">
                            <b-input
                                type="text"
                                :value="gueltigBis"
                                placeholder="Gültig Bis"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-primary">Neues Konto anlegen</input>
                    </footer>
                </div>
            </form>
        `
    };

    export default {
        name: 'secure',
        data() {
            return {
                konto: [],
                columns: [],
                data: [],
                isComponentModalActive: false,
                formProps: [],
                isLoading: false
            }
        },
        methods: {
            async getGridData() {
                const loadingComponent = this.$loading.open({
                    container: true
                });
                this.isLoading = true;

                this.konto = await fetch("http://localhost:8000/getKontoById", {
                    method: "POST",
                    url: "http://localhost:8000",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error('Network response was not ok.');
                }).then(data => {
                    return Object.values(data);
                }).catch(error => {
                    this.konto = [];
                });

                if (this.konto) {
                    this.data = [];
                    this.konto.forEach(item => {
                        this.data.push({
                            'Guthaben': item.guthaben + ' €',
                            'Beschreibung': item.beschreibung,
                            'IBAN': item.iban,
                            'Inahber': item.inhaber,
                            'Kreditkarte': item.kreditkarte,
                            'GültigBis': item.gueltigBis,
                            'Aktiv': item.aktiv
                        });
                    });
                }
                loadingComponent.close();
                this.isLoading = false;
            },
            getGridColumns() {
                this.columns = [
                    {
                        field: 'Guthaben',
                        label: 'Guthaben',
                    },
                    {
                        field: 'Beschreibung',
                        label: 'Beschreibung',
                    },
                    {
                        field: 'IBAN',
                        label: 'IBAN',
                    },
                    {
                        field: 'Inahber',
                        label: 'Inahber',
                    },
                    {
                        field: 'Kreditkarte',
                        label: 'Kreditkarte',
                    },
                    {
                        field: 'GültigBis',
                        label: 'GültigBis',
                    },
                    {
                        field: 'Aktiv',
                        label: 'Aktiv',
                    }
                ];
            },
            newKontoModal() {
                this.$modal.open({
                    parent: this,
                    component: ModalForm,
                    hasModalCard: false
                })
            },
            async createNewKonto() {
                const loadingComponent = this.$loading.open({
                    container: true
                });
                this.isLoading = true;

                this.konto = await fetch("http://localhost:8000/createKonto", {
                    method: "POST",
                    url: "http://localhost:8000",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        beschreibung: this.formProps.beschreibung,
                        iban: this.formProps.iban,
                        bic: this.formProps.bic,
                        inhaber: this.formProps.inhaber,
                        kreditkarte: this.formProps.kreditkarte,
                        gueltigBis: this.formProps.gueltigBis
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error('Network response was not ok.');
                }).then(data => {
                    return Object.values(data);
                }).catch(error => {
                    this.konto = [];
                });

                if (this.konto) {
                    this.$toast.open({
                        duration: 4500,
                        message: `Successfully logged in`,
                        position: 'is-top-right',
                        type: 'is-success'
                    });

                    this.getGridData();
                    this.$parent.close();
                } else {
                    this.$toast.open({
                        duration: 4500,
                        message: `Something went wrong please try again`,
                        position: 'is-top-right',
                        type: 'is-danger'
                    });
                }
                loadingComponent.close();
                this.isLoading = false;
            }
        },
        beforeMount() {
            this.getGridData();
            this.getGridColumns();
        }
    }
</script>