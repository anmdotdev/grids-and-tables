workflow "New workflow" {
  on = "pull_request"
  resolves = ["Lint Checks"]
}

action "Lint Checks" {
  uses = "gimenete/eslint-action@master"
}
