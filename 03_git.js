// git

// check/todo
git --version
git config
    git config user.name
    git config user.email
    git config --global user.email [your@email] // replace

// usage
git status
git add .
git status
git commit -m "commit name"
git remote add origin https://... (* https://... == git@github.com:name/project.git)
git push -u origin master
                       
// ssh
ssh-keygen
cat ~/.ssh/id_rsa.pub
                       
// change repo
git remote set-url origin https://...
git remote -v // check new repo

// install project
git clone https:...git filename

// log
git log

// remove from index
git rm --catched dir/filename.html

// reset
git reset --hard [commit number]
