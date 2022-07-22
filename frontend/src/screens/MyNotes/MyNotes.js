import React, { useEffect } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import ReactMarkdown from 'react-markdown';
import MainScreen from '../../components/MainScreen/MainScreen';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate('/');
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      {console.log(notes)}
      <Link to='/createnote'>
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
          Create new Note
        </Button>
      </Link>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes.reverse().map((note) => (
          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='1'>
              {/* <Accordion.Header style={{ display: 'flex' }}>
                Accordion Item #1
              </Accordion.Header> */}
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: 'flex' }}>
                  <span
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                      flex: 1,
                      cursor: 'pointer',
                      alignSelf: 'center',
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header as={Card.Text} variant='link'>
                      {/* <Accordion.Toggle  as={Card.Text} variant='link' eventKey='0'> */}
                      {note.title}
                      {/* </Accordion.Toggle> */}
                    </Accordion.Header>
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant='danger'
                      className='mx-2'
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge variant='success'>
                        Category - {note.category}
                      </Badge>
                    </h4>

                    <blockquote className='blockquote mb-0'>
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className='blockquote-footer'>
                        Created on{' '}
                        <cite title='Source Title'>
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
