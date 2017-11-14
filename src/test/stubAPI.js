import _ from 'lodash';

    class StubAPI {

        constructor() {
            this.contacts = [
                {
                    'name': 'Contact 1',
                    'address': '123 Test St',
                    'phone_number': '132-3212'
                },

                {
                    'name': 'Contact 2',
                    'address': '23 Main St',
                    'phone_number': '934-4329'
                }, 

                {
                    'name': 'Contact 3',
                    'address': '4 Lower St',
                    'phone_number': '432-5832'
                },

                {
                    'name': 'Contact 4',
                    'address': '49 Upper Street',
                    'phone_number': '934-4290'
                }
            ] ; 
        }

        delete(k) {
            let elements = _.remove(this.contacts, 
                (contact) => contact.phone_number === k
            );
            return elements; 
        }
        getAll() {
            return this.contacts ;
        }

        add(n,a,p) {
            let len = this.contacts.length ;
            let newLen = this.contacts.push({
                name: n, address : a, phone_number: p }) ;
            return newLen > len ;
        }

        update(key,n,a,p) {
            var index = _.findIndex(this.contacts, 
                (contact) => contact.phone_number === key
            );      
            if (index !== -1) {
                this.contacts.splice(index, 1, 
                    {name: n, address: a, phone_number: p});
                return true ;
            }
            return false ;
        }

    }

    export default (new StubAPI() );