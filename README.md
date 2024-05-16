# Metrics React Frontend

Frontend App for the metrics application.

## Dev tools

- **React**
- **Chart.js**: For displaying beautiful charts
- **React-Chartjs-2**: A wrapper for Chart.js for React.
- **Docker**![Untitled](https://github.com/Mustapha90/metrics-frontend/assets/18019846/efddc215-e7f1-4370-8a2d-c90bc13de372)


## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.

### Installation

Create a `.env` file based on the provided `.env.example`:
and specify the frontend PORT you would like to use and the BE host and port.

```dotenv
PORT=
REACT_APP_BE_HOST=
REACT_APP_BE_PORT=
```

Clone the repository and navigate to the project directory. Then, run the following commands to set up the application:

```bash
make build
make up
```

### Makefile Commands

- `make up`: Start the application using Docker Compose.
- `make build`: Build the Docker image.
- `make down`: Stop the application.
- `make clean`: Stop the application and remove volumes.
- `make restart`: Restart the application.
- `make test`: Run tests using Jest.

### Running the Application

Start both the backend and front end apps:

After starting the application with Docker Compose, and making sure that the backend is already running, you can access the app at:

[http://localhost:$PORT](http://localhost:$PORT)

![Application Screenshot]()

:tada
