import React from 'react';
import './App.css';

localStorage.clear();
const admin = { email: 'crackeraki@gmail.com', password: 'crackeraki@gmail.com', name: 'Den', bio: 'denbio', phone: 'denphone', avatar: 'avatar', id: Math.random() };
const user = { email: 'user', password: 'user', name: 'user', bio: 'bio', phone: 'userphone', avatar: 'avatar', id: Math.random() };
localStorage.setItem('crackeraki@gmail.com', JSON.stringify(admin));
localStorage.setItem('user', JSON.stringify(user));


export default class App extends React.Component {

  state = {
    render: 'login',
    registerStatus: 'Welcome!',
    key: '',
    email: '',
    password: '',
    name: '',
    bio: '',
    phone: '',
    avatar: ''//!!!!!!!!!!
  }

  accounts = [];
  target = undefined;
  email = ""
  password = ""
  nameSetting = ""
  bioSetting = ""
  phoneSetting = ""
  avatarSetting = "" //!!!!!!!!!


  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
    this.email = e.target.value;
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
    this.password = e.target.value;
  }

  imgToDataURL = (file) => {
    return new Promise(resolve => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const img = new Image();
      img.onload = function () {
        console.log(context);
        context.drawImage(img, img.width, img.height);
        resolve(context.imgToDataURL(file.type), 'the image is drawn');
      }
      img.src = URL.createObjectURL(file);
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      console.log(JSON.parse(localStorage.getItem(key)))
      this.accounts.push(JSON.parse(localStorage.getItem(key)));
    }
    let acc = {};
    console.log(this.accounts)

    if (this.email === 'crackeraki@gmail.com' && this.password === 'crackeraki@gmail.com') {
      this.setState({
        render: 'admin',
        registerStatus: 'Admin page',
        key: 'crackeraki@gmail.com',
        name: JSON.parse(localStorage.getItem('crackeraki@gmail.com')).name,
        bio: JSON.parse(localStorage.getItem('crackeraki@gmail.com')).bio,
        phone: JSON.parse(localStorage.getItem('crackeraki@gmail.com')).phone,
        //+avatar
      });
    }
    else {
      if (this.accounts.find(account => this.email === account.email && this.password === account.password )) {
        let acc = this.accounts.find(account => this.email === account.email && this.password === account.password )
        this.setState({
          email: acc.email,
          password: acc.password,
          name: acc.name,
          bio: acc.bio,
          phone: acc.phone,
          key: this.email
          //+avatar
        })
        this.setState({ registerStatus: 'Welcome!', render: 'account' })
      }
      else {
        this.setState({
          key: this.email,
          email: this.email,
          password: this.password,
          name: 'undef',
          bio: 'undef',
          phone: 'undef',
          //+avatar
          registerStatus: 'You are registered now!',
          render: 'new account'
        })
        let newacc = { email: this.state.email, password: this.state.password, name: this.state.name, bio: this.state.bio, phone: this.state.phone, avatar: this.state.avatar, id: Math.random() }
        localStorage.setItem(this.email, JSON.stringify(newacc));
        console.log('new user', localStorage.getItem(this.email))
      }
    }
  }

  handleImgUpload = (e) => {
    console.log(this.imgToDataURL(e.target.files[0]));
  }

  handleNameSetting = (e) => {
    this.nameSetting = e.target.value;
    this.target = e.target;
  }
  submitName = (e) => {
    e.preventDefault();
    localStorage.removeItem(this.state.key)
    localStorage.setItem(this.state.key, JSON.stringify({
      name: this.nameSetting,
      bio: this.state.bio,
      phone: this.state.phone,
      avatar: 'undef'
    }))
    this.setState({
      name: JSON.parse(localStorage.getItem(this.state.key)).name,
    })
    this.accounts = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      this.accounts.push(JSON.parse(localStorage.getItem(key)));
    }
    this.target.value = ''
    this.nameSetting = ''
  }

  handleBioSetting = (e) => {
    this.bioSetting = e.target.value;
    this.target = e.target;
  }
  submitBio = (e) => {
    e.preventDefault();
    localStorage.removeItem(this.state.key)
    localStorage.setItem(this.state.key, JSON.stringify({
      name: this.state.name,
      bio: this.bioSetting,
      phone: this.state.phone,
      avatar: 'undef'
    }))
    this.setState({
      bio: JSON.parse(localStorage.getItem(this.state.key)).bio,
    })
    this.accounts = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      this.accounts.push(JSON.parse(localStorage.getItem(key)));
    }
    this.target.value = ''
    this.bioSetting = ''
  }

  handlePhoneSetting = (e) => {
    this.phoneSetting = e.target.value;
    this.target = e.target;
  }
  submitPhone = (e) => {
    e.preventDefault();
    localStorage.removeItem(this.state.key)
    localStorage.setItem(this.state.key, JSON.stringify({
      name: this.state.name,
      bio: this.state.bio,
      phone: this.phoneSetting,
      avatar: 'undef'
    }))
    this.setState({
      phone: JSON.parse(localStorage.getItem(this.state.key)).phone,
    })
    this.accounts = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      this.accounts.push(JSON.parse(localStorage.getItem(key)));
    }
    this.target.value = ''
    this.phoneSetting = ''
  }

  handleLogoutClick = () => {
    this.setState({
      render: 'login',
      registerStatus: '',
      key: '',
      email: '',
      password: '',
      name: '',
      bio: '',
      phone: '',
      avatar: ''
    });
    this.accounts = [];
    this.target = undefined;
    this.email = ""
    this.password = ""
    this.nameSetting = ""
    this.bioSetting = ""
    this.phoneSetting = ""
    this.avatarSetting = ""
  }

  refreshAccounts = () => {
    this.accounts = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      this.accounts.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  render() {
    if (this.state.render === 'account') {
      return (
        <div className="app">
          <div className="wrapper">
            <div className="account">
              <div className="status">
                <h3>{this.state.registerStatus}</h3>
              </div>
              <div className="name">
                <h3>Name: {this.state.name} </h3>
                <form className="setting" onSubmit={this.submitName}>
                  <input type="text" placeholder="Set name" onChange={this.handleNameSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="bio">
                <h3>Bio: {this.state.bio}</h3>
                <form className="setting" onSubmit={this.submitBio}>
                  <input type="text" placeholder="Set bio" onChange={this.handleBioSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="phone">
                <h3>Phone: {this.state.phone}</h3>
                <form className="setting" onSubmit={this.submitPhone}>
                  <input type="text" placeholder="Set phone" onChange={this.handlePhoneSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="avatar">
                <h3>Avatar: {this.state.avatar}</h3>
                <form className="setting" >
                  <input type="file" onChange={this.handleImgUpload} />
                </form>
              </div>
              <div className="logout">
                <input type="button" value="Log Out" onClick={this.handleLogoutClick} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.render === 'login') {
      return (
        <div className="app">
          <div className="wrapper">
            <div className="login">
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <input type="text" placeholder="Email" onChange={this.handleEmailChange} required />
                  <input type="password" placeholder="Password" onChange={this.handlePasswordChange} required />
                  <input type="submit" value='Submit' />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else if (this.state.render === 'admin') {
      return (
        <div className="app">
          <div className="wrapper">
            <div className="account">
              <div className="status">
                <h3>{this.state.registerStatus}</h3>
              </div>
              <div className="name">
                <h3>Name: {this.state.name} </h3>
                <form className="setting" onSubmit={this.submitName}>
                  <input type="text" placeholder="Set name" onChange={this.handleNameSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="bio">
                <h3>Bio: {this.state.bio}</h3>
                <form className="setting" onSubmit={this.submitBio}>
                  <input type="text" placeholder="Set bio" onChange={this.handleBioSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="phone">
                <h3>Phone: {this.state.phone}</h3>
                <form className="setting" onSubmit={this.submitPhone}>
                  <input type="text" placeholder="Set phone" onChange={this.handlePhoneSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="avatar">
                <h3>Avatar: {this.state.avatar}</h3>
                <form className="setting" >
                  <input type="file" onChange={this.handleImgUpload} />
                </form>
              </div>
              <div className="accounts">
                <ul>
                  {this.refreshAccounts()}
                  {this.accounts.map((account, index) => {
                    return (
                      <li key={`${account.id}+${index}`}>
                        <h3>
                          Name:{account.name}
                        </h3>
                        <h3>
                          Phone:{account.phone}
                        </h3>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="logout">
                <input type="button" value="Log Out" onClick={this.handleLogoutClick} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.render === 'new account') {
      return (
        <div className="app">
          <div className="wrapper">
            <div className="account">
              <div className="status">
                <h3>{this.state.registerStatus}</h3>
              </div>
              <div className="name">
                <h3>Name: {this.state.name} </h3>
                <form className="setting" onSubmit={this.submitName}>
                  <input type="text" placeholder="Set name" onChange={this.handleNameSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="bio">
                <h3>Bio: {this.state.bio}</h3>
                <form className="setting" onSubmit={this.submitBio}>
                  <input type="text" placeholder="Set bio" onChange={this.handleBioSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="phone">
                <h3>Phone: {this.state.phone}</h3>
                <form className="setting" onSubmit={this.submitPhone}>
                  <input type="text" placeholder="Set phone" onChange={this.handlePhoneSetting} />
                  <input type="submit" value="Set" />
                </form>
              </div>
              <div className="avatar">
                <h3>Avatar: {this.state.avatar}</h3>
                <form className="setting" >
                  <input type="file" onChange={this.handleImgUpload} />
                </form>
              </div>
              <div className="logout">
                <input type="button" value="Log Out" onClick={this.handleLogoutClick} />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}


