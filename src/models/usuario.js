export default (sequelize, DataTypes) => {
  return sequelize.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(255), allowNull: false },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    contrasena_hash: { type: DataTypes.STRING(255), allowNull: false },
    rol: { 
      type: DataTypes.ENUM('admin', 'mentora', 'mentoreada'),
      allowNull: false,
      defaultValue: 'mentoreada'
    },
    avatar_url: { type: DataTypes.TEXT, allowNull: true },
    zona_horaria: { type: DataTypes.STRING(64), allowNull: true },
    creado_en: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    actualizado_en: { type: DataTypes.DATE, allowNull: true }
  }, {
    tableName: 'usuarios',
    timestamps: true,  
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en'
  });
};
