module.exports = {
  async up(db, client) {
    const dateForDeadline = new Date();
    dateForDeadline.setDate(dateForDeadline.getDate() + 7);
    await db.collection('tasks').updateMany({}, {$set: {deadline: dateForDeadline}});
    await db.collection('users').updateMany({}, {$set: {roles: 'user'}});
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
