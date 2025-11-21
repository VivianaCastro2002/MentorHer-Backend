module.exports = (sequelize, DataTypes) => {
  return sequelize.define('EncuestaPrivadaSesion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sesion_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    mentora_id: { type: DataTypes.INTEGER, allowNull: false },
    preparacion: { type: DataTypes.INTEGER, allowNull: true },
    compromiso: { type: DataTypes.INTEGER, allowNull: true },
    resultado: { type: DataTypes.INTEGER, allowNull: true },
    notas: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'encuestas_privadas_sesion',
    createdAt: 'creado_en',
    timestamps: true
  });
};
