const USERNAME_MIN_LENGTH = 5;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 20;

const signup = {
  email: {
    presence: {
      message: "Email is required."
    },
    email: {
      message: "Email format is invalid."
    }
  },
  phoneNumber: {
    presence: {
      message: "Phone number is required."
    },
    format: {
      // TODO: This might need to be change to fit well with Twillio implementation
      pattern: /^[0-9]{10}$/,
      message: "Invalid format. Example: 4163403131"
    }
  },
  username: {
    presence: {
      allowEmpty: false,
      message: "Username is required."
    },
    length: {
      minimum: USERNAME_MIN_LENGTH,
      maximum: USERNAME_MAX_LENGTH,
      message: `Username must be ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} characters.`
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "Password is required."
    },
    length: {
      minimum: PASSWORD_MIN_LENGTH,
      maximum: PASSWORD_MAX_LENGTH,
      message: `Password must be ${PASSWORD_MIN_LENGTH}-${PASSWORD_MAX_LENGTH} characters.`
    }
  }
}

export default accountConstraints = {
  signup
};