import { BranchConfigurations, GithubClient, Repository } from './github-client';
export class RepositoryExplorer {
  private client: GithubClient;
  constructor(token: string) {
    this.client = new GithubClient(token);
  }

  public async findSubscribedRepositories(organization: string) {
    const repos = await this.client.findSubscribedRepositories(organization);
    return repos;
  }

  async getBranchConfigurations(repo: Repository): Promise<BranchConfigurations[]> {
    return this.client.getPipelineConfigurations(repo);
  }
}
