## Sakhi [A Support Platform for Women Facing Domestic Violence]

**Sakhi** is a MERN-based web application designed to support women in India facing domestic violence by connecting them anonymously with verified NGOs that can provide **counseling, legal help, temporary accommodation**, and allow others to **contribute via donations** to support these initiatives.

---

## Project Links

- **Frontend:** [https://sakhi-frontend.onrender.com](https://sakhi-frontend.onrender.com)  
- **Backend:** [https://sakhi-backend-jroa.onrender.com](https://sakhi-backend-jroa.onrender.com)

---

## Features

- **Anonymous Help & Accommodation Forms** – Victims can submit requests confidentially without login.  
- **Donation System** – Allows users to make contributions to support services and shelters.  
- **NGO Registration & Verification** – NGOs register and are approved by an Admin before access.  
- **JWT Authentication** – Secure login for Admins and NGOs using token-based authentication.  
- **Role-Based Access Control** – Admin manages NGO approvals; verified NGOs handle assigned cases.  
- **Password Security** – All passwords hashed with `bcrypt.js` before storing in MongoDB.  
- **Responsive UI** – Built with React.js and Bootstrap 5 for accessibility across devices.

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS, Bootstrap 5, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT + bcrypt.js  
- **Deployment:** Render (Backend), MongoDB Atlas  

---

## Creating the Admin (Initial Setup)

An admin account can be created manually in MongoDB for the first time.

Example document:
```json
{
  "name": "Admin",
  "email": "admin@sakhi.com",
  "password": "<bcrypt_hashed_password>",
  "role": "admin",
  "verified": true
}
```
Alternatively, Run the seedAdmin.js script to auto-create a default admin.

---

## API Endpoints

**POST** `/api/help` → Submit help request (Public)  
**POST** `/api/accommodation` → Submit accommodation request (Public)  
**POST** `/api/donate` → Submit a donation (Public)  
**POST** `/api/auth/register-ngo` → NGO registration (Public)  
**POST** `/api/auth/login` → NGO/Admin login (returns JWT)  
**GET** `/api/ngo/help-requests` → View help requests (Verified NGO)  
**GET** `/api/ngo/accommodation-requests` → View accommodation requests (Verified NGO)  
**POST** `/api/ngo/help-requests/:id/accept` → Accept help request (Verified NGO)  
**POST** `/api/ngo/accommodation-requests/:id/accept` → Accept accommodation request (Verified NGO)  
**POST** `/api/ngo/requests/:id/status` → Update request status (Verified NGO)  
**GET** `/api/admin/ngos` → View all NGOs (Admin)  
**POST** `/api/admin/ngos/:id/approve` → Approve NGO registration (Admin)  
**GET** `/api/admin/requests` → View all help/accommodation requests (Admin)

---

## Summary

Sakhi empowers women by providing a safe, confidential way to seek help, counseling, and shelter through verified NGOs.
It ensures data privacy and secure access using JWT authentication, bcrypt password hashing, and role-based authorization for Admins and NGOs.
Additionally, the donation system allows public users to financially support ongoing services and outreach initiatives.

---
