const USERNAME_MIN_LENGTH = 5;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 20;

export const accountRules = {
  // email regex modified from https://www.w3resource.com/javascript/form/email-validation.php
  email: {
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 
  },
  phoneNumber: {
    regex: /^[0-9]{10}$/
  },
  username: {
    regex: new RegExp(`^\\w{${USERNAME_MIN_LENGTH},${USERNAME_MAX_LENGTH}}$`)
  },
  password: {
    regex: new RegExp(`^\\w{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`)
  }
}

export default accountRules;
