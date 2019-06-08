const Notification = require('../models/Notification');

/**
 * @description Get the list of notifications
 * @returns {res}
 */
exports.index = async (req, res) => {
  let {id} = req.query;
  let response = await Notification.find({ $or:[ {sentBy: id}, {recipients: {$all: [id]}}] }).populate('sentBy');  
  
  return res.json({
    success: true,
    data: response
  });
};

/**
 * @description Store new notification resource
 * @returns {res}
 */
exports.store = async (req, res) => {
  let {body} = req;
  
  const response = await Notification.create(body);
  
  return res.json({
    success: true,
    data: response
  });
};

/**
 * @description Get the notification resource
 * @returns {res}
 */
exports.edit = async (req, res) => {
  const {id} = req.params;
  
  const response = await Notification.findOne({_id: id}).populate('recipients').populate('sentBy');
  
  return res.json({
    success: true,
    data: response
  });
};

/**
 * @description Update the notification resource
 * @returns {res}
 */
exports.update = async (req, res) => {
  const {id} = req.params;
  
  const response = await Notification.findByIdAndUpdate(id, req.body);
  
  return res.json({
    success: true,
    data: {
      _id: response._id
    }
  });
};

/**
 * @description Delete the notification resource
 * @returns {res}
 */
exports.delete = async (req, res) => {
  console.log("etetet: ", req.params);
  const {id} = req.params;
  console.log("deleted", id);
  
  // const response = await Notification.deleteOne({_id: ids});
  let response = await Notification.findOne({_id: id}).remove();
  
  return res.json({
    success: true,
    data: response
  });
};
