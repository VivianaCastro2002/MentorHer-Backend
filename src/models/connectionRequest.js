export default (sequelize, DataTypes) => {
  return sequelize.define('ConnectionRequest', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    menteeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'mentee_id',
    },
    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'mentor_id',
    },
    motivationLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'motivation_letter',
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
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
    respondedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'responded_at',
    },
    responseMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'response_message',
    },
  }, {
    tableName: 'connection_requests',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
};