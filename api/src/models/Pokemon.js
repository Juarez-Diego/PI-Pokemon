const { DataTypes,Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.DECIMAL
    },
    attack: {
      type: DataTypes.DECIMAL
    },
    defense: {
      type: DataTypes.DECIMAL
    },
    speed: {
      type: DataTypes.DECIMAL
    },
    height: {
      type: DataTypes.DECIMAL
    },
    weight: {
      type: DataTypes.DECIMAL
    },
    image: {
      type: DataTypes.STRING
    }

  });
};
