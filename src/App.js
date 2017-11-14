    import React from 'react';
    import api from './test/stubAPI.js'
    import buttons from './config/buttonsConfig.js'

    class ContactForm extends React.Component {
      state = {
        name : '',
        address : '',
        phone_number : '',
      }

      handleAdd = (e) => {
        e.preventDefault();
        let name = this.state.name.trim();
        let address = this.state.address.trim();
        let phone_number = this.state.phone_number.trim()
        if(!name || !address || !phone_number){
          return;
        }
        this.props.addHandler(this.props.phone_number,name,address,phone_number);
        this.setState({
          name : '',
          address : '',
          phone_number : ''
        })
      }

      handleName = (e) => this.setState({name: e.target.value});
      
      handleAddress = (e) => this.setState({address: e.target.value});

      handlePhoneNum = (e) => this.setState({phone_number : e.target.value});
      render() {
        let fields = [
          <td key={'name'}><input type='text' className='form-control' value={this.state.name} onChange={this.handleName}/></td>,
          <td key={'address'}><input type='text' className='form-control' value={this.state.address} onChange={this.handleAddress}/></td>,
          <td key={'phone_number'}><input type='text' className='form-control' value={this.state.phone_number} onChange={this.handlePhoneNum}/></td>
         
        ];
        return (
          <tr>
            {fields}
            <td>
            <input type="button" className="btn btn-primary" value="Add" onClick={this.handleAdd}/>
            </td>
          </tr>
          )
      }
    }

       class Contact extends React.Component {
         state = {
          status : '',
          name: this.props.contact.name,
          address: this.props.contact.address,
          phone_number: this.props.contact.phone_number
        };


          handleEdit = () =>  this.setState({ status : 'edit'} );

          handleSave = (e) => {
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

          handleUndo = () => this.setState({status: ''});

          handleConfirm = (e) => {
             e.preventDefault();

              this.setState({status : ''})
              this.props.deleteHandler(this.props.contact.phone_number)
              }

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
               }  

                        if (this.state.status === 'delete'){
                          activeButtons = buttons.delete ;
                          leftButtonHandler = this.handleUndo ;
                          rightButtonHandler = this.handleConfirm;
                          fields = [
                          ]
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
                    updateHandler={this.props.updateHandler} deleteHandler={this.props.deleteHandler} addHandler={this.props.addHandler}/> ; 
              });
                
          return (
              <tbody >
                  {contactRows}
                  <ContactForm updateHandler={this.props.updateHandler}
                  deleteHandler={this.props.deleteHandler}
                  addHandler={this.props.addHandler}/>
              </tbody>
            ) ;
        }
    }

    class ContactsTable extends React.Component {
      render() {
          return (
            <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th></th>
                  <th></th>
                  </tr>
                </thead>
                  <ContactList contacts={this.props.contacts} 
                  updateHandler ={this.props.updateHandler} 
                  deleteHandler ={this.props.deleteHandler} 
                  addHandler ={this.props.addHandler}/>
            </table>
            );
      }
    }

    class ContactsApp extends React.Component {
      updateContact = (key, n, a, p) => {
            api.update(key,n,a,p); 
            this.setState({}); 
          }

      deleteContact = (key, n, a, p) => {
        api.delete(key,n, a,p);
        api.update;
        this.setState({});
        }

      addContact =(key,n,a,p) => {
        api.add(n,a,p);
        api.update;
        this.setState({});
      }
    
      render() {
          var contacts =api.getAll();
          return (
                <div>
                   <h1>Contact List.</h1>
                   <ContactsTable contacts={contacts}
                      updateHandler={this.updateContact}
                      deleteHandler={this.deleteContact}  
                      addHandler={this.addContact} />
                </div>
          );
      }
    }

    export default ContactsApp;