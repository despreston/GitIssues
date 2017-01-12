/**
 * Full git issue details
 */
 // Vendors
import React, { Component } from 'react';
import { Link } from 'react-router';

// Components 
import IssueLabel from '../issue-label/IssueLabel';
import CommentList from '../comment-list/CommentList';
import { StringReplace } from '../../helpers';

// Styles
import './Issue.css';

export default class Issue extends Component {
  static propTypes = {
    params: React.PropTypes.object,
    router: React.PropTypes.object
  };

  constructor (props) {
    super();
    this.state = { issue: null, comments: null };
  }

  componentWillMount () {
    this.getIssue(this.props.params.number).then(issue => {
      this.setState({ issue: issue });
      if (issue.comments > 0) {
        this.getComments(issue.comments_url).then(comments => this.setState({ comments: comments }));
      }
    });
  }

  getIssue (issueId) {
    return fetch(`https://api.github.com/repos/${window.CONFIG.owner}/${window.CONFIG.repo}/issues/${issueId}`)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.log('Error retreiving issues: ', err));
  }

  getComments (commentUrl) {
    return fetch(commentUrl)
      .then(response => response.json())
      .then(json => json)
      .catch(err => console.log('Failed to load comments. ', err));
  }

  // Replace line breaks and @ mentions
  transformText (text) {
    // Replace line breaks
    text = StringReplace(text, /(\n)/g, (match, i) => (
      <span key={ match + i }><br /></span>
    ));

    // Replace @ mentions with links 
    text = StringReplace(text, /@(\w+)/g, (match, i) => (
      <a key={match + i} href={`https://github.com/${match}`}>@{match}</a>
    ));

    return text;
  }

  render () {
    if (this.state.issue) {
      const issue = this.state.issue;

      return (
        <div className="Issue">
          <Link className="navigation" onClick={this.props.router.goBack}>Return to Issues</Link>
          <h1>{issue.title}</h1>
          <div className="subheader">
            <span className="status">Status: {issue.state.toUpperCase()}</span>
            {
              issue.labels.map(label => <IssueLabel key={label.id} label={label}/>)
            }
            <span className="user">
              Opened By: {issue.user.login}
              <img alt={issue.user.login} src={issue.user.avatar_url}/>
            </span>
          </div>
          <div className="body">{this.transformText(issue.body)}</div>
          {this.state.comments ? <CommentList comments={this.state.comments}/> : null}
        </div>
      );
    }
    return <div />;
  }
}
