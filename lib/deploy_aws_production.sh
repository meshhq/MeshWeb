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
branch_name=$(git name-rev --name-only HEAD)
git push origin branch_name

timestamp() {
  date +"%s"
}

# Bucket Location
bucket=$(s3://www.app.meshdata.io --region us-east-1)

# Clear the bucket
aws s3 rm bucket --recursive

# Upload new site
aws s3 sync ./public/ bucket