export default (sequelize, DataTypes) => {
  return sequelize.define('SessionFeedback', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'session_id',
    },
    reviewerId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'reviewer_id',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'rating',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'comment',
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
    tableName: 'session_feedback',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { unique: true, fields: ['session_id', 'reviewer_id'] },
    ],
  });
};