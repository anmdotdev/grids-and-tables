workflow "New workflow" {
  resolves = ["ESLint"]
  on = "pull_request"
}

action "ESLint" {
  uses = "gimenete/eslint-action@master"
}
