// Vendors
import React, { PropTypes } from 'react';

// Components
import { StringReplace } from '../../helpers';
import './Comment.css';

function Comment (props) {
  props.comment.created_at = new Date(props.comment.created_at).toLocaleString();

  // Replace line breaks
  props.comment.body = StringReplace(props.comment.body, /(\n)/g, (match, i) => (
    <span key={ match + i }><br /></span>
  ));

  // Replace @ mentions with links 
  props.comment.body = StringReplace(props.comment.body, /@(\w+)/g, (match, i) => (
    <a key={match + i} href={`https://github.com/${match}`}>@{match}</a>
  ));

  return (
    <div className="Comment">
      <div className="title">
        <img src={props.comment.user.avatar_url} alt={props.comment.user.login}/>
        <span><strong>{props.comment.user.login}</strong> commented at {props.comment.created_at}:</span>
      </div>
      <div className="body">{props.comment.body}</div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
