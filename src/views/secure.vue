<template>
    <div id="home">
        <div id="flashMessage">
            <flash-message></flash-message>
        </div>

        <div class="container">
            <b-jumbotron header="Ihre Konten">
                <b-table striped dark hover :data="this.data" :columns="this.columns"></b-table>
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'secure',
        data() {
            return {
                konto: [],
                columns: [],
                data: []
            }
        },
        methods: {
            async getGridData() {
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

                this.konto.forEach(item => {
                    this.data.push({
                        'Guthaben': item.guthaben,
                        'Beschreibung': item.beschreibung,
                        'IBAN': item.iban,
                        'Inahber': item.inhaber,
                        'Kreditkarte': item.kreditkarte,
                        'GültigBis': item.gueltigBis,
                        'Aktiv': item.aktiv
                    });
                });
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
            }
        },
        beforeMount() {
            this.getGridData();
            this.getGridColumns();
        }
    }
</script>