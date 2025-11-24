export default (sequelize, DataTypes) => {
  return sequelize.define('PerfilMentora', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    titulo: { type: DataTypes.STRING(255), allowNull: true },
    empresa: { type: DataTypes.STRING(255), allowNull: true },
    biografia: { type: DataTypes.TEXT, allowNull: true },
    nivel_rol: { type: DataTypes.STRING(64), allowNull: true },
    max_mentoreadas: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 3 },
    calificacion_promedio: { type: DataTypes.DECIMAL(3,2), allowNull: false, defaultValue: 0.00 },
    total_resenas: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    link_paper: { type: DataTypes.STRING(255), allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'perfiles_mentoras',
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
    timestamps: true
  });
};
