import React from 'react';
 import api from './test/stubAPI.js'  // NEW
 import buttons from './config/buttonsConfig';
  import request from 'superagent' ; 
  
 
    class ContactForm extends React.Component {
       state = {
          name: this.name,
          address: this.address,
          phone_number: this.phone_number
        };
      handleAdd=(e) => {
         e.preventDefault();
        let name = this.state.name.trim();
        let address = this.state.address.trim();
        let phone_number = this.state.phone_number.trim();
        if (!name || !address || !phone_number) {
          return;
        }
       
        this.props.addHandler(name,address,phone_number);
          this.setState({name: '', address: '', phone_number: ''})
      };
 
       handleNameChange = (e) =>  this.setState({name: e.target.value});
 
       handleAddressChange = (e) => this.setState({address: e.target.value});
 
       handlePhoneNumChange = (e) =>  this.setState({phone_number: e.target.value});
 
      render() {
         
        return (
          <tr>
            <td >
            <input type="text"  placeholder="Name"
                     value={this.state.name} className="form-control" onChange={this.handleNameChange} />
            </td>
            <td  >
            <input type="text"   placeholder="Address"
                     value={this.state.address} className="form-control" onChange={this.handleAddressChange}/>
            </td>
            <td >
            <input type="text"  placeholder="Phone No."
                     value={this.state.phone_number} className="form-control" onChange={this.handlePhoneNumChange}/>
            </td>
            <td>
            <input type="button" onClick={this.handleAdd} className="btn btn-primary" value="Add"/>
 
            </td>
          </tr>
          )
      }
    }
// eslint-disable-next-line
    class Contact extends React.Component {
       state = {
          status : '',
          name: this.props.contact.name,
          address: this.props.contact.address,
          phone_number: this.props.contact.phone_number
        };
        handleEdit = () =>  this.setState({ status : 'edit'} );
 
          handleSave = (e) =>  {
        e.preventDefault();
        let name = this.state.name.trim();
        let address = this.state.address.trim();
        let phone_number = this.state.phone_number.trim();
        if (!name || !address || !phone_number) {
          return;
        }
        this.setState({status : ''} )
        this.props.updateHandler(this.props.contact.phone_number,
                 name,address,phone_number);
      };                 
 
          handleCancel = function() {
              this.setState({ status : '', 
                    name: this.props.contact.name,
                    address: this.props.contact.address,
                    phone_number: this.props.contact.phone_number} ) ;
          }.bind(this);    // Alternative to arrow function
 
          handleNameChange = (e) =>  this.setState({name: e.target.value});
 
          handleAddressChange = (e) => this.setState({address: e.target.value});
 
          handlePhoneNumChange = (e) =>  this.setState({phone_number: e.target.value});
 
           handleDelete = () =>  this.setState({ status : 'delete'} );
 
           handleUndo = (e) => this.setState({status:''});
 
           handleConfirm= (e) => {
            this.setState({status : ''});
            this.props.deleteHandler(this.props.contact.phone_number);
           };
 
            
 
        render() {
      let activeButtons = buttons.normal ;
             let leftButtonHandler = this.handleEdit ;
             let rightButtonHandler = this.handleDelete ;
             let fields = [
                     <td key={'name'} >{this.state.name}</td>,
                      <td key={'address'}>{this.state.address}</td>,
                      <td key={'phone_number'}>{this.state.phone_number}</td>
                   ] ; 
 
                   if (this.state.status === 'edit' ) {
                   activeButtons = buttons.edit ;
                   leftButtonHandler = this.handleSave;
                   rightButtonHandler = this.handleCancel ;
                   fields = [
                      <td key={'name'}><input type="text" className="form-control"
                         value={this.state.name}
                         onChange={this.handleNameChange} /> </td>,
                      <td key={'address'}><input type="text" className="form-control"
                         value={this.state.address}
                         onChange={this.handleAddressChange} /> </td>,
                      <td key={'phone_number'}><input type="text" className="form-control"
                         value={this.state.phone_number}
                         onChange={this.handlePhoneNumChange} /> </td>,
                   ] ;
               } ;   
 
               if (this.state.status === 'delete' ) {
                   activeButtons = buttons.delete ;
                   leftButtonHandler = this.handleUndo;
                   rightButtonHandler = this.handleConfirm ;
                   fields = [
                     <td key={'name'} >{this.state.name}</td>,
                      <td key={'address'}>{this.state.address}</td>,
                      <td key={'phone_number'}>{this.state.phone_number}</td>
                   ] ;
               }    
                
              return (
                    <tr >
                      {fields}
                      <td>
                          <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                 value={activeButtons.leftButtonVal}
                                 onClick={leftButtonHandler} />
                      </td>
                      <td>
                         <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                               value={activeButtons.rightButtonVal} 
                               onClick={rightButtonHandler} />
                      </td>
                      </tr>
                   ) ; 
          }
    }
 
    class ContactList extends React.Component {
      render() {
         let contactRows =   this.props.contacts.map( (c) => {
              return <Contact key={c.phone_number} contact={c} 
                    updateHandler={this.props.updateHandler} 
                    deleteHandler={this.props.deleteHandler}
                      
                    /> ; // CHANGE 
              });
          return (
              <tbody >
                  {contactRows}
                  <ContactForm addHandler={this.props.addHandler}/>
              </tbody>
            ) ;
        }
    }
 
    class ContactsTable extends React.Component {
      render() {
          return (
            <table className="table table-bordered">
                  <ContactList contacts={this.props.contacts}  
                updateHandler={this.props.updateHandler}
              deleteHandler={this.props.deleteHandler}
              addHandler={this.props.addHandler} 
            />   {/* CHANGE */} 
            </table>
            );
      }
    }
 
   class ContactsApp extends React.Component {
       componentDidMount() {
         request.get('http://localhost:3000/api/contacts')
            .end((error, res) => {
              if (res) {
                var contacts = JSON.parse(res.text);
                api.initialize(contacts);
                this.setState({}) ;                
              } else {
                console.log(error );
              }
            }) ; 
        }
        updateContact = (key, n, a, p) => {
        request
           .put('http://localhost:3000/api/contacts/' + key )
           .send({ name: n, address: a, phone_number:p })
           .set('Content-Type', 'application/json')
           .end((err, res) => {
             if (err || !res.ok) {
               alert('Error updating');
             } else {
                api.update(key,n,a,p); 
                this.setState({});      
             }
           });  
    };
       deleteContact = (k) => {
        request
          .del('http://localhost:3000/api/contacts/' + k)
          .end( (err, res) => {
              if (err || !res.ok) {
                 alert('Error deleting contact');
               } else {
                  api.delete(k);
                  this.setState( {} ) ;
               } 
          });
    };
          
         addContact = (n, a, p) => {
        request
           .post('http://localhost:3000/api/contacts')
           .send({ name: n, address: a, phone_number:p })
           .set('Content-Type', 'application/json')
           .end( (err, res) => {
               if (err || !res.ok) {
                  alert('Error adding contact');
               } else {
                   let newContact = JSON.parse(res.text);
                   api.add(newContact.name, 
                        newContact.address, 
                        newContact.phone_number);
                   this.setState({}) ;    
               }
            } ); 
    };
        render() {
        var contacts = api.getAll() ;   
          return (
                <div>
                   <h1> Contact List</h1>
                   <ContactsTable contacts={contacts} 
                   updateHandler={this.updateContact} 
                   deleteHandler={this.deleteContact}
                   addHandler={this.addContact} />  
                </div>
          );
      }
    }
 
    export default ContactsApp;