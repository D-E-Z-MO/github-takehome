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
      form: {
        invalid: false,
        invalidFields: [],
        submitted: false
      }
    }
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

  handleFormSubmit(event) {
    event.preventDefault();

    const requiredFields = [
      {value: this.state.profile.name, name: "name"},
      {value: this.state.profile.gender, name: "gender"},
      {value: this.state.profile.email, name: "email"},
      {value: this.state.profile.phone, name: "phone"}
    ];

    const emptyFields = requiredFields.filter((value) => (
      !Boolean(value.value)
    ));

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        invalidFields: emptyFields.map(f => f.name),
        invalid: Boolean(emptyFields.length),
        submitted: true
      }
    })

   

  }
  isFieldInvalid(name) {
    return !!this.state.form.invalidFields.find(field => field === name)
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
              className={`profile-form__field ${this.isFieldInvalid("name") ? "profile-form__field--invalid":"" }`} name="name" type="text"
            />
          </label>
          <label className="profile-form__row">
            Gender:
            <select
              value={this.state.profile.gender}
              onChange={(e) => {
                this.onChange('gender', e.target.value)
              }}
              className={`profile-form__field profile-form__select ${this.isFieldInvalid("gender") ? "profile-form__field--invalid":"" }` } name="gender"
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
              className={`profile-form__field ${this.isFieldInvalid("email") ? "profile-form__field--invalid":"" }`}
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
              className={`profile-form__field ${this.isFieldInvalid("phone") ? "profile-form__field--invalid":"" }`}
              name="phone"
              type="text"
            />
          </label>
          <div className="profile-form__row">
            <input type="submit" value="Save" />
          </div>
          <div className="profile-form__row">
            {this.state.form.invalid || this.state.form.submitted ? (
               <span
              
              className="profile-form__message"
            >
              {this.state.form.invalid ? `${this.state.form.invalidFields.map(capitalizeFirstLetter).join(", ")} cannot be empty` : "form submitted" }
            </span>
            ): null}
            
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
