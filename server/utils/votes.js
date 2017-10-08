
exports.removeUpvote = (resource, userId) => {
  if (resource._upvotes.indexOf(userId) > -1) {
    const position = resource._upvotes.indexOf(userId);
    return resource._upvotes.splice(position, 1);
  }

  return null;
}

exports.removeDownvote = (resource, userId) => {
  if (resource._downvotes.indexOf(userId) > -1) {
    const position = resource._downvotes.indexOf(userId);
    return resource._downvotes.splice(position, 1);
  }

  return null;
}

exports.addUpvote = (resource, userId) => {
  if (resource._upvotes.indexOf(userId) === -1) {
    return resource._upvotes.push(userId);
  }
}

exports.addDownvote = (resource, userId) => {
  if (resource._downvotes.indexOf(userId) === -1) {
    return resource._downvotes.push(userId);
  }
}

