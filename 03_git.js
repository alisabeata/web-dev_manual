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

// branches
git checkout branchname    // переключение веток
git checkout -b branchname // создать ветку и переключиться на неё

git merge otherbranchname  // смерджить ветки
                       
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
git log --graph

// remove from index
git rm --catched dir/filename.html

// reset
git reset --hard [commit number]


// git flow
// подход к организации коммитов
// https://www.atlassian.com/git/tutorials/comparing-workflows
// https://danielkummer.github.io/git-flow-cheatsheet/index.ru_RU.html
