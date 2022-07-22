import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, updateNoteAction } from '../../actions/notesActions';
import ReactMarkdown from 'react-markdown';
import MainScreen from '../../components/MainScreen/MainScreen';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';

const SingleNote = ({ match }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paramid } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteNoteAction(id));
    }
    navigate('/mynotes');
  };

  useEffect(() => {
    const fetching = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/notes/${paramid}`, config);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [userInfo, paramid, date]);

  const resetHandler = () => {
    setTitle('');
    setCategory('');
    setContent('');
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(paramid, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate('/mynotes');
  };

  return (
    <MainScreen title='Edit Note'>
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {/* {loadingDelete && <Loading />} */}
            {/* {errorDelete && (
              <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
            )} */}
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='title'
                placeholder='Enter the title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter the content'
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId='content'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='content'
                placeholder='Enter the Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant='primary' type='submit'>
              Update Note
            </Button>
            <Button
              className='mx-2'
              variant='danger'
              onClick={() => deleteHandler(paramid)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
