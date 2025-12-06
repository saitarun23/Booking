# PLAYO-LITE Deployment Guide

## Deployment Checklist

### Pre-Deployment Steps

#### 1. Environment Configuration
```bash
# Create production .env file
cat > .env.production << EOF
REACT_APP_API_BASE_URL=https://api.playolite.com/user
REACT_APP_VENUE_API=https://api.playolite.com/venue
NODE_ENV=production
REACT_APP_ENABLE_PAYMENT=true
REACT_APP_ENABLE_NOTIFICATIONS=true
EOF
```

#### 2. Code Review
- [ ] All files reviewed
- [ ] No console.log statements
- [ ] No hardcoded URLs
- [ ] No debug code
- [ ] No commented code blocks

#### 3. Testing
```bash
# Run tests
npm test

# Build for production
npm run build

# Check build size
ls -lh build/
```

#### 4. Performance Check
- [ ] Lighthouse score > 90
- [ ] Bundle size < 500KB gzipped
- [ ] Core Web Vitals pass
- [ ] No memory leaks
- [ ] No infinite loops

### Build Process

#### Local Build
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build
npm run build

# Check output
cd build
ls -la
```

#### Build Output
```
build/
├── index.html           # Main HTML file
├── static/
│   ├── css/            # CSS bundles
│   │   ├── main.*.css
│   │   └── ...
│   ├── js/             # JavaScript bundles
│   │   ├── main.*.js
│   │   ├── vendors.*.js
│   │   └── ...
│   └── media/          # Images and assets
├── favicon.ico
├── manifest.json
└── robots.txt
```

### Deployment to Different Platforms

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# View deployment
vercel ls
```

**Vercel Config (vercel.json):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_BASE_URL": "https://api.playolite.com/user"
  }
}
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=build

# Or connect GitHub repository for auto-deploy
netlify sites:create --name playolite-frontend
```

**Netlify Config (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[env.production]
  REACT_APP_API_BASE_URL = "https://api.playolite.com/user"
```

#### Option 3: AWS S3 + CloudFront

```bash
# Build
npm run build

# Create S3 bucket
aws s3 mb s3://playolite-frontend

# Upload build
aws s3 sync build/ s3://playolite-frontend/

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name playolite-frontend.s3.amazonaws.com

# Invalidate cache
aws cloudfront create-invalidation \
  --distribution-id DISTRIBUTION_ID \
  --paths "/*"
```

#### Option 4: Traditional Server (nginx)

```bash
# Build
npm run build

# Upload to server
scp -r build/* user@server:/var/www/playolite/

# nginx configuration
cat > /etc/nginx/sites-available/playolite << EOF
server {
    listen 80;
    server_name playolite.com www.playolite.com;
    
    root /var/www/playolite;
    index index.html;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy
    location /api/ {
        proxy_pass https://api.playolite.com/;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # Caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}

# HTTPS redirect
server {
    listen 443 ssl http2;
    server_name playolite.com www.playolite.com;
    
    ssl_certificate /etc/ssl/certs/playolite.crt;
    ssl_certificate_key /etc/ssl/private/playolite.key;
    
    # ... same configuration as above
}
EOF

# Enable and restart nginx
ln -s /etc/nginx/sites-available/playolite /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_BASE_URL=http://backend:8181/user
    depends_on:
      - backend
    
  backend:
    image: playolite-backend:latest
    ports:
      - "8181:8181"
```

#### Deploy with Docker
```bash
# Build image
docker build -t playolite-frontend:latest .

# Run container
docker run -p 3000:3000 \
  -e REACT_APP_API_BASE_URL=https://api.playolite.com/user \
  playolite-frontend:latest

# Push to registry
docker tag playolite-frontend:latest myregistry/playolite:latest
docker push myregistry/playolite:latest
```

### Post-Deployment Verification

#### 1. Application Health
```bash
# Test home page
curl https://playolite.com/

# Test API connectivity
curl https://playolite.com/api/categories

# Check SSL certificate
openssl s_client -connect playolite.com:443

# Check response headers
curl -i https://playolite.com/
```

#### 2. Functionality Testing
- [ ] Home page loads
- [ ] Categories display
- [ ] Navigation works
- [ ] API calls succeed
- [ ] Forms submit correctly
- [ ] Images load properly
- [ ] Carousel works
- [ ] Cart functions

#### 3. Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli@latest
lhci autorun

# WebPageTest
# Visit https://www.webpagetest.org/

# Google PageSpeed Insights
# https://pagespeed.web.dev/
```

#### 4. Security Testing
- [ ] No exposed credentials
- [ ] HTTPS enforced
- [ ] Security headers present
- [ ] API rate limiting
- [ ] Input validation
- [ ] XSS protection
- [ ] CSRF protection

### Monitoring & Logging

#### Error Tracking (Sentry)
```bash
npm install @sentry/react

# In index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
});
```

#### Analytics (Google Analytics)
```bash
npm install react-ga

# In index.js
import ReactGA from 'react-ga';

ReactGA.initialize('GA_MEASUREMENT_ID');
ReactGA.pageview(window.location.pathname);
```

#### Logging (LogRocket)
```bash
npm install logrocket

# In index.js
import LogRocket from 'logrocket';

LogRocket.init('app-id');
```

### Performance Optimization

#### 1. Caching Strategy
```javascript
// Cache API responses
const cacheAPI = (key, data, duration = 3600000) => {
  sessionStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
};

const getCachedAPI = (key, duration = 3600000) => {
  const cached = sessionStorage.getItem(key);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > duration) {
    sessionStorage.removeItem(key);
    return null;
  }
  return data;
};
```

#### 2. Code Splitting
```javascript
// Lazy load components
const Categories = React.lazy(() => import('./pages/Categories'));
const VenueDetails = React.lazy(() => import('./pages/VenueDetails'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <Categories />
</Suspense>
```

#### 3. Image Optimization
```bash
# Install image optimizer
npm install imagemin-cli

# Optimize images
imagemin 'public/**' --out-dir=public
```

### Rollback Procedure

#### If Deployment Fails

**Vercel:**
```bash
# View deployments
vercel ls

# Rollback to previous
vercel --prod --force
```

**Netlify:**
```bash
# View deployments
netlify deploys:list

# Rollback
netlify deploy --prod --dir=build
```

**Manual (S3/Server):**
```bash
# Keep previous build
aws s3 sync s3://playolite-backup/ s3://playolite-frontend/

# Or restore from backup
cp -r /backups/playolite-build/* /var/www/playolite/
```

### Monitoring Checklist

After deployment, monitor:

- [ ] Error rates (should be < 0.1%)
- [ ] API response times (< 500ms)
- [ ] Page load times (< 2s)
- [ ] User sessions
- [ ] Failed API calls
- [ ] Browser errors
- [ ] Network issues
- [ ] User feedback

### Security Headers

Add to your server:
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Environment-Specific Configurations

#### Development
```
API: http://localhost:8181
Debug: Enabled
Analytics: Disabled
Caching: Disabled
```

#### Staging
```
API: https://staging-api.playolite.com
Debug: Enabled
Analytics: Enabled
Caching: Enabled
```

#### Production
```
API: https://api.playolite.com
Debug: Disabled
Analytics: Enabled
Caching: Enabled
Monitoring: Enabled
```

### Continuous Deployment (GitHub Actions)

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_API_BASE_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Troubleshooting Deployment Issues

#### Blank Page After Deployment
1. Check build output
2. Verify public path
3. Check index.html
4. Review console errors
5. Check network tab

#### API Not Connecting
1. Verify API URL in .env
2. Check CORS configuration
3. Verify backend is running
4. Check network requests
5. Review API response

#### Slow Performance
1. Check bundle size
2. Enable compression
3. Add caching headers
4. Optimize images
5. Use CDN

#### 404 Errors on Routes
1. Configure SPA routing on server
2. Redirect all routes to index.html
3. Check route paths
4. Verify react-router setup

---

## Support

For deployment issues:
1. Check logs
2. Review error messages
3. Test locally first
4. Check documentation
5. Contact support team

---

**Deployment Guide v1.0**
**Last Updated: December 1, 2025**
