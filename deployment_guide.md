# Deployment Guide for Django Sales Management App

This guide will help you deploy your Django application with SQLite to a VPS (Virtual Private Server) in a way that's affordable and restricts access to just you and two other users.

## 1. Prepare Your Project

Your project has already been prepared with:
- A `requirements.txt` file
- Production settings in `settings.py`

## 2. Choose a VPS Provider

Recommended affordable options:
- **DigitalOcean**: Basic Droplet ($5/month)
- **Linode**: Nanode 1GB ($5/month)
- **Vultr**: Cloud Compute ($3.50/month)

## 3. Server Setup

After creating your VPS with Ubuntu, SSH into it and run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y python3 python3-pip python3-venv nginx

# Install SSL certificate manager
sudo apt install -y certbot python3-certbot-nginx
```

## 4. Deploy Your Application

### Create a deployment directory:
```bash
mkdir -p /var/www/django_app
```

### Transfer your code to the server:
Use SFTP, SCP, or Git to transfer your code to `/var/www/django_app`

### Set up Python environment:
```bash
cd /var/www/django_app
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Build the React frontend:
```bash
# Install Node.js and npm
sudo apt install -y nodejs npm

# Build the React app
cd /var/www/django_app/web_ventas/frontend
npm install
npm run build

# Return to project root
cd /var/www/django_app
```

### Create a .env file:
```bash
cat > .env << EOF
DEBUG=False
ALLOWED_HOSTS=your-domain-or-ip,localhost,127.0.0.1
SECRET_KEY=generate-a-new-secure-key-here
EOF
```

### Collect static files:
```bash
cd /var/www/django_app
python manage.py collectstatic --noinput
```
This will collect all static files, including your React build files, into the `staticfiles` directory.

## 5. Set Up Gunicorn

### Install Gunicorn:
```bash
pip install gunicorn
```

### Create a systemd service file:
```bash
sudo nano /etc/systemd/system/django_app.service
```

Add the following content:
```
[Unit]
Description=Django Application
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/django_app
ExecStart=/var/www/django_app/venv/bin/gunicorn --workers 3 --bind unix:/var/www/django_app/django_app.sock web_ventas.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target
```

### Start and enable the service:
```bash
sudo systemctl start django_app
sudo systemctl enable django_app
```

## 6. Configure Nginx

### Create an Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/django_app
```

Add the following content:
```
server {
    listen 80;
    server_name your-domain-or-ip;

    location /static/ {
        alias /var/www/django_app/staticfiles/;
    }

    location / {
        # Basic authentication for privacy
        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/.htpasswd;
        
        proxy_pass http://unix:/var/www/django_app/django_app.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Create password file for basic authentication:
```bash
sudo apt install apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd user1
# Add two more users
sudo htpasswd /etc/nginx/.htpasswd user2
sudo htpasswd /etc/nginx/.htpasswd user3
```

### Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/django_app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 7. Set Up SSL with Let's Encrypt

```bash
sudo certbot --nginx -d your-domain-or-ip
```

## 8. Additional Security (Optional)

### Set up IP whitelisting:
If your users have static IPs, add this to your Nginx configuration:

```
# Inside the server block
allow 123.123.123.123; # User 1's IP
allow 124.124.124.124; # User 2's IP
allow 125.125.125.125; # User 3's IP
deny all;
```

## 9. Migrating to PostgreSQL Later

When you're ready to migrate to Supabase:

1. Update your `.env` file with Supabase credentials
2. Run `python manage.py dumpdata > data_backup.json` to backup data
3. After connecting to Supabase, run `python manage.py loaddata data_backup.json`

## 10. Maintenance

- Regularly update your system: `sudo apt update && sudo apt upgrade -y`
- Backup your SQLite database: `cp db.sqlite3 db.sqlite3.backup`
- Monitor logs: `sudo journalctl -u django_app`
