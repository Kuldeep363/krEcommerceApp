export const validateFormData = (formData: {
  email: string;
  password: string;
}): {
  status: boolean;
  msg: string;
} => {
  const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!formData.email && !formData.password) {
    return {
      status: false,
      msg: 'Please enter email and password',
    };
  }
  if (!formData.email) {
    return {
      status: false,
      msg: 'Please enter email',
    };
  } else if (emailRegx.test(formData.email) === false) {
    return {
      status: false,
      msg: 'Please enter correct email',
    };
  }
  if (!formData.password) {
    return {
      status: false,
      msg: 'Please enter password',
    };
  }
  return {
    status: true,
    msg: '',
  };
};
