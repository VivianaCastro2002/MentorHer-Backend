export default (sequelize, DataTypes) => {
  return sequelize.define('PerfilMentoreada', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    titulo: { type: DataTypes.STRING(255), allowNull: true },
    empresa: { type: DataTypes.STRING(255), allowNull: true },
    biografia: { type: DataTypes.TEXT, allowNull: true },
    nivel_rol: { type: DataTypes.STRING(64), allowNull: true },
    pronombres: { type: DataTypes.STRING(64), allowNull: true },
    neurodivergencia: { type: DataTypes.BOOLEAN, allowNull: true },
    neurodivergencia_detalles: { type: DataTypes.TEXT, allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'perfiles_mentoreadas',
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    timestamps: true
  });
};