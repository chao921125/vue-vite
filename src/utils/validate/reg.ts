export default {
  number: /^\d+$/,
  phone: /^1\\d{10}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/,
  userName: /^[a-zA-Z0-9]\w+/,
  password: /^[a-zA-Z0-9]\w+/,
  html: /<(\S*?)[^>]*>.*?|<.*?\/>/,
  url: /^(http?|https?|ws?|ftp?|ftps?):\/\/\S*$/,
  code: /^[1-9]\d{5}(?!\d)$/,
  carCode: /^[-\u4e00-\u9fa5][A-Z]:[A-Z0-9]{5}$/,
};
