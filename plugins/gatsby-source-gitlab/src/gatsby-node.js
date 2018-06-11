/** @format */
import '@babel/polyfill'
import GitLab from 'gitlab'

export const sourceNodes = async (
  { boundActionCreators },
  { token, user, repository, tree = false, releases = false, secrets = {} }
) => {
  try {
    const gitlab = new GitLab({
      url: `https://gitlab.com`,
      token,
    })
    const projects = await gitlab.GroupProjects.all(`GaiAma`)
    const gaiamaContent = projects.find(x => x.name === `gaiama-content`)
    // console.log(gaiamaContent)
    const tree = await gitlab.Repositories.tree(gaiamaContent.id)
    // console.log(tree)
    gitlab.RepositoryFiles.show(gaiamaContent.id, `testfile`, `master`).then(
      x => console.log(x)
    )
  } catch (error) {
    console.error(error)
  }
}

sourceNodes({}, { token: `AzqC3DHxg7DbAUjJJ6hQ` })
