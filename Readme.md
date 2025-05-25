# Proyect-API-React 🚀

**My First Full-Stack Spring Boot Application with React Frontend**

## 📋 Project Overview

This project represents my first venture into Spring Boot development, featuring a complete full-stack application built for a local business in El Salvador. It combines a robust Spring Boot REST API with a modern React frontend, implementing authentication and full CRUD operations using a database-first approach.

## 🎯 Project Objectives

- **Frontend Development**: Design an intuitive interface using React to consume API data
- **Authentication System**: Implement secure login functionality for administrators  
- **User Features**: Allow users to mark favorites and likes on products/services
- **Admin Panel**: Provide complete CRUD operations for data management
- **Responsive Design**: Ensure compatibility across mobile, tablet, and desktop devices

## 🛠️ Technologies Used

### Backend (Spring Boot API)
- **Spring Boot** - Main framework for REST API development
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations and ORM
- **MySQL/PostgreSQL** - Database (Database-first approach)
- **Maven** - Dependency management

### Frontend (React)
- **React.js** - Component-based UI library
- **React Router** - Single Page Application routing
- **Axios/Fetch** - API communication
- **CSS Modules/Tailwind CSS** - Styling and responsive design
- **React Hooks** - State management

## 🏗️ Project Architecture

```
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   ├── controllers/     # REST endpoints
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   ├── models/          # Entity classes
│   │   └── config/          # Security & configuration
│   └── src/main/resources/
│       └── application.properties
│
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── services/        # API service calls
│   │   ├── context/         # Authentication context
│   │   └── styles/          # CSS modules/styles
│   └── public/
```

## 🌟 Key Features

### User Interface
- ✅ **Product/Service Browsing**: View available items from the API
- ✅ **Favorites System**: Mark and unmark favorite products
- ✅ **Like System**: Interactive like/unlike functionality
- ✅ **Responsive Design**: Mobile-first approach with tablet and desktop support
- ✅ **Form Validation**: Comprehensive client-side validation

### Admin Panel
- ✅ **Secure Authentication**: JWT-based login system
- ✅ **Create**: Add new products/services
- ✅ **Read**: View all items with pagination
- ✅ **Update**: Edit existing records
- ✅ **Delete**: Remove items with confirmation

### Technical Implementation
- ✅ **RESTful API**: Well-structured endpoints following REST principles
- ✅ **Database Integration**: Database-first approach with JPA entities
- ✅ **Security**: Spring Security with JWT tokens
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Input Validation**: Both frontend and backend validation

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Node.js 14 or higher
- MySQL/PostgreSQL database
- Maven 3.6+

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/luis12007/Proyect-API-React.git
cd Proyect-API-React

# Navigate to backend directory
cd backend

# Configure database in application.properties
# Update the following properties:
# spring.datasource.url=jdbc:mysql://localhost:3306/your_database
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Run the Spring Boot application
mvn spring-boot:run
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080

## 📱 Responsive Design

The application is optimized for:
- **Mobile**: 320px - 768px (iPhone, Android phones)
- **Tablet**: 768px - 1024px (iPad, Android tablets)  
- **Desktop**: 1024px+ (Laptops, desktop computers)

## 🎓 Learning Outcomes

This project marked several important milestones in my development journey:

- **First Spring Boot Application**: Gained hands-on experience with the Spring ecosystem
- **Database-First Development**: Learned to work with existing database schemas
- **Full-Stack Integration**: Successfully connected React frontend with Spring Boot backend
- **Authentication Implementation**: Built secure login systems from scratch
- **Real-World Application**: Developed a solution for an actual local business in El Salvador
- **Professional Development Practices**: Applied industry standards for code organization and security

## 📈 Business Impact

This application was developed for a local business in El Salvador, providing:
- **Digital Presence**: Modern web interface for customer interaction
- **Admin Efficiency**: Streamlined content management system
- **Customer Engagement**: Interactive features to boost user interaction
- **Scalable Solution**: Architecture ready for future enhancements

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] User registration system
- [ ] Email integration
- [ ] Analytics dashboard
- [ ] Mobile app development

## 🤝 Contributing

This project represents my learning journey with Spring Boot and React. While it was built as a learning exercise, feedback and suggestions are always welcome!


## 👨‍💻 About the Developer

This project was developed by **Luis Hernández** as part of my journey into full-stack development and Spring Boot framework. It represents my first complete Spring Boot application with authentication and database integration, built for a real business use case in El Salvador.

---

*Built with ❤️ in El Salvador using Spring Boot and React*
