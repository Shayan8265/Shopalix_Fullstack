# Shopalix - Recommerce Marketplace  
**Full-stack secondhand goods platform**  

### 🚀 Quick Start  
1. `git clone [repo-url]`  
2. `npm install express mongoose dotenv`  
3. Create `.env` with:  
   `MONGODB_URI=your_connection_string`  
   `PORT=3000`  
4. `node server.js` → `http://localhost:3000`  

### 🔑 Demo Access  
- **User Login**: OTP = `123456`  
- **Admin Panel**: `Shayan8265` / `123456`  

### 💻 Tech Stack  
- **Frontend**: HTML/CSS/JS + jQuery  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  

### ⚙️ Core Features  
- User auth (OTP simulation)  
- Cart/order system (localStorage)  
- Admin product CRUD  
- Dark mode + search autocomplete  

### 📂 Structure  
`/public` (frontend) | `/routes` (API) | `/models` (Mongo schemas) | `server.js`  

### 🔗 Key API Endpoints  
- `POST /api/auth/user` - Create user  
- `GET /api/products?category=x` - Filter products  
- `PUT /api/products/:id` - Update product  

*Note: Uses localStorage for sessions, EmailJS partially configured*
