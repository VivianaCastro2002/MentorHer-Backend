export default (sequelize, DataTypes) => {
  return sequelize.define('Paper', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false},
    titulo: { type: DataTypes.STRING(255), allowNull: true },
    link: { type: DataTypes.STRING(255), allowNull: true }
  }, {
    tableName: 'papers',
    timestamps: false
  });
};