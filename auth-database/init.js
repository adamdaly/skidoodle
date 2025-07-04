db = db.getSiblingDB('authdb');
db.createCollection('users');
db.createCollection('authCodes');
db.createCollection('invites');
db.users.createIndex({ 'username': 1 }, { unique: true });