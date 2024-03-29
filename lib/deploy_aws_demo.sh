echo -e "\n \033[0;32mDeploying updates to AWS Demo...\033[0m 🌎"

# Add changes to git.
git add -A

# Commit changes.
msg="Deploying Mesh to AWS Demo @`date`  🌎"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
branch_name=$(git name-rev --name-only HEAD)
git push origin HEAD

timestamp() {
  date +"%s"
}

# Upload new site
aws s3 sync ./public/ s3://demo.app.meshdata.io --region us-west-2