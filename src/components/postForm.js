import gql from "graphql-tag";
import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphlql";

const PostForm = () => {
  const { onSubmit, handleChange, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      const getPosts = [result.data.createPost, ...data.getPosts];

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts,
        },
      });
      values.body = "";
    },
    onError(err) {},
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Post App"
            name="body"
            onChange={handleChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
