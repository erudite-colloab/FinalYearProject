import { useState } from 'react';
import './Buses.css'


const FleetManagement = () => {
    const [buses, setBuses] = useState([
      { id: 1, name: 'Bus 101', status: 'In Service', lastMaintenance: '2024-07-15' },
      { id: 2, name: 'Bus 202', status: 'Under Maintenance', lastMaintenance: '2024-07-10' },
    ]);
  
    const [newBus, setNewBus] = useState({ name: '', status: '', lastMaintenance: '' });
    const [editingBusId, setEditingBusId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewBus({ ...newBus, [name]: value });
    };
  
    const handleAddBus = () => {
      if (newBus.name && newBus.status && newBus.lastMaintenance) {
        if (editingBusId) {
          setBuses(buses.map(bus => bus.id === editingBusId ? { id: bus.id, ...newBus } : bus));
          setEditingBusId(null);
        } else {
          setBuses([...buses, { id: buses.length + 1, ...newBus }]);
        }
        setNewBus({ name: '', status: '', lastMaintenance: '' });
        setIsFormVisible(false);
      } else {
        alert("Please fill out all fields before adding a new bus.");
      }
    };
  
    const handleEditBus = (id) => {
      const busToEdit = buses.find(bus => bus.id === id);
      setNewBus(busToEdit);
      setEditingBusId(id);
      setIsFormVisible(true);
    };
  
    const handleDeleteBus = (id) => {
      setBuses(buses.filter(bus => bus.id !== id));
    };
  
    return (
      <div className="buses-container">
        <div className="header">
          <h1>Manage Fleet</h1>
          <button className="add-bus-button" onClick={() => setIsFormVisible(!isFormVisible)}>
            {isFormVisible ? 'Close Form' : 'Add New Bus'}
          </button>
        </div>
  
        <div className="fleet-overview">
          <div className="card">
            <h3>Total Buses</h3>
            <p>{buses.length}</p>
          </div>
          <div className="card">
            <h3>In Service</h3>
            <p>{buses.filter(bus => bus.status === 'In Service').length}</p>
          </div>
          <div className="card">
            <h3>Under Maintenance</h3>
            <p>{buses.filter(bus => bus.status === 'Under Maintenance').length}</p>
          </div>
          <div className="card">
            <h3>Needs Maintenance</h3>
            <p>{buses.filter(bus => bus.status === 'Needs Maintenance').length}</p>
          </div>
        </div>
  
        <div className="bus-management-table">
          <h3>Bus Management</h3>
          <table>
            <thead>
              <tr>
                <th>Bus Name</th>
                <th>Status</th>
                <th>Last Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map(bus => (
                <tr key={bus.id}>
                  <td>{bus.name}</td>
                  <td>{bus.status}</td>
                  <td>{bus.lastMaintenance}</td>
                  <td className="table-actions">
                    <button className="edit" onClick={() => handleEditBus(bus.id)}>Edit</button>
                    <button className="delete" onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className={`add-bus-form ${isFormVisible ? 'visible' : 'hidden'}`}>
          <h3>Add New Bus</h3>
          <div className="form-group">
            <label htmlFor="name">Bus Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newBus.name}
              onChange={handleInputChange}
              placeholder="Enter bus name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newBus.status}
              onChange={handleInputChange}>
              <option value="">Select status</option>
              <option value="In Service">In Service</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Needs Maintenance">Needs Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lastMaintenance">Last Maintenance Date</label>
            <input
              type="date"
              id="lastMaintenance"
              name="lastMaintenance"
              value={newBus.lastMaintenance}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleAddBus}>Add Bus</button>
        </div>
      </div>
    );
  };
  
  export default FleetManagement;
  