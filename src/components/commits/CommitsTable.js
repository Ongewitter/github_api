import React from "react";
import styled from 'styled-components';

import Table from "../Table";
import TableHeader from "../TableHeader";
import TableBody from "../TableBody";
import TableRow from "../TableRow";

function CommitsTable({ commits }) {

  function renderCommits() {
    return commits.map(commit => {
      return (<TableRow key={`commit-${commit.id}`}>
        <td>{commit.sha}</td>
        <td>{commit.commit.author.name}</td>
        <td>{commit.commit.author.date}</td>
        <td>{commit.commit.message}</td>
        <td><a href={commit.html_url}>{commit.sha}</a></td>
        <td>
          <S.ButtonWrapper>
          </S.ButtonWrapper>
        </td>
      </TableRow>)
    });
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <td>SHA</td>
          <td>Author</td>
          <td>Created At</td>
          <td>Message</td>
          <td>Link</td>
          <td></td>
        </tr>
      </TableHeader>
      <TableBody>
        { renderCommits() }
      </TableBody>
    </Table>
  );
}

export default CommitsTable;

const S = {};
S.ButtonWrapper = styled.div`
  display: inline-block;
`
{
  "sha": "6f245ee99da8e9f146227789c6b7bb4622bcd640",
  "node_id": "MDY6Q29tbWl0MzE3NjIyNzUwOjZmMjQ1ZWU5OWRhOGU5ZjE0NjIyNzc4OWM2YjdiYjQ2MjJiY2Q2NDA=",
  "commit": {
    "author": {
      "name": "Cedric",
      "email": "cedric@Cedrics-MBP.lan",
      "date": "2020-12-02T13:31:34Z"
    },
    "committer": {
      "name": "Cedric",
      "email": "cedric@Cedrics-MBP.lan",
      "date": "2020-12-02T13:31:34Z"
    },
    "message": "Day 2",
    "tree": {
      "sha": "5bda2ed79587548c90f34b8e000470d500407398",
      "url": "https://api.github.com/repos/Ongewitter/2020_adventofcode/git/trees/5bda2ed79587548c90f34b8e000470d500407398"
    },
    "url": "https://api.github.com/repos/Ongewitter/2020_adventofcode/git/commits/6f245ee99da8e9f146227789c6b7bb4622bcd640",
    "comment_count": 0,
    "verification": {
      "verified": false,
      "reason": "unsigned",
      "signature": null,
      "payload": null
    }
  },
  "url": "https://api.github.com/repos/Ongewitter/2020_adventofcode/commits/6f245ee99da8e9f146227789c6b7bb4622bcd640",
  "html_url": "https://github.com/Ongewitter/2020_adventofcode/commit/6f245ee99da8e9f146227789c6b7bb4622bcd640",
  "comments_url": "https://api.github.com/repos/Ongewitter/2020_adventofcode/commits/6f245ee99da8e9f146227789c6b7bb4622bcd640/comments",
  "author": null,
  "committer": null,
  "parents": [
    {
      "sha": "4e910033673c97187cb015f5df6e46ed3719d1ab",
      "url": "https://api.github.com/repos/Ongewitter/2020_adventofcode/commits/4e910033673c97187cb015f5df6e46ed3719d1ab",
      "html_url": "https://github.com/Ongewitter/2020_adventofcode/commit/4e910033673c97187cb015f5df6e46ed3719d1ab"
    }
  ]
}
