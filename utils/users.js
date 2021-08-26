const users = [ ];

// Join User to chatapp 
function userJoin(id, username,room){
  const user = {id, username, room};
  users.push(user);
  return user;
}

// Get Current User
function getCurrentUser(id){
const user = users.find(user => user.id === id)
return user;
}

// User leaves chat room
function userLeave(id){
  const index = users.findIndex(user => user.id === id);
  if(index !== -1){
    // console.log(users.splice(index, 1))
    return users.splice(index, 1)[0];
  }
}

// Get Room users 
function getRoomUsers(room){
  return users.filter(user => user.room === room)
}


module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
}