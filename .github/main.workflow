workflow "New workflow" {
  resolves = ["ESLint"]
  on = "pull_request"
}

action "ESLint" {
  uses = "stefanoeb/eslint-action@master"
}
