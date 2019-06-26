<template>
    <div id="secure">
        <div class="container">
            <article class="message">
                <div class="message-header">
                    <p>Ihre Konten</p>
                </div>

                <div class="message-body">
                    <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
                    <b-table is-striped is-hoverable :data="this.data" :columns="this.columns"></b-table>

                    <br>

                    <button class="button is-primary is-medium" style="margin-right: 10px;" @click="newKontoModal()">
                        Neues Konto hinzufügen
                    </button>

                    <button class="button is-primary is-medium" style="margin-right: 10px;"
                            @click="newTransactionModal()">
                        Neue Transaction durchführen
                    </button>

                    <button class="button is-light is-medium" style="margin-right: 10px;" @click="addClickListener()">
                        Add Click Listener
                    </button>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    import BTableColumn from "buefy/src/components/table/TableColumn";

    export default {
        name: 'secure',
        components: {BTableColumn},
        data() {
            return {
                konto: [],
                columns: [],
                data: [],
                alreadyAssign: [],
                isComponentModalActive: false,
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
                            'Id': item.id,
                            'Guthaben': item.guthaben + ' €',
                            'Beschreibung': item.beschreibung,
                            'IBAN': item.iban,
                            'Inahber': item.inhaber,
                            'Kreditkarte': item.kreditkarte,
                            'GültigBis': item.gueltigBis,
                            'Aktiv': item.aktiv
                        });
                    });
                    this.alreadyAssign = [];
                }
                loadingComponent.close();
                this.isLoading = false;
            },
            getGridColumns() {
                if (!this.columns) {
                    this.columns = [];
                }

                this.columns = [
                    {
                        field: 'Id',
                        label: 'ID',
                    },
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
            addClickListener() {
                document.querySelectorAll('[draggable="false"]').forEach(value => {
                    let currentId = (value.querySelector('[data-label="ID"]').innerHTML).replace('<span>', '').replace('</span>', '').replace(/ /g, "").replace(/(?:\r\n|\r|\n)/g, '');

                    if (this.alreadyAssign.indexOf(currentId) !== -1) {
                        return
                    }

                    value.addEventListener('click', () => {
                        localStorage.removeItem('element');
                        localStorage.setItem('kontoId', currentId);

                        this.$modal.open({
                            parent: this,
                            component: kontoInformationModal,
                            hasModalCard: false,
                        })
                    });

                    this.alreadyAssign.push(currentId);
                });
            },
            newKontoModal() {
                this.$modal.open({
                    parent: this,
                    component: newKontoModal,
                    hasModalCard: false
                })
            },
            newTransactionModal() {
                this.$modal.open({
                    parent: this,
                    component: newTransactionModal,
                    hasModalCard: false
                })
            }
        },
        beforeMount() {
            this.getGridData();
            this.getGridColumns();
        }
    }

    const newKontoModal = {
        props: ['beschreibung', 'iban', 'bic', 'inhaber', 'kreditkarte', 'gueltigBis'],
        data() {
            return {
                input: {
                    beschreibung: '',
                    iban: '',
                    bic: '',
                    inhaber: '',
                    kreditkarte: '',
                    gueltigBis: ''
                },
                isLoading: false
            }
        },
        template: `
            <form>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Neues Konto erstellen</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Beschreibung">
                            <b-input
                                type="text"
                                v-model="input.beschreibung"
                                placeholder="Beschreibung"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="IBAN">
                            <b-input
                                type="text"
                                v-model="input.iban"
                                placeholder="IBAN"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="BIC">
                            <b-input
                                type="text"
                                v-model="input.bic"
                                placeholder="BIC"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Inhaber">
                            <b-input
                                type="text"
                                v-model="input.inhaber"
                                placeholder="Inhaber"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Kreditkarte">
                            <b-input
                                type="text"
                                v-model="input.kreditkarte"
                                placeholder="Kreditkarte"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Gültig Bis">
                            <b-input
                                type="text"
                                v-model="input.gueltigBis"
                                placeholder="YYYY-mm-dd"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-primary" @click="createNewKonto">Neues Konto anlegen</button>
                    </footer>
                </div>
            </form>
        `,
        methods: {
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
                        beschreibung: this.input.beschreibung,
                        iban: this.input.iban,
                        bic: this.input.bic,
                        inhaber: this.input.inhaber,
                        kreditkarte: this.input.kreditkarte,
                        gueltigBis: this.input.gueltigBis
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
                        message: `Successfully created new Konto`,
                        position: 'is-top-right',
                        type: 'is-success'
                    });

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
        }
    };

    const newTransactionModal = {
        props: ['kontoId', 'ziel_iban', 'ziel_bic', 'ziel_inhaber', 'betrag', 'payment', 'add_infos'],
        data() {
            return {
                input: {
                    kontoId: '',
                    ziel_iban: '',
                    ziel_bic: '',
                    ziel_inhaber: '',
                    betrag: '',
                    payment: '',
                    add_infos: ''
                },
                isLoading: false
            }
        },
        template: `
            <form>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Neue Transaction durchführen</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Konto">
                            <b-input
                                type="text"
                                v-model="input.kontoId"
                                placeholder="eigene KontoId"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Ziel Iban">
                            <b-input
                                type="text"
                                v-model="input.ziel_iban"
                                placeholder="Ziel IBAN"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Ziel Bic">
                            <b-input
                                type="text"
                                v-model="input.ziel_bic"
                                placeholder="Ziel BIC"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Ziel Inhaber">
                            <b-input
                                type="text"
                                v-model="input.ziel_inhaber"
                                placeholder="Max Mustermann"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Betrag">
                            <b-input
                                type="text"
                                v-model="input.betrag"
                                placeholder="+/- 0.00"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Zusätzliche Informationen">
                            <b-input
                                type="text"
                                v-model="input.add_infos"
                                placeholder="Zusätzliche Informationen"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Payment Provider">
                            <b-input
                                type="text"
                                v-model="input.payment"
                                placeholder="Zahl von 1-5"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-primary" @click="createNewTransaction">Neue Transaction anlegen</button>
                    </footer>
                </div>
            </form>
        `,
        methods: {
            async createNewTransaction() {
                const loadingComponent = this.$loading.open({
                    container: true
                });
                this.isLoading = true;

                this.transaction = await fetch("http://localhost:8000/createTransaction", {
                    method: "POST",
                    url: "http://localhost:8000",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        kontoId: this.input.kontoId,
                        ziel_iban: this.input.ziel_iban,
                        ziel_bic: this.input.ziel_bic,
                        ziel_inhaber: this.input.ziel_inhaber,
                        betrag: this.input.betrag,
                        paymentId: this.input.payment,
                        add_infos: this.input.add_infos
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error('Network response was not ok.');
                }).then(data => {
                    return Object.values(data);
                }).catch(error => {
                    this.transaction = [];
                });

                if (this.transaction) {
                    this.$toast.open({
                        duration: 4500,
                        message: `Successfully created Transaction`,
                        position: 'is-top-right',
                        type: 'is-success'
                    });

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

                this.$modal.open({
                    parent: this,
                    component: kontoInformationModal,
                    hasModalCard: false
                })
            }
        }
    };

    const kontoInformationModal = {
        data() {
            return {
                columns: [],
                data: [],
                isLoading: false
            }
        },
        components: {BTableColumn},
        template: `
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Konto Auszug</p>
                    </header>
                    <section class="modal-card-body">
                        <b-table striped hover :data="this.data" :columns="this.columns"></b-table>
                    </section>
                </div>
        `,
        methods: {
            async getKontoInformationGridData() {
                const loadingComponent = this.$loading.open({
                    container: true
                });
                this.isLoading = true;

                this.transaction = await fetch("http://localhost:8000/getTransactionInformation", {
                    method: "POST",
                    url: "http://localhost:8000",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: localStorage.getItem('userId'),
                        kontoId: localStorage.getItem('kontoId')
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error('Network response was not ok.');
                }).then(data => {
                    return Object.values(data);
                }).catch(error => {
                    this.transaction = [];
                });

                if (this.transaction) {
                    this.data = [];
                    this.transaction.forEach(item => {
                        this.data.push({
                            'Id': item.id,
                            'erstell_datum': item.erstellDatum,
                            'ziel_iban': item.zielIban,
                            'ziel_bic': item.zielBic,
                            'ziel_inhaber': item.zielInhaber,
                            'betrag': item.betrag,
                            'add_infos': item.addInfos,
                            'payment': item.payment,
                        });
                    });
                }

                if (empty(this.data)) {
                    this.$toast.open({
                        duration: 4500,
                        message: `No Transaction found!`,
                        position: 'is-top-right',
                        type: 'is-info'
                    });
                }

                loadingComponent.close();
                this.isLoading = false;
            },
            getKontoInformationGridColumns() {
                this.columns = [
                    {
                        field: 'erstell_datum',
                        label: 'Datum der Transaktion',
                    },
                    {
                        field: 'ziel_iban',
                        label: 'Ziel Iban',
                    },
                    {
                        field: 'ziel_bic',
                        label: 'Ziel Bic',
                    },
                    {
                        field: 'ziel_inhaber',
                        label: 'Ziel Inhaber',
                    },
                    {
                        field: 'betrag',
                        label: 'Betrag',
                    },
                    {
                        field: 'add_infos',
                        label: 'Zusätzliche Informationen',
                    },
                    {
                        field: 'payment',
                        label: 'Zahlart',
                    }
                ];
            },
        },
        beforeMount() {
            this.getKontoInformationGridData();
            this.getKontoInformationGridColumns();
        }
    };
</script>