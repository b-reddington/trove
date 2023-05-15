import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function Post() {
    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Plan a Vacation</h2>
                        <label for="location">Location</label>
                        <input type="text" className="form-control" id="location" placeholder='ex: Mozambique Coast'></input>
                        <Dropdown>
                            <Dropdown.Toggle className="col-12" id="dropdown-basic">
                                Season
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/winter">Winter</Dropdown.Item>
                                <Dropdown.Item href="#/spring">Spring</Dropdown.Item>
                                <Dropdown.Item href="#/summer">Summer</Dropdown.Item>
                                <Dropdown.Item href="#/fall">Fall</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <label for="restaurants">Restaurants</label>
                        <input type="text" className="form-control" id="restaurants" placeholder="ex: Dhow Mozambique"></input>
                        <button className="btn btn-primary lb" id="addFood">+</button>
                        <label for="activities">Activities</label>
                        <input type="text" className="form-control" id="activities" placeholder="ex: Bazaruto Archipelago"></input>
                        <button className="btn btn-primary lb" id="addActivity">+</button>
                        <button
                            className="btn btn-block pswd-btn login-btn"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Post;