module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ArchivoSesion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sesion_id: { type: DataTypes.INTEGER, allowNull: false },
    nombre: { type: DataTypes.STRING(255), allowNull: true },
    url: { type: DataTypes.TEXT, allowNull: false },
    subido_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'archivos_sesion',
    timestamps: false
  });
};
