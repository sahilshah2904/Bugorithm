# Releasing Bugorithm

`main` holds ongoing development. Use an annotated `vMAJOR.MINOR.PATCH` tag for each version. During initial development, use `0.x` and describe the milestone in the changelog. A repository setup tag identifies a documentation and tooling snapshot. Use the first app release for a playable build.

1. Update the [changelog](../CHANGELOG.md), [handoff](HANDOFF.md), and any setup instructions affected by the release.
2. Merge the release changes and confirm the checks pass on the commit being tagged.
3. Create an annotated tag and push it. For example, for the next setup patch:

   ```text
   git tag -a v0.0.2 -m "Describe the milestone"
   git push origin v0.0.2
   ```

4. Create a GitHub release from the tag when sharing a milestone. Include what users can try and any prerequisites. To reproduce a release, check out its tag and follow the README from that version.
