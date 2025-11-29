export default (sequelize, DataTypes) => {
  return sequelize.define('Paper', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
    title: { type: DataTypes.STRING(255), allowNull: true, field: 'title' },
    link: { type: DataTypes.STRING(255), allowNull: true },
  }, {
    tableName: 'papers',
    schema: 'models',
    timestamps: false,
  });
};