import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import Loader from "../../components/Loader";
import axios from "axios";
import { deleteDocAction, updateDocAction } from "../../actions/docActions";


function UpdateDocument({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const docUpdate = useSelector((state) => state.docUpdate);
  const { loading, error } = docUpdate;

  const docDelete = useSelector((state) => state.docDelete);
  const { loading: loadingDelete, error: errorDelete } = docDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteDocAction(id));
    }
    history.push("/mydocs");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/docs/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateDocAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mydocs");
  };

  return (
    <MainScreen title="Edit Document">
      <Card>
        <Card.Header>Edit your Document</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loader />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the Text"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Document Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loader size={50} />}
            <Button variant="primary" type="submit">
              Update Document
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Document
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default UpdateDocument;