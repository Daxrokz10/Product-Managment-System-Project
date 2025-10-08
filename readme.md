# Product Management System

## Overview
The Product Management System is a web application designed to manage products efficiently. It includes features such as user authentication, product listing, and email verification.

## Features
- **User Authentication**: Secure login and signup functionality.
- **Email Verification**: Users must verify their email before accessing certain features.
- **Product Management**: Add, edit, delete, and view products.
- **Responsive Design**: Optimized for various screen sizes.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: EJS templates, Bootstrap
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Hosting**: Render

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Daxrokz10/Product-Managment-System-Project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Product-Managment-System-Project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=<your_mongodb_connection_string>
     CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
     CLOUDINARY_KEY=<your_cloudinary_key>
     CLOUDINARY_SECRET=<your_cloudinary_secret>
     SESSION_SECRET=<your_session_secret>
     EMAIL_USER=<your_email>
     EMAIL_PASS=<your_email_password>
     DOMAIN=https://product-managment-system-project.onrender.com
     ```

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Open the application in your browser:
   [Product Management System](https://product-managment-system-project.onrender.com/)

## Screenshots
### Login Page
![Login Page](https://via.placeholder.com/800x400)

### Product Listing
![Product Listing](https://via.placeholder.com/800x400)

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact:
- **Name**: Daksh Gagnani
- **Email**: dakshgagnani@gmail.com