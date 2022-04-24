import React, { useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import { Link , useHistory} from 'react-router-dom';
import {Accordion,Badge, Button, Card} from 'react-bootstrap';
import {listDocs, deleteDocAction} from "../../actions/docActions";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const MyDocuments = ({search})=> {
    const dispatch = useDispatch();
    const docList = useSelector((state) => state.docList);

    const { loading, error, docs } = docList;

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =  userLogin;

    const docCreate = useSelector((state) => state.docCreate);
    const { success: successCreate } = docCreate;

    const docUpdate = useSelector((state) => state.docUpdate);
    const { success: successUpdate} = docUpdate;

    const docDelete = useSelector(state => state.docDelete);
    const {loading:loadingDelete, error:errorDelete,success:sucessDelete}= docDelete; 
  

    const handleDelete = (id) =>{
        if(window.confirm("Confirm to delete")){
         dispatch(deleteDocAction(id));
        }
    }

    console.log(docs);

    const history = useHistory();
    useEffect(() => {
        dispatch(listDocs());
        if(!userInfo){
            history.push("/")
        }
    }, [dispatch, successCreate, history, userInfo, successUpdate,sucessDelete])


    return (
        <MainScreen title={`Welcome back ${userInfo.name}`}>
            <Link to='createDoc' key="0">
                <Button style={{marginleft:10, marginBottom:6}} size="lg" > Create new Document</Button>
                </Link>
                {errorDelete &&(
                    <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loader/>}
                {docs?.reverse().filter(filterDoc =>(
                    filterDoc.title.toLowerCase().includes(search.toLowerCase())
                )).map((note) => (
                    <Accordion key={note._id}>
                        <Card style={{margin:10}}>
                        <Card.Header style={{display:"flex"}}>
                            <span 
                            style={{
                                color:"black",
                                textDecoration:"none",
                                flex:1,cursor:"pointer",
                                alignSelf:"center",
                                fontSize:18}}>
                                <Accordion.Toggle
                                as={Card.Text}
                                variant="link"
                                eventKey="0"
                              >
                                {note.title}
                              </Accordion.Toggle></span>
                            <div key="2">
                                <Button href={`/doc/${note._id}`}>Edit</Button>
                                <Button variant="danger" className="mx-2" onClick={() => handleDelete(note._id)}>Delete</Button>
                            </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0" key="3">
                        <Card.Body>

                            <h4>
                                <Badge variant="success">
                                    Category - {note.category}
                                </Badge>
                            </h4>
                        <blockquote className="blockquote mb-0">
                          <p>
                          {note.content}
                          </p>
                          <footer className="blockquote-footer">
                          Created {" "}
                          <cite title="Source title">
                              {note.createdAt.substring(0,10)}
                          </cite>
                         </footer>
                         </blockquote>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                    ))
                }
               
          
        </MainScreen>
    )
}

export default MyDocuments;
