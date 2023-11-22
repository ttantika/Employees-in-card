import Axios from 'axios';
import { useState } from 'react';
import './App.css';


function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  // const [position, setPosition] = useState('');
  const [newCountry, setNewCountry] = useState('');

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get('http://localhost:3002/employee').then((response) => {
      setEmployeeList(response.data);
    }).catch((error) => {
      console.error('Error fetching employees:', error);
    });
  }

  const addEmployee = () => {
    Axios.post('http://localhost:3002/create', {
      name: name,
      age: age,
      country: country,
      // position: position
    }).then(() => {
      setEmployeeList([
        ...employeeList, 
      {
        name: name,
        age: age,
        country: country,
        // position: position,
      }
    ])
    })
  }

  const updateEmployeeCountry = (id) => {
    Axios.put('http://localhost:3002/update', {country : newCountry, id: id}).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id ? {
            id: val.id,
            name: val.name,
            age: val.age,
            country: newCountry,
          } :val ;
        })
      )
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      )
    })
  }

  return (
    <div className="App Container">
      <h1 className='m-4'>Employee information</h1>
      <form action="">
        <div className="input-group mb-3 m-lg-3">
          <label htmlFor="name" className="input-group-text ms-2">Name:</label>
          <input type="text" 
            className="form-control" 
            placeholder="Enter name" 
            onChange={(event) => {
            setName(event.target.value)
          }}/>
        </div>

        <div className="input-group mb-3 m-lg-3">
          <label htmlFor="age" className="input-group-text ms-2">
            Age:
          </label>
          <input type="number" className="form-control" placeholder="Enter age" onChange={(event) => {
            setAge(event.target.value)
          }}/>
        </div>
        <div className="input-group mb-3 m-lg-3">
          <label htmlFor="country" className="input-group-text ms-2">
            Country:
          </label>
          <input type="text" className="form-control" placeholder="Enter country" onChange={(event) => {
            setCountry(event.target.value)}}/>
        </div>
      </form>

        <button className='btn btn-success m-lg-3 ms-2' onClick={addEmployee}>add employee</button>
    
        <hr></hr>
        <div className="employees">
          <button className="btn btn-outline-dark m-lg-3 ms-2" onClick={getEmployees}>show employees</button>
          <br></br>
          <br></br>
            {employeeList.map((val, key) => {
              return (
                <div className="employee card">
                  <div className="card-body text-left">
                    <p className="card-text">Name: {val.name}</p>
                    <p className="card-text">Age: {val.age}</p>
                    <p className="card-text">Country: {val.country}</p>
                    <div className="d-flex">
                      <input type="text"
                        placeholder="Th..."
                        onChange={(event) => {
                          setNewCountry(event.target.value)
                        }}>
                      </input>
                      
                      <button className="btn btn-warning" onClick={() => {updateEmployeeCountry(val.id)}}>update</button>
                      <button className="btn btn-danger" onClick={() => {deleteEmployee(val.id)}}>delete</button>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
    </div>
  );
}

export default App;
