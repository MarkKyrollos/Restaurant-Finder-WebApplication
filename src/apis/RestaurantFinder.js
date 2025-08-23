import axios from "axios"; //this imports the axios library which is used to handle HTTP requests like (GET, POST, PUT, DELETE)

export default axios.create({ //this allows other parts of my application to import and use this axios for making HTTP requests without needing to specify the base URL every time
    baseURL: "http://localhost:4000/api/v1/restaurants"
});

//axios.create(): This method creates a new Axios instance with default configuration options.