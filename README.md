<a name="readme-top"></a>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center"> 
<img width="492" alt="productpage" src="https://github.com/user-attachments/assets/074e29dd-8ae2-45ea-acec-cefb2cfe4409">
<img width="492" alt="orderpage" src="https://github.com/user-attachments/assets/d68758c6-b3a5-4822-9eeb-02ac2c070131">
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
   git clone https://github.com/pgatsby/django-reactjs-webapp.git
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

### Environmental Variables

   Before running the application, you need to set up the `.env` file in the root directory. Create a file named `.env` and include the following environment variables:

   ```bash
   ALLOWED_HOSTS=your_allowed_hosts
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_S3_REGION_NAME=your_aws_s3_region_name
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_STORAGE_BUCKET_NAME=your_aws_storage_bucket_name
   DBENGINE=your_db_engine
   DBHOST=your_db_host
   DBNAME=your_db_name
   DBUSER=your_db_user
   DBPASSWORD=your_db_password
   DBPORT=your_db_port
   DEBUG=True
   SECRET_KEY=your_secret_key
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
