module.exports = (sequelize, DataTypes) => {
  return sequelize.define('FeedbackSesion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sesion_id: { type: DataTypes.INTEGER, allowNull: false },
    reviewer_id: { type: DataTypes.INTEGER, allowNull: false },
    calificacion: { type: DataTypes.INTEGER, allowNull: true },
    comentario: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'feedback_sesion',
    timestamps: true,
    createdAt: 'creado_en',
    indexes: [
      { unique: true, fields: ['sesion_id','reviewer_id'] }
    ]
  });
};
