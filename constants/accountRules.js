export const accountRules = {
  username: {
    minLength: 5
  },
  // email regex modified from https://www.w3resource.com/javascript/form/email-validation.php
  email: {
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 
  },
  password: {
    minLength: 5
  }
}

export default accountRules;
