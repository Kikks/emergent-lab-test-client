export const isEmpty = (string) => (string.trim() === "" ? true : false);

export const isEmail = (email) => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return email.match(regex);
};

export const validateLoginInputs = ({ email, password }) => {
  let valid = true;
  const errors = {
    email: "",
    password: "",
  };

  if (isEmpty(email)) {
    errors.email = "Email cannot be empty";
  } else if (!isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (isEmpty(password)) {
    errors.password = "Password cannot be empty";
  } else if (password.trim().length < 6) {
    errors.password = "Password must be longer than 5 characters";
  }

  for (const item of Object.values(errors)) {
    if (item.trim() !== "") {
      valid = false;
    }
  }

  return {
    valid,
    errors,
  };
};

export const validateRegisterInputs = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  let valid = true;
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  if (isEmpty(firstName)) {
    errors.firstName = "First name must not be empty";
  }
  if (isEmpty(lastName)) {
    errors.lastName = "Last name must not be empty";
  }

  if (isEmpty(email)) {
    errors.email = "Email cannot be empty";
  } else if (!isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (isEmpty(password)) {
    errors.password = "Password cannot be empty";
  } else if (password.trim().length < 6) {
    errors.password = "Password must be longer than 5 characters";
  }

  for (const item of Object.values(errors)) {
    if (item.trim() !== "") {
      valid = false;
    }
  }

  return {
    valid,
    errors,
  };
};

export const validateCreateEmployeeInputs = ({
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  let valid = true;
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  if (isEmpty(firstName)) {
    errors.firstName = "First name must not be empty";
  }
  if (isEmpty(lastName)) {
    errors.lastName = "Last name must not be empty";
  }

  if (isEmpty(email)) {
    errors.email = "Email cannot be empty";
  } else if (!isEmail(email)) {
    errors.email = "Invalid Email";
  }

  if (isEmpty(phoneNumber)) {
    errors.phoneNumber = "PhoneNumber cannot be empty";
  }

  for (const item of Object.values(errors)) {
    if (item.trim() !== "") {
      valid = false;
    }
  }

  return {
    valid,
    errors,
  };
};
