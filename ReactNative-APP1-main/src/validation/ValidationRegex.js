const Regex = {
  email: {
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
    empty: 'Please enter email',
    error: 'Please enter valid email',
  },

  name: {
    pattern: /^[\w'\-,.][^!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    empty: 'Please enter name',
    error: 'Please enter valid name',
  },

  countryName: {
    pattern: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    empty: 'Please enter country name',
    error: 'Please enter valid country name',
  },

  bio: {
    pattern: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
    empty: 'Please enter bio',
    error: 'Please enter valid bio',
  },

  contact: {
    pattern: /^(\+[\d]{1,5}|0)?[0-9]\d{9}$/,
    empty: 'Please enter mobile number',
    error: 'Please enter valid number',
  },
  age: {
    pattern: /^(\+[\d]{1,2}|0)?[0-9]\d{1}$/,
    empty: 'Please enter your age',
    error: 'Please enter valid age',
  },
};

export default Regex;
