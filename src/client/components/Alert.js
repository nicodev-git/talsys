import { Button, notification } from 'antd'

const AntNotification = (type, title, message) => {
  notification[type]({
    message: title,
    description: message
  });
};

export default AntNotification;