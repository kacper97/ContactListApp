 import _ from 'lodash';

    class StubAPI {

        constructor() {
            this.contacts = [] ; 
        }

        initialize(contacts) {    // NEW 
          this.contacts = contacts
          return null; 
         }

        delete(k) {
          let elements = _.remove(this.contacts, 
              (contact) => contact._id === k
          );
          return elements; 
      }

        getAll() {
            return this.contacts ;
        }

        add(id,n,a,p) {
          let len = this.contacts.length ;
          let newLen = this.contacts.push({
              _id: id, name: n, address : a, phone_number: p }) ;
          return newLen > len ;
      }

         update(id,n,a,p) {
          var index = _.findIndex(this.contacts, 
              (contact) => contact._id === id
          );      
          if (index !== -1) {
              this.contacts.splice(index, 1, 
                  { _id: id, name: n, address: a, phone_number: p});
              return true ;
          }
          return false ;
      }

    }

    export default (new StubAPI() );