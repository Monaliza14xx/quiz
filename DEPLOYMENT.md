# GitHub Pages Deployment Instructions

## Automatic Deployment

This repository is configured to work with GitHub Pages. Follow these steps to deploy:

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click on "Settings" tab

2. **Configure GitHub Pages**
   - In the left sidebar, click on "Pages"
   - Under "Source", select the branch you want to deploy (usually `main` or `master`)
   - Select "/ (root)" as the folder
   - Click "Save"

3. **Wait for Deployment**
   - GitHub will automatically build and deploy your site
   - This typically takes 1-2 minutes
   - You'll see a green checkmark when deployment is successful

4. **Access Your Quiz**
   - Your quiz will be available at: `https://yourusername.github.io/quiz/`
   - For this repository: `https://monaliza14xx.github.io/quiz/`

## Updating the Quiz

After making changes to any files:
1. Commit and push your changes to the branch configured for Pages
2. GitHub will automatically rebuild and redeploy
3. Changes will be live within 1-2 minutes

## Custom Domain (Optional)

To use a custom domain:
1. In the Pages settings, enter your custom domain
2. Follow GitHub's instructions to configure DNS records
3. Enable "Enforce HTTPS" for security

## Troubleshooting

If your site doesn't load:
- Check that the branch is correctly selected in Pages settings
- Ensure `index.html` is in the root directory
- Check the Actions tab for any build errors
- Wait a few minutes for DNS propagation

## Local Testing

Before deploying, test locally:
```bash
# Python 3
python -m http.server 8000

# Or use any other local server
# Then visit http://localhost:8000
```
