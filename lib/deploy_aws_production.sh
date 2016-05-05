echo -e "\n \033[0;32mDeploying updates to AWS PRODUCTION...\033[0m 🌎"

# Add changes to git.
git add -A

# Commit changes.
msg="Deploying Mesh to AWS PRODUCTION @`date`  🌎"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

timestamp() {
  date +"%s"
}

# Clear the bucket
aws s3 rm s3://meshweb --recursive

# Upload new site
aws s3 sync ./public/ s3://meshweb