
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEllipsisV, FiPlus, FaCloudUploadAlt, FaCloudDownloadAlt, FaSearch } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import { BsPlus } from "react-icons/bs";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import NoDataFound from '../assets/No_Data_File.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { createDepartment, updateDepartment, getDepartments } from '../redux/reducers/department'


function Departments() {
  const dispatch = useDispatch()
  const [filterSearch, setFilter] = useState('')
  const orgId = useSelector((state) => state.auth.current_organization)
  const departmentsList = useSelector((state) => state.department.departmentsList)
  const updateDepResponse = useSelector((state) => state.department.updatedepartmentResponse)
  const createdDeptResponse = useSelector((state) => state.department.createDepRes)
  const [options, setOptions] = useState([{ name: "Srigar", id: 1 },
  { name: "Sam", id: 2 }, { name: "sridar", id: 3 }])
  const [selectedValues, setSelectedValues] = useState()
  const [value, onChange] = useState(new Date());
  const [addDepartments, setAddDepartments] = useState(false);
  const [parent, setParent] = useState(0);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false)

  const [addDepartmentForm, setAddForm] = useState(false);
  const [updateDepartmentForm, setUpdateForm] = useState(false);
  const [deptDetails, setDeptDetails] = useState({})

  console.log(createdDeptResponse)
  console.log(updateDepResponse)
  useEffect(() => {
    dispatch((getDepartments(filterSearch)))
  }, [departmentsList,createdDeptResponse,updateDepResponse])

  // const onSelect = () => {

  // }
  // const onRemove = () => {

  // }

  // const gotoCreateTask = () => {

  // }

  const showAddForm = () => {
    setAddForm(!addDepartmentForm)
  }

  const showUpdateForm = (item,event) => {
    event.preventDefault()
    setDeptDetails(item)
    setUpdateForm(!updateDepartmentForm)
  }

  const addDepartment =  (event) => {
    setLoading(true)
    event.preventDefault();
    let body = {
      name: name,
      parent: parent,
      org_id: orgId
    }
    dispatch(createDepartment(body)).then(()=>{
      setTimeout(() => {
        console.log('Create Department ++++++++++++++', createdDeptResponse)
        setLoading(false)
        if(createdDeptResponse.status){
          setAddForm(!addDepartmentForm)
          toast.success(createdDeptResponse.message); 
        }
        else{
          toast.error(createdDeptResponse.message); 
        }
      }, 3000)
    })
    
  }

  const update = async (event) => {
    setLoading(true)
    event.preventDefault();
    console.log('updating Details', deptDetails)
    await dispatch(updateDepartment(deptDetails))
    setTimeout(() => {
      console.log('Update Response ++++++++++++++', updateDepResponse)
      setLoading(false)
      if(updateDepResponse.status){
        
        toast.success(updateDepResponse.message); 
        setUpdateForm(!updateDepartmentForm)
      }
      else{
        toast.error(updateDepResponse.message); 
      }
    }, 5000)
    console.log('Update Response +', updateDepResponse) 
  }

  const deleteDept = async (id,event) => {
    event.preventDefault();
    console.log('Delete Dept', id)
  }

  return (
    <div>
    <ToastContainer />
      {/* <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
          <Form.Check
            type="radio"
            label="Check me out"
          />
 <Multiselect
options={options} // Options to display in the dropdown
selectedValues={selectedValues} // Preselected value to persist in dropdown
onSelect={onSelect} // Function will trigger on select event
onRemove={onRemove} // Function will trigger on remove event
displayValue="name" // Property name to display in the dropdown options
/>
<div>
      <DateTimePicker onChange={onChange} value={value} />
    </div> */}


      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='aside_left'>
                <form class="form-inline d-flex">
                  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </div>
            </div>

            <div className='col-md-9'>
              <div className='aside_left d-flex align-items-center justify-content-end gap_05rm'>
                <button type="button" class="btn btn-primary" onClick={showAddForm}>Create Department</button>
                <button type="button" class="btn btn-secondary"><FaCloudUploadAlt /></button>
                <button type="button" class="btn btn-secondary"><FaCloudDownloadAlt /></button>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className='mt-5'>
        <div className='container'>
          <div className='row'>
            
              {
                departmentsList.length > 0 ? 
                departmentsList.map((item) => {return (
                  <div className='col-md-4'>
                  <div className="card-grid-item mb-3">
                    <div className='card-gt-body d-flex align-items-center justify-content-between gap_1rm'>
                      <div className='avatar d-flex align-items-center justify-content-center text-center'>
                        <span>{item.name.substring(0,2).toUpperCase()}</span>
                      </div>
                      <div className='content d-flex align-items-center justify-content-between '>
                        <h4>
                          {item.name}
                          {/* <span>Software Engineer</span> */}
                        </h4>
                        <Dropdown>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <FaEllipsisV id="dropdown-basic" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={(event) => showUpdateForm(item,event)}>Edit</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                </div>
                </div>
                  
                )})
                 : <div className='col-md-12 center text-center'>
                      <img src={NoDataFound} height='500px' />
                  </div>
              }
            </div>
          
        </div>
      </section>


      <Offcanvas show={addDepartmentForm} onHide={showAddForm} placement='end'>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Create Department</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <Form onSubmit={addDepartment}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Enter Department" />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select onChange={(e) => { setParent(e.target.value) }} defaultValue="Choose...">
                    <option >Select Parent Deapartment</option>
                    {departmentsList.map((department) => {
                      return (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  {loading ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <span> Create</span>}
                </Button>

              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={updateDepartmentForm} onHide={()=> setUpdateForm(!updateDepartmentForm)} placement='end'>
        <Offcanvas.Header closeButton >
          <Offcanvas.Title>Update Department</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <Form onSubmit={update}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control onChange={(e) => { setDeptDetails({ ...deptDetails, name: e.target.value} ) }} value={deptDetails.name} type="text" placeholder="Enter Department" />
                  </Form.Group>
                </Row>
                <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select onChange={(e) => { setDeptDetails({ ...deptDetails, parent: e.target.value }) }} value={deptDetails.parent} >
                    <option >Select Parent Deapartment</option>
                    {departmentsList.map((department) => {
                      return (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  {loading ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <span> Update</span>}
                </Button>

              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>


      {/* <form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4"/>
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword4"/>
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity"/>
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip"/>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form> */}




      {/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="..." alt="First slide"/>asasaassa
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Second slide"/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Third slide"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
 
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Launch demo modal
</button>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav> 
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo sdsdsdsd
</button>
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> */}




      {/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}


      {/* <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div> */}


      {/* <div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
<div class="alert alert-secondary" role="alert">
  This is a secondary alert—check it out!
</div>
<div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div>
<div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div>
<div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>
<div class="alert alert-info" role="alert">
  This is a info alert—check it out!
</div>
<div class="alert alert-light" role="alert">
  This is a light alert—check it out!
</div>
<div class="alert alert-dark" role="alert">
  This is a dark alert—check it out!
</div> */}
      {/* <form>
  <div class="form-row">
    <div class="col-7">
      <input type="text" class="form-control" placeholder="City"/>
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="State"/>
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Zip"/>
    </div>
  </div>
</form> */}

      {/* <p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>
</p> */}
      {/* <div class="row">
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
  <div class="col">
    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
        Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
</div> */}

      {/* <section className='mt-5'>
  <div className='container'>
    <div className='row'>
      <div className='col-md-12'>
 


        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <div class="form-group">
            <label for="inputAddress2">Address 2</label>
            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity" />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">State</label>
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input type="text" class="form-control" id="inputZip" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</section> */}




      {/* <AvatarGroup max={4}>
  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
</AvatarGroup> */}

      {/* <Container>
      <Row className="justify-content-md-center">
        <Col lg="12" className='d-flex justify-content-sb'> 
          <div className='aside_left d-flex'>
            <Form.Group className="mb-3">
              <input type="text" class="form-control" placeholder="search" aria-label="Username" aria-describedby="basic-addon1" mb-5 />
            </Form.Group>
          </div>
          
          <div className='aside_right d-flex'> 
            <Button className='button-md' onClick={() => setAddDepartments(true)} variant="primary">Add Task</Button>
            <Button className='button-md' variant="primary"><FaCloudUploadAlt/></Button>
            <Button className='button-md' variant="primary"><FaCloudDownloadAlt/></Button> 
          </div> 
        </Col>
      </Row>
    </Container>  */}










      {/* {addDepartments ? <div className="card">
        <div className='card-head d-flex align-items-center"'>
          <h4>Analytics</h4>
        </div>
        <div className='card-body d-flex align-items-center"'>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridState" id="formGridCheckbox">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Department
            </Button>
          </Form>
        </div>
      </div> : ""} */}
    </div>

  );
}

export default Departments;