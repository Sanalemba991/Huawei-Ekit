# Huawei eKit UAE - Docker Deployment Guide

## 🐳 Docker Setup

This guide will help you deploy the Huawei eKit UAE application using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

## Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/adeebjamil/Huawei-Kit.git
cd Huawei-Kit
```

### 2. Environment Configuration

Update the `.env.production` file with your production settings:

```bash
# Copy and modify environment variables
cp .env.production .env.production.backup
```

### 3. Deploy Application

```bash
# Make deployment script executable (Linux/Mac)
chmod +x deploy.sh

# Deploy the application
./deploy.sh deploy

# For Windows, use:
docker-compose up --build -d
```

## 🚀 Deployment Options

### Option 1: Full Stack with Local MongoDB

```bash
# Deploy with local MongoDB
docker-compose up --build -d
```

### Option 2: App Only with Cloud MongoDB

```bash
# Deploy only the app (using cloud MongoDB Atlas)
docker-compose up --build -d huawei-app nginx
```

### Option 3: Development Mode

```bash
# Deploy with development overrides
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

## 📋 Available Commands

```bash
# Deploy application
./deploy.sh deploy

# View logs
./deploy.sh logs

# Stop application
./deploy.sh stop

# Restart application
./deploy.sh restart

# Backup database
./deploy.sh backup

# Check status
./deploy.sh status
```

## 🌐 Access Points

- **Application**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Health**: http://localhost:3000/api/health
- **MongoDB**: localhost:27017 (if using local MongoDB)

## 🔧 Configuration

### Database Options

**Option 1: MongoDB Atlas (Recommended for Production)**
```env
MONGO_URI=mongodb+srv://websitedata0102_db_user:roygU3jcJBPOWfH4@huaweiekit.ascs3fq.mongodb.net/Huawei-ekit?retryWrites=true&w=majority&appName=huaweiekit
```

**Option 2: Local MongoDB Container**
```env
MONGO_URI=mongodb://huawei_app_user:HuAwEi_App_User_2024@mongodb:27017/Huawei-ekit?authSource=Huawei-ekit
```

### Admin Credentials

```env
ADMIN_USERNAME=admin_secure_2024
ADMIN_PASSWORD=HuAwEi@eKit_UAE
```

## 🔒 Security Features

- JWT-based authentication
- Rate limiting
- HTTPS support (with proper certificates)
- Content Security Policy
- Input validation and sanitization
- Database authentication

## 📁 Volume Mounts

- `./public/uploads:/app/public/uploads` - File uploads
- `mongodb_data:/data/db` - MongoDB data persistence
- `redis_data:/data` - Redis cache persistence

## 🔍 Monitoring & Logs

### View Real-time Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f huawei-app
docker-compose logs -f mongodb
docker-compose logs -f nginx
```

### Health Checks

```bash
# Application health
curl http://localhost:3000/api/health

# Container health
docker-compose ps
```

## 🛠 Maintenance

### Database Backup

```bash
# Manual backup
./deploy.sh backup

# Or using Docker directly
docker-compose exec mongodb mongodump --out /tmp/backup
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and redeploy
docker-compose down
docker-compose up --build -d
```

### Scaling

```bash
# Scale app instances
docker-compose up --scale huawei-app=3 -d
```

## 🚨 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Check what's using port 3000
netstat -tulpn | grep 3000
# Kill the process or change port in docker-compose.yml
```

**2. Database Connection Issues**
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker-compose exec huawei-app curl mongodb:27017
```

**3. Build Failures**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Log Locations

- Application logs: `docker-compose logs huawei-app`
- MongoDB logs: `docker-compose logs mongodb`
- Nginx logs: `docker-compose logs nginx`

## 🎯 Production Deployment

### 1. SSL Certificates

Place your SSL certificates in `./docker/ssl/`:
```
./docker/ssl/cert.pem
./docker/ssl/key.pem
```

### 2. Environment Variables

Update production environment variables:
```bash
# Set strong passwords
# Configure external database
# Set proper JWT secrets
```

### 3. Firewall Configuration

```bash
# Open necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22  # SSH
```

### 4. Domain Configuration

Update Nginx configuration with your domain:
```nginx
server_name your-domain.com www.your-domain.com;
```

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact: [Your support email]

---

**Huawei eKit UAE** - Enterprise IT Solutions