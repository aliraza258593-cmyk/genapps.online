import { Octokit } from '@octokit/rest';

export async function createGitHubRepo(accessToken: string, repoName: string, description: string) {
    const octokit = new Octokit({ auth: accessToken });

    try {
        const response = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            description: description,
            auto_init: true,
            private: false // Free users usually public
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function pushToGitHub(accessToken: string, owner: string, repo: string, files: { path: string, content: string }[], message: string) {
    const octokit = new Octokit({ auth: accessToken });

    try {
        // Simple implementation: Get default branch, get tree, create tree, create commit, update ref
        // For simplicity in this MVP, we might just assume we are creating a new repo or simple push.
        // A full robust git implementation is complex.
        // Let's implement a single file create/update for "index.html" often used in these apps.
        // Or loop through files.

        const { data: { default_branch } } = await octokit.repos.get({ owner, repo });
        const { data: ref } = await octokit.git.getRef({ owner, repo, ref: `heads/${default_branch}` });
        const latestCommitSha = ref.object.sha;

        const treeItems = await Promise.all(files.map(async file => {
            return {
                path: file.path,
                mode: '100644' as const,
                type: 'blob' as const,
                content: file.content
            };
        }));

        const { data: tree } = await octokit.git.createTree({
            owner,
            repo,
            base_tree: latestCommitSha,
            tree: treeItems
        });

        const { data: newCommit } = await octokit.git.createCommit({
            owner,
            repo,
            message,
            tree: tree.sha,
            parents: [latestCommitSha]
        });

        await octokit.git.updateRef({
            owner,
            repo,
            ref: `heads/${default_branch}`,
            sha: newCommit.sha
        });

        return { success: true, commitStr: newCommit.sha };

    } catch (error) {
        console.error("GitHub Push Error:", error);
        throw error;
    }
}
