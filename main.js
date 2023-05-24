const app = Vue.createApp({
    data(){
        return{
            searchText: '',
            firstName: '',
            lastName: '',
            email: '',
            city: '',
            picture: '',
            listContacts: [],
            loading: true
        }
    },

    computed: {
        listResult(){
            if(this.searchText){
                return this.listContacts.filter(contact => {
                    return contact.firstName.toLowerCase().includes(this.searchText.toLowerCase());
                });
            }else{
                return this.listContacts;
            }
        }
    },

    async mounted(){
        await this.getData();
        this.loading = false;
    },

    methods: {
        removeContact(index){
            this.listContacts.splice(index, 1)
        },

        async getData(){
            let response = await fetch('https://randomuser.me/api/?results=15');
            let data = await response.json();

            
            this.listContacts = [];

            data.results.forEach(item => {
                var contact = new Object();

                contact.picture = item.picture.large
                contact.firstName = item.name.first;
                contact.lastName = item.name.last;
                contact.email = item.email;
                contact.city = item.location.city

                this.listContacts.push(contact)
            });
        },
    }
})


app.mount('#app');