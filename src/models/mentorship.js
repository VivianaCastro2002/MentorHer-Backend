export default (sequelize, DataTypes) => {
  return sequelize.define('Mentorship', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'mentor_id',
    },
    menteeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'mentee_id',
    },
    connectionRequestId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'connection_request_id',
    },
    status: {
      type: DataTypes.ENUM(
        'active',
        'completed',
        'termination_requested',
        'terminated',
        'paused'
      ),
      allowNull: false,
      defaultValue: 'active',
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'end_date',
    },
    terminationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'termination_reason',
    },
    mentorshipGoals: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'mentorship_goals',
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
    tableName: 'mentorships',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['mentor_id', 'mentee_id'],
        where: { status: 'active' },
      },
    ],
  });
};