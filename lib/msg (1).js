const {
    DataTypes
  } = require("sequelize");
  const config = require("./setting");
  const msgs = setting.DATABASE.define("msgs", {
    jid: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  module.exports = msgs;
