'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');

  list.map(item => commentsContainer.appendChild(createComment(item)));
}

function createComment(comment) {
  const commentWarp = document.createElement('div');
  commentWarp.classList.add('comment-wrap');
  const photo = document.createElement('div');
  photo.className = 'photo';
  photo.title = comment.author.name;
  const avatar = document.createElement('div');
  avatar.style.backgroundImage = `url(${comment.author.pic})`;
  avatar.className = 'avatar'
  photo.appendChild(avatar);
  commentWarp.appendChild(photo);

  const commentBlock = document.createElement('div');
  commentBlock.className = 'comment-block';
  const commentText = document.createElement('p');
  commentText.className = 'comment-text';
  commentText.innerText = comment.text;
  commentBlock.appendChild(commentText);
  const bottomComment = document.createElement('div');
  bottomComment.className = 'bottom-comment'; 
  const commentDate = document.createElement('div');
  commentDate.className = 'comment-date';
  const dateNode = document.createTextNode(new Date(comment.date).toLocaleString('ru-Ru'));
  commentDate.appendChild(dateNode);
  bottomComment.appendChild(commentDate);
  const commentActions = document.createElement('ul');
  commentActions.className = 'comment-actions';
  const complain = document.createElement('li');
  complain.className = 'complain';
  complain.textContent = 'Пожаловаться';
  commentActions.appendChild(complain);
  const reply = document.createElement('li');
  reply.className = 'reply';
  reply.textContent = 'Ответить';
  commentActions.appendChild(reply);
  bottomComment.appendChild(commentActions);
  commentBlock.appendChild(bottomComment);
  commentWarp.appendChild(commentBlock);
  
  return commentWarp;
}


fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments)
  .catch(err => console.log(err));
