<template>
    <div id="home">
        <div id="flashMessage">
            <flash-message></flash-message>
        </div>

        <div class="wrapper">
            <div id="formContent">
                <h1>Secure Area</h1>

                <b-table :data="data" :columns="columns"></b-table>
                <b-table :data="getGridData()" :columns="getGridColumns()"></b-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'secure',
        data() {
            return {
                user: [],
                columns: [
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
                        field: 'Gültig Bis',
                        label: 'Gültig Bis',
                    },
                    {
                        field: 'Aktiv',
                        label: 'Aktiv',
                    }
                ],
                data: [
                    {
                        'Guthaben': 'Jesse',
                        'Beschreibung': 'Simmons',
                        'IBAN': '2016-10-15 13:43:27',
                        'Inahber': 'Male',
                        'Kreditkarte': 'Male',
                        'Gueltig Bis': 'Male',
                        'Aktiv': 'Male'
                    },
                    {
                        'Guthaben': 'Jesse',
                        'Beschreibung': 'Simmons',
                        'IBAN': '2016-10-15 13:43:27',
                        'Inahber': 'Male',
                        'Kreditkarte': 'Male',
                        'Gueltig Bis': 'Male',
                        'Aktiv': 'Male'
                    },
                    {
                        'Guthaben': 'Jesse',
                        'Beschreibung': 'Simmons',
                        'IBAN': '2016-10-15 13:43:27',
                        'Inahber': 'Male',
                        'Kreditkarte': 'Male',
                        'Gueltig Bis': 'Male',
                        'Aktiv': 'Male'
                    },
                    {
                        'Guthaben': 'Jesse',
                        'Beschreibung': 'Simmons',
                        'IBAN': '2016-10-15 13:43:27',
                        'Inahber': 'Male',
                        'Kreditkarte': 'Male',
                        'Gueltig Bis': 'Male',
                        'Aktiv': 'Male'
                    },
                    {
                        'Guthaben': 'Jesse',
                        'Beschreibung': 'Simmons',
                        'IBAN': '2016-10-15 13:43:27',
                        'Inahber': 'Male',
                        'Kreditkarte': 'Male',
                        'Gueltig Bis': 'Male',
                        'Aktiv': 'Male'
                    }
                ]
            }
        },
        methods: {
            async getGridData() {
                this.konto = await fetch("http://localhost:8000/getKontoByUser", {
                    method: "GET",
                    url: "http://localhost:8000",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.user.id,
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    throw new Error('Network response was not ok.');
                }).then(data => {
                    return JSON.stringify(data);
                }).catch(error => {
                    this.konto = [];
                });

                if (this.konto) {

                }
                return [];
            },
            getGridColumns() {
                return [];
            }
        }
    }
</script>