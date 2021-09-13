import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './profile.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile,
      name: props.name
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.formMessageRef = React.createRef();
  }

  onChange(key, value){
    this.setState({
      ...this.state,
      profile: {
        ...this.state.profile,
        [key]: value
      }
    })
  }

  removeInvalidClasses(requiredFields) {
    requiredFields.forEach((element) => {
      element.classList.remove('profile-form__field--invalid');
    });

    this.formMessageRef.current.innerHTML = '';
    this.formMessageRef.current.classList.remove('profile-form__message--invalid');
  }

  addInvalidClassesAndValidationMessage(emptyFields) {
    const emptyFieldNames = emptyFields.map((element) => element.name);

    this.formMessageRef.current.classList.add('profile-form__message--invalid');
    this.formMessageRef.current.innerHTML = capitalizeFirstLetter(`${emptyFieldNames.join(', ')} can not be blank`);
  }

  showFormSuccess() {
    this.formMessageRef.current.innerHTML = 'Form submitted!';
  }

  handleFormSubmit(event) {
    event.preventDefault();

    const requiredFields = [
      event.target.name,
      event.target.gender,
      event.target.email,
      event.target.phone
    ];

    const emptyFields = requiredFields.filter((element) => (
      !Boolean(element.value)
    ));

    this.removeInvalidClasses(requiredFields);

    if (emptyFields.length) {
      this.addInvalidClassesAndValidationMessage(emptyFields);

      emptyFields.forEach((element) => {
        element.classList.add('profile-form__field--invalid');
      });

    } else {
      this.showFormSuccess();

      console.log({
        name: event.target.name.value,
        gender: event.target.gender.value,
        email: event.target.email.value,
        phone: event.target.phone.value
      });
    }

  }

  render() {
    return (
      <div className="app">
        <h1>{this.props.name}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label className="profile-form__row">
            Name:
            <input
              value={this.state.profile.name}
              onChange={(e) => {
                this.onChange('name', e.target.value)
              }}
              className="profile-form__field" name="name" type="text"
            />
          </label>
          <label className="profile-form__row">
            Gender:
            <select
              value={this.state.profile.gender}
              onChange={(e) => {
                this.onChange('gender', e.target.value)
              }}
              className="profile-form__field profile-form__select" name="gender"
            >
              <option value="unspecified">Unspecified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label className="profile-form__row">
            Email:
            <input
              value={this.state.profile.email}
              onChange={(e) => {
                this.onChange('email', e.target.value)
              }}
              className="profile-form__field"
              name="email"
              type="text"
            />
          </label>
          <label className="profile-form__row">
            Phone:
            <input
              value={this.state.profile.phone}
              onChange={(e) => {
                this.onChange('phone', e.target.value)
              }}
              className="profile-form__field"
              name="phone"
              type="text"
            />
          </label>
          <div className="profile-form__row">
            <input type="submit" value="Save" />
          </div>
          <div className="profile-form__row">
            <span
              ref={this.formMessageRef}
              className="profile-form__message"
            />
          </div>
        </form>
      </div>
    );
  }
}

Profile.defaultProps = {
  profile: {
    name: '',
    gender: '',
    email: '',
    phone: ''
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
}

export default Profile;
