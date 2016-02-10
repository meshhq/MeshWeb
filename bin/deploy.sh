echo -e "\n 🌎 🌎\033[0;32mDeploying updates to GitHubPages...\033[0m 🌎 🌎"

# Add changes to git.
git add -A

# Commit changes.
msg="\n🌎 🌎 Deploying Mesh to GHPages @`date` 🌎 🌎"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
git subtree push --prefix=public git@github.com:meshhq/MeshWeb.git gh-pages