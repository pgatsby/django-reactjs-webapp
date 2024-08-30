<a name="readme-top"></a>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center"> 
<img width="492" alt="productpage" src="https://github.com/user-attachments/assets/f56a0bda-a8d1-4b18-8275-aa35acd7823c">
<img width="492" alt="orderpage" src="https://github.com/user-attachments/assets/71c92370-4a9a-4b3a-b8f9-968331cd76c7">
</div>

This Django and ReactJS application demonstrates the effectiveness of their combination in creating a mock e-commerce website.

<!-- GETTING STARTED -->

## Getting Started

Welcome to DRJS (Django-ReactJS-Webapp)! This guide provides detailed steps to set up the environment and install this project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Python 3](https://www.python.org/)

### Installation

1. **Clone the Repository**  
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/p-gatsby/django-reactjs-webapp.git
   ```

2. **React App Installation**  
   Navigate to the client directory and install Node.js dependencies:

   ```bash
   cd django-reactjs-webapp/client
   npm install
   ```

3. **Django Server Installation**  
   Navigate to the root directory and set up the virtual environment and install Python dependencies:

   ```bash
   cd ../
   python3 -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```

### Before running the app

Before starting the application, you need to prepare the Django backend by applying database migrations and collecting static files. Follow these steps:

1. **Make Migrations**  
   Navigate to the root directory of the project and create the initial database migrations:

   ```bash
   python manage.py makemigrations
   ```

2. **Apply Migrations**  
   Apply the migrations to your database to set up the schema.

   ```bash
   python manage.py migrate
   ```

3. **Collect Static Files**  
   Collect static files into the directory specified by STATIC_ROOT. This is necessary for serving static files in production:

   ```bash
   python manage.py collectstatic
   ```

> **Note:** This step is particularly important if you are deploying the application or serving static files from a directory other than the default.
>
> You may be prompted to confirm overwriting existing files. Type `yes` and press Enter to proceed.

### Running the app

1. **Run Django**  
   Start the Django development server:

   ```bash
   python manage.py runserver
   ```

2. **Run React App**  
   Start the React development server in the client directory:

   ```bash
   cd client
   npm start
   ```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
