#!/bin/bash

# Huawei eKit UAE - Docker Deployment Script
# This script helps you deploy the application using Docker

set -e

echo "🚀 Huawei eKit UAE - Docker Deployment"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to deploy application
deploy_app() {
    print_status "Starting deployment..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose down
    
    # Remove old images (optional)
    read -p "Do you want to remove old images? (y/N): " remove_images
    if [[ $remove_images == "y" || $remove_images == "Y" ]]; then
        print_status "Removing old images..."
        docker system prune -f
    fi
    
    # Build and start containers
    print_status "Building and starting containers..."
    docker-compose up --build -d
    
    # Wait for services to be ready
    print_status "Waiting for services to start..."
    sleep 30
    
    # Check if application is healthy
    print_status "Checking application health..."
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_status "✅ Application is healthy and running!"
        print_status "🌐 Application URL: http://localhost:3000"
        print_status "👨‍💻 Admin Panel: http://localhost:3000/admin"
    else
        print_warning "⚠️  Application might not be fully ready yet. Please check logs."
    fi
    
    # Show running containers
    print_status "Running containers:"
    docker-compose ps
}

# Function to show logs
show_logs() {
    print_status "Showing application logs..."
    docker-compose logs -f huawei-app
}

# Function to stop application
stop_app() {
    print_status "Stopping application..."
    docker-compose down
    print_status "✅ Application stopped!"
}

# Function to restart application
restart_app() {
    print_status "Restarting application..."
    docker-compose restart
    print_status "✅ Application restarted!"
}

# Function to backup database
backup_database() {
    print_status "Creating database backup..."
    timestamp=$(date +%Y%m%d_%H%M%S)
    docker-compose exec mongodb mongodump --out /tmp/backup_$timestamp
    docker cp $(docker-compose ps -q mongodb):/tmp/backup_$timestamp ./backup_$timestamp
    print_status "✅ Database backup created: ./backup_$timestamp"
}

# Main menu
show_menu() {
    echo ""
    echo "Available commands:"
    echo "1. deploy   - Deploy the application"
    echo "2. logs     - Show application logs"
    echo "3. stop     - Stop the application"
    echo "4. restart  - Restart the application"
    echo "5. backup   - Backup database"
    echo "6. status   - Show container status"
    echo "7. help     - Show this menu"
    echo ""
}

# Handle command line arguments
case "$1" in
    deploy)
        deploy_app
        ;;
    logs)
        show_logs
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    backup)
        backup_database
        ;;
    status)
        docker-compose ps
        ;;
    help|*)
        show_menu
        echo "Usage: $0 {deploy|logs|stop|restart|backup|status|help}"
        echo ""
        echo "Examples:"
        echo "  $0 deploy    # Deploy the application"
        echo "  $0 logs      # Show real-time logs"
        echo "  $0 stop      # Stop all containers"
        ;;
esac