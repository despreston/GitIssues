/**
 * Summary of git issue
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IssueLabel from '../issue-label/IssueLabel';
import './IssueListItem.css';

function IssueListItem (props) {
  const issue = props.issue;

  // Summary of issue body. Starting with first 140 chars
  // ending on a clean line or word.
  function getIssueSummary () {
    const summary = issue.body.substring(0, 141);

    for (let i = 139; i > 0; i--) {
      if (summary[i] === '.' || summary[i] === ' ') {
        return summary.substring(0, i);
      }
    }
    return '';
  }

  return (
    <div className="IssueListItem">
      <div className="IssueListItemWrapper">
        <div className="first-row">
          <Link className="title" to={`/issue/${issue.number}`}>{issue.title}</Link>
          <span className="number">{`#${issue.number}`}</span>
        </div>
        <div className="second-row">
          <span className="body">{getIssueSummary()}</span>
        </div>
        <div className="labels">
        {
          issue.labels.map(label => <IssueLabel key={label.id} label={label}/>)
        }
        </div>
      </div>
      <span className="user">
        <span>Opened by <strong>{issue.user.login}</strong></span>
        <img alt={issue.user.login} src={issue.user.avatar_url}/>
      </span>
    </div>
  );
}

IssueListItem.propTypes = {
  issue: PropTypes.object.isRequired
};

export default IssueListItem;
