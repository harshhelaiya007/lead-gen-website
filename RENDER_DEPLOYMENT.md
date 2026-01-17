# Render Deployment Guide

This guide will help you deploy the Next.js lead generation website on Render.

## Common Issues and Solutions

### Issue: "Not Found" Error

This usually happens due to:
1. Incorrect build/start commands
2. Wrong root directory
3. Missing environment variables
4. Build failures

## Step-by-Step Deployment

### Option 1: Using Render Dashboard

1. **Create a New Web Service**:
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Settings**:
   - **Name**: `lead-gen-website` (or your preferred name)
   - **Environment**: `Node`
   - **Root Directory**: `lead-gen-website` (if your repo has multiple projects) or leave blank if this is the root
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `20.x` (or latest LTS)

3. **Environment Variables** (Optional):
   - `NODE_ENV`: `production`
   - `PORT`: Render sets this automatically, but you can set it to `10000` if needed

4. **Click "Create Web Service"**

### Option 2: Using render.yaml (Recommended)

If you have the `render.yaml` file in your repo:

1. **Push render.yaml to your repository**
2. **In Render Dashboard**:
   - Go to "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect and use `render.yaml`

## Important Configuration

### Root Directory

If your project is in a subdirectory (e.g., `lead-gen-website/`), set:
- **Root Directory**: `lead-gen-website`

If your project is at the repository root, leave it blank.

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npm start
```

Next.js automatically uses the `PORT` environment variable that Render provides.

## Troubleshooting

### 1. Check Build Logs

In Render Dashboard → Your Service → Logs:
- Look for build errors
- Check if `npm install` completed successfully
- Verify `npm run build` succeeded

### 2. Check Runtime Logs

After deployment:
- Check if the server started successfully
- Look for "Ready on http://localhost:PORT" message
- Check for any runtime errors

### 3. Verify Port Binding

Next.js should automatically bind to the PORT environment variable. If you see port binding errors:

**Option A**: Update `package.json` start script:
```json
"start": "next start -p ${PORT:-3000}"
```

**Option B**: Create a custom server (if needed):
```javascript
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

Then update `package.json`:
```json
"start": "node server.js"
```

### 4. Check File Structure

Ensure your project structure matches:
```
lead-gen-website/
├── app/
├── components/
├── lib/
├── package.json
├── next.config.js
└── tsconfig.json
```

### 5. Verify Dependencies

Make sure all dependencies are in `dependencies` (not `devDependencies`):
- `next`
- `react`
- `react-dom`
- All other runtime dependencies

### 6. Static vs Dynamic Routes

If you're getting 404s:
- Ensure API routes are in `app/api/` directory
- Check that `app/page.tsx` exists for the home route
- Verify Next.js App Router structure

## Quick Fixes

### Fix 1: Update Start Command

In Render Dashboard → Your Service → Settings → Start Command:
```
npm start
```

### Fix 2: Add Health Check

In Render Dashboard → Your Service → Settings:
- **Health Check Path**: `/`

### Fix 3: Check Node Version

In Render Dashboard → Your Service → Settings:
- **Node Version**: `20.x` (or latest LTS)

## Testing Locally

Before deploying, test the production build locally:

```bash
# Build the app
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to verify everything works.

## Common Render-Specific Issues

### Issue: Build Succeeds but App Shows "Not Found"

**Solution**: 
1. Check if the root directory is correct
2. Verify the start command is `npm start`
3. Check runtime logs for errors
4. Ensure `package.json` has the correct start script

### Issue: "Cannot find module" errors

**Solution**:
1. Ensure all dependencies are in `dependencies` (not `devDependencies`)
2. Run `npm install --production=false` in build command
3. Check `package-lock.json` is committed

### Issue: Port binding errors

**Solution**:
1. Next.js automatically uses `PORT` env var
2. Don't hardcode port numbers
3. Use `-p ${PORT:-3000}` if needed

## After Successful Deployment

1. **Test the API**: Visit `https://your-app.onrender.com/api/leads` (should return JSON)
2. **Test the Form**: Submit the form and check logs
3. **Monitor Logs**: Keep an eye on logs for any errors

## Need More Help?

- Check Render's [Next.js documentation](https://render.com/docs/deploy-nextjs)
- Review build and runtime logs in Render Dashboard
- Check Next.js [deployment documentation](https://nextjs.org/docs/deployment)
