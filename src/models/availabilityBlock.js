export default (sequelize, DataTypes) => {
  return sequelize.define('AvailabilityBlock', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mentorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'mentor_id',
    },
    dayOfWeek: {
      type: DataTypes.ENUM(
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
      ),
      allowNull: true,
      field: 'day_of_week',
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'start_time',
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'end_time',
    },
    specificDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'specific_date',
    },
    timezone: { type: DataTypes.STRING(64), allowNull: true },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_recurring',
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_booked',
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
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
    tableName: 'availability_blocks',
    schema: 'models',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['mentor_id', 'day_of_week', 'start_time', 'end_time'],
      },
    ],
  });
};