export default (sequelize, DataTypes) => {
  return sequelize.define('UserLink', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
    type: {
      type: DataTypes.ENUM('portfolio', 'linkedin', 'github', 'twitter', 'website', 'other'),
      allowNull: false,
    },
    url: { type: DataTypes.TEXT, allowNull: false },
    label: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: 'label',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  }, {
    tableName: 'user_links',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { unique: true, fields: ['user_id', 'type', 'url'] },
    ],
  });
};