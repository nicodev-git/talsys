import { Button, notification } from 'antd';

const paidiemAlert = (type, title, message) => {
  notification[type]({
    message: title,
    description: message
  });
};

export default paidiemAlert;