import { useState } from 'react';
import './RouteManagement.css';

const RouteManagement = () => {
    const [routes, setRoutes] = useState([
        { id: 1, origin: 'Kumasi', destination: 'Accra', departureTime: '2024-08-24T08:00', arrivalTime: '2024-08-24T12:00', busType: 'VIP', price: '100 GHC', status: 'Active' },
        { id: 2, origin: 'Accra', destination: 'Kumasi', departureTime: '2024-08-24T22:49', arrivalTime: '2024-08-25T12:52', busType: '2M express', price: '100 GHC', status: 'Inactive' },
    ]);

    const [newRoute, setNewRoute] = useState({ id: null, origin: '', destination: '', departureTime: '', arrivalTime: '', busType: '', price: '', status: 'Active' });
    const [showAddRouteForm, setShowAddRouteForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRoute({ ...newRoute, [name]: value });
    };

    const handleAddRoute = () => {
        if (isEditing) {
            setRoutes(routes.map(route => (route.id === newRoute.id ? newRoute : route)));
            setIsEditing(false);
        } else {
            setRoutes([...routes, { id: routes.length + 1, ...newRoute }]);
        }
        setNewRoute({ id: null, origin: '', destination: '', departureTime: '', arrivalTime: '', busType: '', price: '', status: 'Active' });
        setShowAddRouteForm(false);
    };

    const handleEditRoute = (route) => {
        setNewRoute(route);
        setIsEditing(true);
        setShowAddRouteForm(true);
    };

    const handleDeleteRoute = (id) => {
        setRoutes(routes.filter(route => route.id !== id));
    };

    const toggleAddRouteForm = () => {
        setShowAddRouteForm(!showAddRouteForm);
        if (isEditing) {
            setIsEditing(false);
            setNewRoute({ id: null, origin: '', destination: '', departureTime: '', arrivalTime: '', busType: '', price: '', status: 'Active' });
        }
    };

    return (
        <div className="manage-routes-container">
            <div className="page-header">
                <h1>Manage Routes & Schedules</h1>
                <button className="route-button" onClick={toggleAddRouteForm}>
                    {showAddRouteForm ? 'Close Add Route' : 'Add New Route'}
                </button>
            </div>

            <div className="route-management-table">
                <h3>Route Management</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Departure Time</th>
                            <th>Arrival Time</th>
                            <th>Bus Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(route => (
                            <tr key={route.id}>
                                <td>{route.origin}</td>
                                <td>{route.destination}</td>
                                <td>{route.departureTime.replace('T', ' ')}</td>
                                <td>{route.arrivalTime.replace('T', ' ')}</td>
                                <td>{route.busType}</td>
                                <td>{route.price}</td>
                                <td>
                                    <select value={route.status} onChange={(e) => handleEditRoute({ ...route, status: e.target.value })}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </td>
                                <td className="table-actions">
                                    <button className="edit" onClick={() => handleEditRoute(route)}>Edit</button>
                                    <button className="delete" onClick={() => handleDeleteRoute(route.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddRouteForm && (
                <div className="add-route-form">
                    <h3>{isEditing ? 'Edit Route' : 'Add New Route'}</h3>
                    <div className="form-group">
                        <label htmlFor="origin">Origin</label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={newRoute.origin}
                            onChange={handleInputChange}
                            placeholder="Enter origin"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination">Destination</label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={newRoute.destination}
                            onChange={handleInputChange}
                            placeholder="Enter destination"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departureTime">Departure Time</label>
                        <input
                            type="datetime-local"
                            id="departureTime"
                            name="departureTime"
                            value={newRoute.departureTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="arrivalTime">Arrival Time</label>
                        <input
                            type="datetime-local"
                            id="arrivalTime"
                            name="arrivalTime"
                            value={newRoute.arrivalTime}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="busType">Bus Type</label>
                        <input
                            type="text"
                            id="busType"
                            name="busType"
                            value={newRoute.busType}
                            onChange={handleInputChange}
                            placeholder="Enter bus type"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={newRoute.price}
                            onChange={handleInputChange}
                            placeholder="Enter price"
                        />
                    </div>
                    <button onClick={handleAddRoute}>{isEditing ? 'Update Route' : 'Add Route'}</button>
                </div>
            )}
        </div>
    );
};

export default RouteManagement;