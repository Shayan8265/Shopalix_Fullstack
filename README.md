# Shopalix - Recommerce Marketplace  
**Full-stack secondhand goods platform**  



### Quick Start  
1. `git clone [repo-url]`  
2. `npm install express mongoose dotenv`  
3. Create `.env` with:  
   `MONGODB_URI=your_connection_string`  
   `PORT=3000`  
4. `node server.js` → `http://localhost:3000`  

### Demo Access  
- **User Login**: OTP = `123456`  
- **Admin Panel**: `Shayan8265` / `123456`  

### Tech Stack  
- **Frontend**: HTML/CSS/JS + jQuery  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  

### ⚙Core Features  
- User auth (OTP simulation)  
- Cart/order system (localStorage)  
- Admin product CRUD  
- Dark mode + search autocomplete  

### Structure  
`/public` (frontend) | `/routes` (API) | `/models` (Mongo schemas) | `server.js`  

### 🔗 Key API Endpoints  
- `POST /api/auth/user` - Create user  
- `GET /api/products?category=x` - Filter products  
- `PUT /api/products/:id` - Update product  

*Note: Uses localStorage for sessions, EmailJS partially configured*

<img width="1440" alt="Screenshot 2025-05-18 at 22 06 54" src="https://github.com/user-attachments/assets/9b05b43b-2bfc-4161-81be-233358024e12" />
<img width="1440" alt="Screenshot 2025-05-18 at 22 07 05" src="https://github.com/user-attachments/assets/ff7f39cf-8914-4e34-b183-3a10dd17dca4" />
<img width="1440" alt="Screenshot 2025-05-18 at 22 07 43" src="https://github.com/user-attachments/assets/196d4173-1a75-444f-bc58-1cd5a76b5990" />
<img width="1440" alt="Screenshot 2025-05-18 at 22 08 11" src="https://github.com/user-attachments/assets/410fc041-bfeb-4f20-9843-255be9bcfc0e" />
<img width="1440" alt="Screenshot 2025-05-18 at 22 09 21" src="https://github.com/user-attachments/assets/aa56b4d9-671b-4936-87a9-d632640ddd1d" />
